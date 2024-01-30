/** @format */

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, TagIcon, InboxIcon, UsersIcon, XIcon } from "@heroicons/react/outline";

import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const navigation = [
	// { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
	{ name: "Partner", href: "/partners", icon: UsersIcon, current: true },
	{ name: "Projects", href: "/projects", icon: FolderIcon, current: false },
	{ name: "Voucher Partners", href: "/voucher", icon: TagIcon, current: false },
];

export default function AdminSidebar(props) {
	const { data: sessionData } = useSession();

	const onSignOut = () => {
		Swal.fire({
			title: "Confirmation",
			text: "Do you want to Sign Out?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "OK",
		}).then((result) => {
			if (result.isConfirmed) {
				signOut();
			}
		});
	};

	const onSidebarClosed = () => {
		console.log("onSidebarClosed");
		props.onSidebarClosed && props.onSidebarClosed();
	};

	const initialize = async () => {
		// Coding...
	};

	return (
		<>
			<Transition.Root show={props.isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-40 md:hidden" onClose={onSidebarClosed}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 flex z-40">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => onSidebarClosed()}
										>
											<span className="sr-only">Close sidebar</span>
											<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
									<div className="flex-shrink-0 flex items-center px-4">
										<img className="h-8 w-auto" src="/assets/logo.svg" alt="SiamCannabis" />
										<div className="text-white text-2xl ml-2 uppercase">Siam Cannabis</div>
									</div>
									<nav className="mt-5 px-2 space-y-1">
										{navigation.map((item) => (
											<Link key={item.name} href={item.href}>
												<a
													className={classNames(
														Router.pathname === item.href
															? `bg-gray-900 text-white`
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"group flex items-center px-2 py-2 text-base font-medium rounded-md"
													)}
												>
													<item.icon
														className={classNames(
															Router.pathname === item.href ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
															"mr-4 flex-shrink-0 h-6 w-6"
														)}
														aria-hidden="true"
													/>
													{item.name}
												</a>
											</Link>
										))}
									</nav>
								</div>
								<div className="flex-shrink-0 flex bg-gray-700 p-4">
									<a href="#" className="flex-shrink-0 w-full group block">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												{/* <div>
												<img
													className="inline-block h-10 w-10 rounded-full"
													src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</div> */}
												<div className="ml-3">
													<p className="text-sm font-medium text-white">{sessionData.user?.email || ""}</p>
													{/* <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p> */}
												</div>
											</div>
											<div>
												<button onClick={onSignOut}>
													<i className="fa fa-sign-out-alt text-white hover:text-gray-400"></i>
												</button>
											</div>
										</div>
									</a>
								</div>
							</Dialog.Panel>
						</Transition.Child>
						<div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="flex-1 flex flex-col min-h-0 bg-gray-800">
					<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
						<div className="flex items-center flex-shrink-0 px-4">
							<img className="h-8 w-auto" src="/assets/logo.svg" alt="Merx" />
							<div className="text-white text-xl ml-2 uppercase">Siam Cannabis</div>
						</div>
						<nav className="mt-5 flex-1 px-2 space-y-1">
							{navigation.map((item) => (
								<Link key={item.name} href={item.href}>
									<a
										className={classNames(
											Router.pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
											"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
										)}
									>
										<item.icon
											className={classNames(
												Router.pathname === item.href ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
												"mr-3 flex-shrink-0 h-6 w-6"
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								</Link>
							))}
						</nav>
					</div>
					<div className="flex-shrink-0 flex bg-gray-700 p-4">
						<div href="#" className="flex-shrink-0 w-full group block">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="ml-3">
										<p className="text-sm font-medium text-white">{sessionData.user?.email || ""}</p>
										{/* <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p> */}
									</div>
								</div>
								<div>
									<button onClick={onSignOut}>
										<i className="fa fa-sign-out-alt text-white hover:text-gray-400"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
