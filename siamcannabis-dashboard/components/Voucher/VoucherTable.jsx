import { memo, useCallback, useEffect, useState } from "react";
import Search from "../Form/Search";
import Spinner from "../Spinner";
import FilterSearch from "../Filter/FilterSearch";
import EditVoucher from "../Modal/EditVoucher";
import AddVoucher from "../Modal/AddVoucher";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PROJECTS } from "../../models/Project";
import { getPartnerVouchers } from "../../models/Voucher";
import { numberComma } from "../../utils/misc";
import dayjs from "dayjs";
import { GET_PARTNER_COM_NAME_BY_ID } from "../../models/Partner";



const VoucherTable = () => {
	const [showEditVoucherModal, setShowEditVoucherModal] = useState(false);
	const [showAddVoucherModal, setShowAddVoucherModal] = useState(false);

	const [handleGetPartnerCompanyName] = useLazyQuery(GET_PARTNER_COM_NAME_BY_ID);


	const objectType = {
		// contact_address: String
		// created_at: timestamptz
		// detail: String
		// detail or description of voucher
		// expiration_date: timestamptz
		// id: Int
		// is_active: Boolean
		// voucher status
		// note: String
		// voucher note
		// partner_id: Int
		// Reference to partner table
		// project: projects_obj_rel_insert_input
		// project_id: Int
		// updated_at: timestamptz
		// voucher_slug: String
		// zone_id: Int
	};

	const { status: authStatus } = useSession();

	const [handleFetchAllActiveProjects] = useLazyQuery(GET_ALL_PROJECTS);

	const [loading, setLoading] = useState(false);
	const [filterOptions, setFilterOptions] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState({
		text: "",
		projectAndZone: [],
	});
	const [paginationDetail, setPaginationDetail] = useState({
		page: 1,
		perPage: 15,
		items: [],
	});
	const [partnerVouchers, setPartnerVoucher] = useState([]);
	const [voucherInfo, setVoucherInfo] = useState({});
	const [partnerName, setPartnerName] = useState("");

	const handleOnClose = () => setShowEditVoucherModal(false);

	const handleAddOnClose = () => {
		
		setShowAddVoucherModal(false);
	}


	const handleOnOpenEdit = async (partnerVoucher) => {

		const companyName = await handleGetPartnerCompanyName({ variables: { partnerId: partnerVoucher.partner_id } })

		setPartnerName(companyName?.data?.partners_by_pk?.company_name);
		setVoucherInfo(partnerVoucher);
		setShowEditVoucherModal(true);
		console.log()
	}

	const handleChangePage = async (selectedPage) => {
		setPaginationDetail((prevState) => ({
			...prevState,
			page: selectedPage,
		}));
	};

	const handleChangeFilter = async (filters, propKey) => {
		setSelectedFilter((prevState) => ({ ...prevState, [propKey]: filters }));
	};

	const handleSetPaginationDetail = async (partnerVouchers = []) => {
		const itemChunks = partnerVouchers.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / paginationDetail.perPage);

			if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []; // start a new chunk

			resultArray[chunkIndex].push(item);

			return resultArray;
		}, []);

		const paginationItems = Array.from({ length: itemChunks.length }, (_, i) => i + 1);

		setPaginationDetail((prevState) => ({
			...prevState,
			items: paginationItems,
		}));

		return { data: itemChunks[paginationDetail.page - 1] || [] };
	};

	const handleMappingFilterOptionValue = async (projects = []) => {
		return (
			Array.isArray(projects) &&
			projects.map((project) => ({
				value: JSON.stringify({ projectId: project?.project_id, zoneId: project?.zone_id }),
				label: `${project?.project_name} : ${project?.zone_name}`,
			}))
		);
	};

	const handleFetchFilterOption = async () => {
		try {
			const responseAllActiveProjects = await handleFetchAllActiveProjects();

			const mappedFilterOptions = await handleMappingFilterOptionValue(responseAllActiveProjects.data.projects);

			setFilterOptions(mappedFilterOptions);
		} catch {
			setFilterOptions([]);
		}
	};

	const handleMappingCondition = async () => {
		try {
			if (!selectedFilter.projectAndZone.length) {
				return `{${
					selectedFilter.text
						? `_or: {project: {_or: [{project_name: {_like: "%${selectedFilter.text}%"}}, {zone_name: {_like: "%${selectedFilter.text}%"}}]}}`
						: ``
				}}`;
			}

			let whereInProjectId = "[";
			let whereInZoneId = "[";

			selectedFilter.projectAndZone.map((projectAndZone, index) => {
				const { projectId, zoneId } = JSON.parse(projectAndZone.value);
				whereInProjectId += selectedFilter.projectAndZone.length - 1 === index ? projectId : `${projectId},`;
				whereInZoneId += selectedFilter.projectAndZone.length - 1 === index ? zoneId : `${zoneId},`;
			});

			whereInProjectId += "]";
			whereInZoneId += "]";

			return `{${
				selectedFilter.text
					? `_or: [
					{project_id: {_in: ${whereInProjectId}}, zone_id: {_in: ${whereInZoneId}}},
					{project: {_or: [
						{project_name: {_like: "%${selectedFilter.text}%"}}, 
						{zone_name: {_like: "%${selectedFilter.text}%"}}
					]}}
				]`
					: `, _or: [{project_id: {_in: ${whereInProjectId}}, zone_id: {_in: ${whereInZoneId}}}]`
			}}`;
		} catch (e) {
			console.error(e);
			return ``;
		}
	};

	const handleFetchVoucher = async () => {
		try {
			setLoading(true);

			const mappedCondition = await handleMappingCondition();
			const responsePartnerVouchers = await getPartnerVouchers(mappedCondition);
			const partnerVouchersData = await handleSetPaginationDetail(responsePartnerVouchers.data || []);
			setPartnerVoucher(partnerVouchersData.data);

		} catch {
			setPartnerVoucher([]);
		} finally {
			setLoading(false);
		}
	};

	const initialize = async () => {
		await handleFetchVoucher();
		await handleFetchFilterOption();
	};

	useEffect(() => {
		let mounted = true;

		if (mounted) initialize();

		return () => {
			mounted = false;
		};
	}, [authStatus, selectedFilter.projectAndZone, paginationDetail.page]);

	return (
		<>
			<div className="px-4 sm:px-6 lg:px-0">
				<div className="grid grid-flow-row-dense grid-cols-2 ">
					<div className="flex ">
						<div className="">
							<Search
								placeholder="Search Voucher Partners..."
								name="text"
								onChangeFilter={handleChangeFilter}
							/>
						</div>
						<div className="">
							<button
								type="button"
								className="btn btn-search py-2 px-4 text-white rounded"
								onClick={initialize}
							>
								Search
							</button>
						</div>
					</div>

					<div className="flex justify-end">
						<div className="w-80 px-3">
							<FilterSearch
								filterOptions={filterOptions}
								onSelectFilter={handleChangeFilter}
								name="projectAndZone"
							/>
						</div>
						<div>
							<button
								type="button"
								className=" text-white font-bold py-2 px-4 rounded btn-add"
								onClick={() => setShowAddVoucherModal(true)}
							>
								Add Voucher
							</button>
						</div>
					</div>
				</div>

				<div className="mt-4 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full table-fixed divide-y divide-gray-300 vouchertable">
									<thead className="bg-gray-50">
										<tr>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Prefix Voucher
											</th>
											<th
												scope="col"
												className="min-w-[12rem] py-3.5 pr-3 text-center text-sm font-semibold"
											>
												Project
											</th>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Zone
											</th>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Total Voucher
											</th>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Genarate Date
											</th>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Expiration Date
											</th>
											<th
												scope="col"
												className="relative text-center py-3.5 pl-3 pr-4 sm:pr-6 font-semibold "
											>
												Edit
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{loading && (
											<tr>
												<td colSpan={7}>
													<Spinner />
												</td>
											</tr>
										)}
										{!loading && Array.isArray(partnerVouchers) && partnerVouchers.length < 1 && (
											<tr className="text-center">
												<td colSpan={7}>
													<h4 className="my-2">Voucher Not Found.</h4>
												</td>
											</tr>
										)}
										{!loading &&
											Array.isArray(partnerVouchers) &&
											partnerVouchers.map((partnerVoucher, index) => (
												<tr key={`${partnerVoucher.voucher_slug}_${index}`}>
													<td className="py-3.5 text-center">
														<b className="font-extrabold">{partnerVoucher?.voucher_slug}</b>
													</td>
													<td className="py-3.5 text-center">
														<p className="font-extrabold">
															{partnerVoucher?.project?.project_name}
														</p>
													</td>
													<td className="py-3.5 text-center">
														<p className="font-extrabold">
															{partnerVoucher?.project?.zone_name}
														</p>
													</td>
													<td className="py-3.5 text-center">
														<p className="text-gray-500">
															{numberComma(partnerVoucher?.project?.zone_max)}
														</p>
													</td>
													<td className="py-3.5 text-center">
														<p className="text-gray-500">
															{dayjs(partnerVoucher?.created_at)
																.format("DD MMM YYYY")
																.toUpperCase()}
														</p>
													</td>
													<td className="py-3.5 text-center">
														<p className="text-gray-500">
															{dayjs(partnerVoucher?.expiration_date)
																.format("DD MMM YYYY")
																.toUpperCase()}
														</p>
													</td>
													<td className="py-3.5 text-center">
														<button
															className="btn btn-edit text-white font-bold py-1 px-8"
															onClick={() => handleOnOpenEdit(partnerVoucher)}
														>
															Edit
														</button>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className="text-center pagination mt-5">
					<button
						type="button"
						className="pagination__prev mr-3"
						disabled={paginationDetail.page < 2 || !paginationDetail.items || loading}
						onClick={() => handleChangePage(paginationDetail.page - 1)}
					>
						<i className="fas fa-arrow-left"></i>
					</button>

					{paginationDetail.items.map((pageItem, index) => (
						<button
							type="button"
							className={`pagination__item-link ${paginationDetail.page === pageItem ? "active" : ""}`}
							key={`${index}_${pageItem}`}
							disabled={loading || paginationDetail.page === pageItem}
							onClick={() => handleChangePage(pageItem)}
						>
							{pageItem}
						</button>
					))}

					<button
						type="button"
						className="pagination__next ml-3"
						disabled={
							paginationDetail.page === paginationDetail.items.length ||
							!paginationDetail.items.length ||
							loading
						}
						onClick={() => handleChangePage(paginationDetail.page + 1)}
					>
						<i className="fas fa-arrow-right"></i>
					</button>
				</div>
			</div>
			<AddVoucher 
			onClose={handleAddOnClose} 
			visible={showAddVoucherModal} 
			onSetShowAddVoucherModal={setShowAddVoucherModal} 
			onHandleFetchVoucher={handleFetchVoucher} 
			/>
			<EditVoucher 
			onClose={handleOnClose} 
			visible={showEditVoucherModal} 
			voucherInfo={voucherInfo}
			partnerName={partnerName}
			 />
		</>
	);
};

export default memo(VoucherTable);
