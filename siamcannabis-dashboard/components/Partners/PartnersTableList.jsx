import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApprovePartner from "./ApprovePartner";
import Spinner from "../Spinner";
import useModal from "../../hooks/useModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_PARTNER } from "../../models/Partner";
import Link from "next/link";


const PartnersTableList = ({ title, data, loading = false }) => {
	// const [handleFetchAllProjects] = useLazyQuery(GET_ALL_PROJECTS, { fetchPolicy: "network-only" });
	const [handleUpdatePartner] = useMutation(UPDATE_PARTNER);

	const { visible, toggle } = useModal();
	const [isLoading, setIsLoading] = useState(false);
	const [actionWallet, setActionWallet] = useState("");


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
													// className={selectedPeople.includes(user) ? "bg-gray-50" : undefined}
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
														<Link href={`/partners/${user.id}`}>
														<button
															// disabled={user.is_approve}
															className="btn-approve"
														>
															{isLoading && actionWallet === user.id
																? "Waiting..."
																: "Edit"}
														</button>
														</Link>
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

			

		</>
	);
};

export default memo(PartnersTableList);
