import dayjs from "dayjs";

import { memo, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApprovePartner from "./ApprovePartner";
import Spinner from "../Spinner";
import useModal from "../../hooks/useModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_PROJECTS } from "../../models/Project";
import { INSERT_PARTNER_ZONES, UPDATE_PARTNER_APPROVE_STATUS } from "../../models/Partner";

const PartnersTableList = ({ title, data, onPartnersUpdated, loading = false }) => {
	const [handleFetchAllProjects] = useLazyQuery(GET_ALL_PROJECTS, { fetchPolicy: "network-only" });
	const [handleInsertPartnerZones] = useMutation(INSERT_PARTNER_ZONES);
	const [handleUpdatePartnerStatus] = useMutation(UPDATE_PARTNER_APPROVE_STATUS);

	const { visible, toggle } = useModal();
	const [isLoading, setIsLoading] = useState(false);
	const [actionWallet, setActionWallet] = useState("");

	/** ---------- */
	const [selectedPeople, setSelectedPeople] = useState([]);
	const [projectList, setProjectList] = useState([]);

	// useLayoutEffect(() => {
	//   const isIndeterminate =
	//     selectedPeople.length > 0 && selectedPeople.length < people.length;
	//   setChecked(selectedPeople.length === people.length);
	//   setIndeterminate(isIndeterminate);
	//   checkbox.current.indeterminate = isIndeterminate;
	// }, [selectedPeople]);

	// function toggleAll() {
	//   setSelectedPeople(checked || indeterminate ? [] : people);
	//   setChecked(!checked && !indeterminate);
	//   setIndeterminate(false);
	// }

	const handleApprove = async (userId) => {
		try {
			setIsLoading(true);
			toggle();
			setActionWallet(userId);

			const responseAllProjects = await handleFetchAllProjects();

			if (Array.isArray(responseAllProjects.data?.projects) && responseAllProjects.data.projects.length) {
				const availableProjects = responseAllProjects.data?.projects.filter((availableProject) => {
          console.log({availableProject})
					return !availableProject.partner_zone;
				});

				setProjectList(availableProjects);
			}

			setIsLoading(false);
		} catch {}
	};

	const handleMappingInsertPartnerZoneObject = async (selectedProjects = []) => {
		try {
			const mapped = [];
			const today = dayjs().format("YYYY-MM-DD HH:mm:ss");

			selectedProjects.map((selectedProject) => {
				const { projectId, zoneId } = JSON.parse(selectedProject);
				mapped.push({
					partner_id: actionWallet,
					project_id: projectId,
					zone_id: zoneId,
					created_at: today,
					updated_at: today,
				});
			});

			return mapped;
		} catch {
			return [];
		}
	};

	const handleConfirmApprove = async ({ checked: selectedProjects = [] }) => {
		try {
			setIsLoading(true);

			if (selectedProjects.length) {
				const responseAllProjects = await handleFetchAllProjects();

				// if (Array.isArray(responseAllProjects.data?.projects) && responseAllProjects.data.projects.length) {
				// 	const availableProjects = responseAllProjects.data?.projects.filter((availableProject) => {
				// 		return !availableProject.partner_zone;
				// 	});

				// 	setProjectList(availableProjects);

				// 	let isMappedProject = false;
				// 	let projectnNameAndZoneName = "";
				// 	for (let j = 0; j < selectedProjects.length; j++) {
				// 		const { projectId, zoneId } = JSON.parse(selectedProjects[j]);
				// 		for (let i = 0; i < availableProjects.length; i++) {
				// 			if (
				// 				projectId === availableProjects[i].project_id &&
				// 				zoneId === availableProjects[i].zone_id
				// 			) {
				// 				isMappedProject = true;
				// 				projectnNameAndZoneName += `${availableProjects[i].project_name} : ${availableProjects[i].zone_name}`;
				// 				break;
				// 			}
				// 		}
				// 	}

				// 	if (isMappedProject) {
				// 		return Swal.fire("Warning", `${projectnNameAndZoneName} is already used`, "warning");
				// 	}
				// }

				const mappedInsertObjects = await handleMappingInsertPartnerZoneObject(selectedProjects);

				await handleInsertPartnerZones({
					variables: { objects: mappedInsertObjects },
					async onCompleted() {
						await handleUpdatePartnerStatus({
							variables: {
								partnerId: actionWallet,
								approveStatus: true,
								approvedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
							},
							async onCompleted() {
								toggle();
								Swal.fire("Success", "Approved successfully", "success");
								await onPartnersUpdated();
							},
							async onError(error) {
								console.error(error);
								Swal.fire("Warning", "Failed to approve", "warning");
							},
						});
					},
					async onError(error) {
						console.error(error);
						Swal.fire("Warning", "Failed to approve", "warning");
					},
				});
			} else {
				Swal.fire("Warning", "Please select project and zone", "warning");
			}
		} catch (e) {
			console.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const initialize = async () => {
		const filter = {
			is_opend: true,
		};
	};

	useEffect(() => {
		initialize();
	}, []);

	return (
		<>
			<div className="px-4 sm:px-6 lg:px-0">
				{title}
				<div className="mt-4 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								{/* {selectedPeople.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Delete all
                    </button>
                  </div>
                )} */}

								<table className="min-w-full table-fixed divide-y divide-gray-300">
									<thead className="bg-gray-50 ">
										<tr className="partnerstable">
											{/* <th
                        scope="col"
                        className="relative w-12 px-6 sm:w-16 sm:px-8"
                      >
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th> */}
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
												#
											</th>
											<th
												scope="col"
												className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold"
											>
												Company
											</th>
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
												Created
											</th>
											<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">
												Verified
											</th>
											<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 font-semibold">
												Action
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{loading && (
											<tr>
												<td colSpan="5" className="py-5 text-center">
													<Spinner size="md" color="black" textColorClass="text-dark" />
												</td>
											</tr>
										)}

										{!loading && data.length < 1 && (
											<tr>
												<td colSpan="5">
													<h4 className="my-5 text-center">Partner Not Found.</h4>
												</td>
											</tr>
										)}

										{data.length > 0 &&
											data.map((user, key) => (
												<tr
													key={`${user.email}_${key}`}
													className={selectedPeople.includes(user) ? "bg-gray-50" : undefined}
												>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{key + 1}
													</td>
													<td>
														<div className="whitespace-nowrap py-4 pr-3 text-sm font-medium">
															<div className="font-medium text-gray-900">
																{user.company_name ? user.company_name : "-"}
															</div>
															<div className="text-gray-500">
																Contact name :{" "}
																{user.contact_name ? user.contact_name : "-"}
															</div>
															<div className="text-gray-500">
																Phone : {user.phone_number ? user.phone_number : "-"}
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss")}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
														{user.is_approve ? (
															<i className="fa-solid fa-circle-check text-green-400"></i>
														) : (
															<i className="fa-solid fa-circle-xmark text-red-400"></i>
														)}
													</td>
													<td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
														<button
															onClick={() => handleApprove(user.id)}
															disabled={user.is_approve}
															className="btn-approve"
														>
															{isLoading && actionWallet === user.id
																? "Waiting..."
																: "Approve"}
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
			</div>

			<ApprovePartner
				isOpen={visible}
				closeModal={() => toggle()}
				confirmApprove={handleConfirmApprove}
				projectList={projectList}
			/>

			{/* -------------------- */}
		</>
	);
};

export default memo(PartnersTableList);
