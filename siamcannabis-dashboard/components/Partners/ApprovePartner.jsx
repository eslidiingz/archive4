/* This example requires Tailwind CSS v2.0+ */
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import CheckboxTree from "react-checkbox-tree";
import { generateProjectCheckboxTree } from "../../utils/misc";

const ApprovePartner = ({ isOpen, closeModal, confirmApprove, projectList = [] }) => {
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkboxTreeNodes, setCheckboxTreeNodes] = useState([]);

	const initProjectCheckboxTree = useCallback(async () => {
		setChecked([]);
		setExpanded([]);
		setCheckboxTreeNodes(await generateProjectCheckboxTree(projectList));
	}, [projectList]);

	useEffect(() => {
		let mounted = true;

		if (mounted) initProjectCheckboxTree();

		return () => {
			mounted = false;
		};
	}, [projectList, initProjectCheckboxTree]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
									Matching Project and Zone
								</Dialog.Title>
								<div className="mt-2">
									<CheckboxTree
										nodes={checkboxTreeNodes}
										checked={checked}
										expanded={expanded}
										onCheck={(checked) => setChecked(checked)}
										onExpand={(expanded) => setExpanded(expanded)}
									/>
								</div>

								<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
									<button
										type="button"
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm btn-add"
										onClick={() => confirmApprove({ checked })}
									>
										Confirm
									</button>
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm "
										onClick={closeModal}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default memo(ApprovePartner);
