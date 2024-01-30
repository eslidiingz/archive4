import dayjs from "dayjs";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { approveUserVerify } from "/models/User";
import { Contract, providers, Wallet } from 'ethers';
import Config from "../../configs/config";
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserTableList(props) {
  const { users } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [actionWallet, setActionWallet] = useState("");

  /** ---------- */
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

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

  const handleApprove = async (_wallet) => {
    setIsLoading(true);
    setActionWallet(_wallet);

    Swal.fire({
      title: "Confirmation",
      text: "Do you want to approve this wallet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const provider = new providers.JsonRpcProvider(Config.RPC);
        const signer = new Wallet(Config.SETTER_WALLET, provider);

        const marketContract = new Contract(Config.MARKETPLACE_CA, Config.MARKETPLACE_ABI, signer);
        const tx = await marketContract.setIsWalletVerified(_wallet, true);
        const verifyTx = await tx.wait();
        if(verifyTx){
          let approved = await approveUserVerify(_wallet);
          if (approved && approved.data.length > 0) {
            emitUserUpdated();
          }
        }
      }
    });

    setIsLoading(false);
  };

  const emitUserUpdated = () => {
    props.onUserUpdated && props.onUserUpdated();
  };

  const initialize = async () => {};

  useEffect(() => {
    initialize();
  }, [props]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-0">
        {props.title}

        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {/* {selectedPeople.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Delete all
                    </button>
                  </div>
                )} */}

                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
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
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-700"
                      >
                        Wallet
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-700"
                      >
                        Verified
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 font-semibold text-gray-700"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user, key) => (
                      <tr
                        key={user.email}
                        className={
                          selectedPeople.includes(user)
                            ? "bg-gray-50"
                            : undefined
                        }
                      >
                        {/* <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedPeople.includes(user) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                            value={user.email}
                            checked={selectedPeople.includes(user)}
                            onChange={(e) =>
                              setSelectedPeople(
                                e.target.checked
                                  ? [...selectedPeople, user]
                                  : selectedPeople.filter((p) => p !== user)
                              )
                            }
                          />
                        </td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {key + 1}
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                            selectedPeople.includes(user)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          {user.wallet}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {user.isVerified ? (
                            <i className="fa-solid fa-circle-check text-green-400"></i>
                          ) : (
                            <i className="fa-solid fa-circle-xmark text-red-400"></i>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleApprove(user.wallet)}
                            disabled={user.isVerified}
                            className="button-primary"
                          >
                            {isLoading && actionWallet === user.wallet
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

      {/* -------------------- */}
    </>
  );
}

export default UserTableList;
