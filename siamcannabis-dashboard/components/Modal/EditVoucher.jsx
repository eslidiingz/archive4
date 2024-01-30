import { useMutation, useLazyQuery } from "@apollo/client";
import { memo, useEffect, useState } from "react";
import { UPDATE_PARTNER_VOUCHER } from "../../models/Voucher";
import Swal from "sweetalert2";
import dayjs from "dayjs";



export default function EditVoucher({ visible, onClose, voucherInfo, partnerName }) {
  if (!visible) return null;

	const [loading, setLoading] = useState(false);
	const [handleUpdatePartnerVoucher] = useMutation(UPDATE_PARTNER_VOUCHER);


  const [form, setForm] = useState({
    id: voucherInfo?.id,
    partnerId: voucherInfo?.partner_id,
		projectId: voucherInfo?.project_id,
		zoneId: voucherInfo?.zone_id + 1,
		zoneMax: voucherInfo?.project?.zone_max,
		projectName: voucherInfo?.project?.project_name,
    createdDate: voucherInfo?.created_at,
		expirationDate: voucherInfo?.expiration_date,
		voucherSlug: voucherInfo?.voucher_slug,
    partnerName: partnerName
  });
 
  const handleOnChangeDate = (e) => {
    try {
			setForm((prevState) => ({...prevState, expirationDate: e.target.value.trim()}));
		} catch (err){
			console.error(err);
    }
	};

  const validateExpirationDate = async () => {
		try {
			let validated = true;

      let date = new Date(form.expirationDate.trim()).getTime();
      let createdDate = new Date(form.createdDate.trim()).getTime();

      if (!form.expirationDate.trim()) {
        validated = false;
      } else {
        if ( date < createdDate ) {
          validated = false;
        }
      }
				
			return validated;
		} catch {
			return false;
		}
	};


  const handleSubmitPartnerVoucher = async () => {
		try {
			setLoading(true);

      let res = await validateExpirationDate();

      if (res) {
        await handleUpdatePartnerVoucher({
          variables: { voucherId: form.id, expirationDate: form.expirationDate, updatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss") },
          async onCompleted() {
            Swal.fire("Success", "You have edited Voucher successfully", "success");
  
            setTimeout(() => {
              window.location.reload(); 
            }, 1000);
  
          },
          async onError(error) {
            console.log(error);
            Swal.fire("Warning", "Failed to add edited", "warning");
          },
        });
        
      } else if (!res) {
            Swal.fire("Warning", "Please input date later than created date.", "warning");
      }


      } catch (e) {
        console.error(e);
        Swal.fire("Warning", "Failed to add edited", "warning");
      } finally {
        onClose();
        setLoading(false);
      }
	};


  const initialize = async () => {
    console.log(voucherInfo)
    console.log(partnerName, "initialize")
	};

  
  useEffect(() => {
		let mounted = true;
		if (mounted) initialize();;
		return () => {
			mounted = false;
		};
	}, []);


  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded">
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto set-w-50">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                <div className="flex items-center justify-center p-5  border-slate-200 rounded-t  mt-8">
                  <h3 className="text-3xl font-semibold text-center">
                    Edit Voucher
                  </h3>
                  <div className="absolute-btn-onClose">
                    <button
                      className="p-1 ml-auto   float-right text-3xl leading-none font-semibold outline-none focus:outline-none set-btn-onClose"
                      onClick={onClose}
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <form class="">
                    {/* <div class="flex flex-wrap mb-5">
                      <div class="w-full  px-3  md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Vouchert-No">
                          Voucher No.
                        </label>
                        <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Vouchert-No" type="text" placeholder={voucherInfo.id} value={voucherInfo.id} disabled />
                      </div>
                    </div> */}
                    <div class="flex flex-wrap mb-5">
                      <div class="w-full  px-3  md:mb-0 set-fix">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs   font-bold mb-2" for="partners-name">
                          Partners
                        </label>
                        <div class="relative">
                          <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="partners-name" type="text" placeholder={form.partnerName} value={form.partnerName} disabled />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap  mb-8">
                      <div class="w-full md:w-1/2 px-3  md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="project-name">
                          Project
                        </label>
                        <div class="relative">
                        <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="project-name" type="text" placeholder={voucherInfo.id} value={voucherInfo.project.project_name} disabled />
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="zone-name">
                          Zone
                        </label>
                        <div class="relative">
                        <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="zone-id" type="text" placeholder={form.zoneId} value={form.zoneId} disabled />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap  mb-5">
                      <div class="w-full  px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sellvoucher">
                          Quantity to sell voucher
                        </label>
                        <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="sellvoucher" type="text" placeholder={form.zoneMax} value={form.zoneMax} disabled/>
                      </div>
                    </div>
                    <div class="flex flex-wrap  mb-5">
                      {/* <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="genarate-date">
                          Genarate Date
                        </label>
                        <input class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="genarate-date" type="date" value={voucherInfo.created_at} disabled />
                      </div> */}
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="expiration-date">
                          Expiration Date
                        </label>
                        <input 
                        class="appearance-none block w-full  text-gray-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id="expiration-date" 
                        type="date"
                        name="expiration"
                        value={form.expirationDate ? dayjs(form.expirationDate).format("YYYY-MM-DD"): "" } 
												onChange={handleOnChangeDate}
                        />
                      </div>
                    </div>
                  </form>

                  <div className="flex justify-center gap-4 mb-10 mt-10">
                  <button
                    className="btn-close font-bold text-white uppercase  py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white btn-save active:bg-emerald-600 font-bold uppercase  py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmitPartnerVoucher}
                  >
                   Edit Voucher
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}