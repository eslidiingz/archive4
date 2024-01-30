/** @format */
import { useLazyQuery, useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { GET_PARTER_VOUCHER_BY_PROJECT_ZONE_PARTER, INSERT_PARTNER_VOUCHER } from "../../models/Voucher";
import { GET_DISTINCT_ALL_PARTNERS } from "../../models/Partner";
import { GET_ALL_PROJECTS_BY_PARTNER_ID } from "../../models/Project";
import dayjs from "dayjs";

const AddVoucherModal = ({ visible, onClose, onHandleFetchVoucher, onSetShowAddVoucherModal }) => {
	const [handleInsertPartnerVoucher] = useMutation(INSERT_PARTNER_VOUCHER);
	const [handleFetchAllPartners] = useLazyQuery(GET_DISTINCT_ALL_PARTNERS);
	const [handleFetchProjectByPartnerId] = useLazyQuery(GET_ALL_PROJECTS_BY_PARTNER_ID);
	const [handleCheckPartnerVoucherIsExists] = useLazyQuery(GET_PARTER_VOUCHER_BY_PROJECT_ZONE_PARTER);

	const cancelButtonRef = useRef(null);

	const [loading, setLoading] = useState(false);
	const [formOptions, setFormOptions] = useState({
		partnerOptions: [],
		projectAndZoneOptions: [],
	});

	const handleOnClose = () => {
		setFormAddVoucher({
			contractAddress: "",
			// createdAt: today,
			detail: "This campaign has discount 500 baht",
			// discountPrice: "",
			expirationDate: "",
			// id: "",
			isActive: true,
			// name: "",
			// note: "",
			partnerId: "",
			// project: "",
			projectId: "",
			// updatedAt: "",
			voucherSlug: "",
			zoneId: "",
		});
		onClose();
	};

	const [form, setForm] = useState({
		partnerId: "",
		projectId: "",
		zoneId: "",
		zoneMax: "",
		projectName: "",
		expirationDate: "",
		voucherSlug: "",
	});

	const [validateForm, setValidateForm] = useState({
		detail: { invalid: true, message: "" },
		// discountPrice: { invalid: true, message: "" },
		expirationDate: { invalid: false, message: "Please input date later than today." },
		// id: { invalid: true, message: "" },
		isActive: { invalid: false, message: "" },
		// name: { invalid: true, message: "" },
		// note: { invalid: true, message: "" },
		partnerId: { invalid: false, message: "" },
		// project: { invalid: true, message: "" },
		projectId: { invalid: false, message: "" },
		// updatedAt: { invalid: false, message: "" },
		voucherSlug: { invalid: true, message: "" },
		zoneId: { invalid: false, message: "" },
	});

	const handleChangeformAddVoucher = (e) => {
		try {
			setForm((prevState) => ({ ...prevState, expirationDate: e.target.value.trim() }));
		} catch {
			setForm((prevState) => ({ ...prevState }));
		}
	};

	const validateFormAddVoucher = async () => {
		try {
			let validated = true;
			for (let inputKey in form) {
				if (form.hasOwnProperty(inputKey)) {
					if (inputKey === "partnerId") {
						if (!form[inputKey].trim()) {
							validated = false;
						}
					} else if (inputKey === "expirationDate") {
						if (!form[inputKey].trim()) {
							validated = false;
						} else {
							if (new Date(form[inputKey].trim()).getTime() < Date.now()) {
								validated = false;
								setValidateForm((prevState) => ({ ...prevState, expirationDate: "Please input date later than today." }));
							}
						}
					} else if (inputKey === "projectId" || inputKey === "zoneId") {
						if (form[inputKey] < 0) {
							validated = false;
						}
					}
				}
			}
			return validated;
		} catch {
			return false;
		}
	};

	const handleMappingGqlVariable = async (voucherSlug) => {
		const today = dayjs().format("YYYY-MM-DDTHH:mm:ss");
		return {
			partner_id: form.partnerId,
			project_id: form.projectId,
			zone_id: form.zoneId,
			voucher_slug: voucherSlug,
			contact_address: null,
			detail: null,
			expiration_date: form.expirationDate,
			is_active: true,
			created_at: today,
			updated_at: today,
		};
	};

	const handleChangeProjectAndZone = async (e) => {
		const { projectId, zoneId, zoneMax, projectName } = JSON.parse(e.target.value);
		setForm((prevState) => ({ ...prevState, projectId, zoneId, zoneMax, projectName }));
	};

	const handleChangePartner = async (e) => {
		try {
			const responseProject = await handleFetchProjectByPartnerId({ variables: { partnerId: e.target.value } });

			const projects = responseProject.data?.partner_zones?.filter?.((partnerZone) => !partnerZone.partner_voucher);

			setFormOptions((prevState) => ({
				...prevState,
				projectAndZoneOptions: projects || [],
			}));

			setForm((prevState) => ({ ...prevState, partnerId: e.target.value }));
		} catch {
			setFormOptions((prevState) => ({
				...prevState,
				projectAndZoneOptions: [],
			}));
		}
	};

	const handleSubmitPartnerVoucher = async () => {
		try {
			setLoading(true);

			const first3Characters = form.projectName.slice(0, 3);
			const voucherSlug = first3Characters.toUpperCase() + form.projectId + form.zoneId;

			setForm((prevState) => ({ ...prevState, voucherSlug }));

			const validated = await validateFormAddVoucher();

			if (!validated) return Swal.fire("Warning", "Please enter required input", "warning");

			const isExistsPartnerVoucher = await handleCheckPartnerVoucherIsExists({
				variables: { projectId: form.projectId, zoneId: form.zoneId, partnerId: form.partnerId },
			});

			if (isExistsPartnerVoucher.data.partner_vouchers.length) return Swal.fire("Warning", "Project and zone already taken", "warning");

			const mappedGqlVariable = await handleMappingGqlVariable(voucherSlug);

			const res = await handleInsertPartnerVoucher({
				variables: { object: mappedGqlVariable },
				async onCompleted() {
					Swal.fire("Success", "You have added Voucher successfully", "success");
					onSetShowAddVoucherModal(false);
					await onHandleFetchVoucher();
				},
				async onError(error) {
					console.log(error);
					Swal.fire("Warning", "Failed to add voucher", "warning");
				},
			});
		} catch (e) {
			console.error(e);
			Swal.fire("Warning", "Failed to add voucher", "warning");
		} finally {
			setLoading(false);
		}
	};

	const initialize = async () => {
		const responsePartner = await handleFetchAllPartners();
		setFormOptions((prevState) => ({ ...prevState, partnerOptions: responsePartner.data?.partner_zones || [] }));
	};

	useEffect(() => {
		let mounted = true;
		if (mounted) initialize();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-9/12">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<div className="mt-2">
											<div className="relative p-6 flex-auto">
												<form>
													<div className="flex flex-wrap mb-5">
														<div className="w-full px-3 md:mb-0 set-fix">
															<label
																className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																htmlFor="partners-name"
															>
																Partners <span className="text-red-500">*</span>
															</label>
															<div className="relative">
																<select
																	className="block appearance-none w-full  border border-slate-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
																	id="partners-name"
																	onChange={handleChangePartner}
																>
																	<option value="">Please select partner</option>
																	{formOptions.partnerOptions.map((partnerOption, index) => (
																		<option
																			value={partnerOption.partner_id}
																			key={`${index}_${partnerOption?.partner?.company_name}`}
																		>
																			{partnerOption?.partner?.company_name}
																		</option>
																	))}
																</select>
															</div>
														</div>
													</div>
													<div className="flex flex-wrap  mb-8">
														<div className="w-full px-3  md:mb-0">
															<label
																className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																htmlFor="project-name"
															>
																Project <span className="text-red-500">*</span>
															</label>
															<div className="relative">
																<select
																	className="block appearance-none w-full  border border-slate-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
																	id="project-name"
																	disabled={!form.partnerId}
																	onChange={handleChangeProjectAndZone}
																>
																	<option selected="true" disabled="disabled">
																		Please select project/zone
																	</option>
																	{formOptions.projectAndZoneOptions.map((projectAndZoneOption, index) => (
																		<option
																			value={JSON.stringify({
																				projectId: projectAndZoneOption.project_id,
																				zoneId: projectAndZoneOption.zone_id,
																				zoneMax: projectAndZoneOption?.project?.zone_max,
																				projectName: projectAndZoneOption?.project?.project_name,
																			})}
																			key={`${index}_${projectAndZoneOption?.project?.project_name}`}
																		>
																			{projectAndZoneOption?.project?.project_name}/
																			{projectAndZoneOption?.project?.zone_name}
																		</option>
																	))}
																</select>
															</div>
														</div>
													</div>
													<div className="flex flex-wrap  mb-5">
														<div className="w-full  px-3">
															<label
																className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																htmlFor="sellvoucher"
															>
																Total Voucher
															</label>
															<input
																className="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
																id="sellvoucher"
																type="text"
																placeholder="Total Voucher"
																value={form.zoneMax}
																disabled={true}
															/>
														</div>
													</div>
													<div className="flex flex-wrap  mb-5">
														<div className="w-full md:w-1/2 px-3">
															<label
																className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																htmlFor="genarate-date"
															>
																Genarate Date
															</label>
															<input
																className="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
																id="genarate-date"
																type="date"
																value={dayjs().format("YYYY-MM-DD")}
																disabled
															/>
														</div>
														<div className="w-full md:w-1/2 px-3">
															<label
																className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																htmlFor="expiration-date"
															>
																Expiration Date <span className="text-red-500">*</span>
															</label>
															<input
																className="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
																id="expiration-date"
																type="date"
																name="expirationDate"
																value={form.expirationDate}
																onChange={handleChangeformAddVoucher}
															/>
															<p className="text-red-500 text-xs italic">{validateForm.expirationDate.message}</p>
														</div>
													</div>
												</form>

												<div className="flex justify-center gap-4 mb-10 mt-10">
													<button
														className="btn-close font-bold text-white uppercase  py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
														type="button"
														disabled={loading}
														onClick={onClose}
													>
														Close
													</button>
													<button
														className="bg-emerald-500 text-white btn-save active:bg-emerald-600 font-bold uppercase  py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
														type="button"
														disabled={loading}
														onClick={handleSubmitPartnerVoucher}
													>
														Add Voucher
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default memo(AddVoucherModal);
