import { memo, useState } from "react";
import dayjs from "dayjs";
import ProjectsTableItem from "./ProjectsTableItem";
import Link from "next/link";
import Spinner from "../Spinner";

const ProjectsTable = ({ projects = [], loading = false }) => {
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-0">
				<div className="text-right">
					<Link href="/projects/AddProject">
						<button
							type="button"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-add"
						>
							Add Project
						</button>
					</Link>
				</div>
				<div className="mt-4 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full table-fixed divide-y divide-gray-300 projectstable">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-sm font-semibold "
											>
												#
											</th>
											<th
												scope="col"
												className="min-w-[12rem] py-3.5 pr-3 text-center text-sm font-semibold "
											>
												Project
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-sm font-semibold "
											>
												Zone
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-sm font-semibold "
											>
												Start Selling Date
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-sm font-semibold "
											>
												End Selling Date
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-center text-sm font-semibold "
											>
												End Holding Date
											</th>
											{/* <th
                                                scope="col"
                                                className="relative text-center py-3.5 pl-3 pr-4 sm:pr-6 font-semibold text-gray-700"
                                            >
                                                Action
                                            </th> */}
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{loading && (
											<tr>
												<td colSpan="6" className="py-5 text-center">
													<Spinner size="md" color="black" textColorClass="text-dark" />
												</td>
											</tr>
										)}
										{!loading && Array.isArray(projects) && projects.length < 1 && (
											<tr className="text-center">
												<td colSpan={5}>
													<h4 className="my-5 text-center">Project Not Found.</h4>
												</td>
											</tr>
										)}
										{!loading &&
											Array.isArray(projects) &&
											projects.length > 0 &&
											projects.map((project, index) => (
												<ProjectsTableItem key={index} data={project} index={index + 1} />
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

export default memo(ProjectsTable);
