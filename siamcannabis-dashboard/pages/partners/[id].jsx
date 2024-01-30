import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import AdminLayout from "../../components/Layouts/Admin/AdminLayout";
import Link from "next/link";
import Swal from "sweetalert2";
import { useWalletContext } from "../../context/Wallet";
import { UPDATE_PARTNER, GET_PARTNER_BY_ID} from "../../models/Partner";
import { useMutation, useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";

const AddPartner = () => {
    const router = useRouter();
    const today = dayjs().format('YYYY-MM-DDTHH:mm:ss');

    const { wallet } = useWalletContext();

    const [handleUpdatePartner] = useMutation(UPDATE_PARTNER);
    const [handleFetchPartnerById] = useLazyQuery(GET_PARTNER_BY_ID);

    const [formUpdatePartner, setFormUpdatePartner] = useState({
        id: parseInt(router.query.id),
        companyName: '',
        contactName: '',
        email: '',
        partnerType: '',
        phoneNumber: '',
        updatedAt: today,
    });

    const [validateForm, setValidateForm] = useState({
        id: {invalid: false, message: ''},
        companyName: {invalid: false, message: ''},
        contactName: {invalid: false, message: ''},
        email: {invalid: false, message: ''},
        partnerType: {invalid: false, message: ''},
        phoneNumber: {invalid: false, message: 'Please input only numbers'},
        updatedAt: {invalid: false, message: ''},
    });

    const handleChangeFormUpdatePartner = (e) => {
        setFormUpdatePartner((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validateUpdateInputs = async () => {
        try{
            let validated = true;

            for (let inputKey in formUpdatePartner) {
                if (formUpdatePartner.hasOwnProperty(inputKey)) {
                    let isInvalid = false;

                    if(inputKey === 'id'){
                        if(Number.isNaN(inputKey)){
                            validated = false;
                            isInvalid = true;
                        }
                    }

                    setValidateForm((prevState) => ({
                        ...prevState,
                        [inputKey]: {invalid: isInvalid, message: isInvalid ? 'Please enter value' : ''}
                    }));
                }
            }

            return validated;
        }catch{
            return false;
        }
    };

    //company_name: $companyName, 
    //contact_name: $contactName, 
    //email: $email, 
    //partner_type: $password,
    //phone_number: $phoneNumber,
    //updated_at: $updatedAt

    const handleSubmitUpdate = async () => {
        try{
            if(!wallet){
                Swal.fire('Warning','Please connect your wallet','warning');
                return;
            }

            const validated = await validateUpdateInputs();

            if (!validated) {
                Swal.fire('Warning','Please enter required input correctly','warning');
                return;
            }

            await handleUpdatePartner({ variables: {
                partnerId: parseInt(formUpdatePartner.id),
                companyName: formUpdatePartner.companyName,
                contactName: formUpdatePartner.contactName,
                email: formUpdatePartner.email,
                partnerType: formUpdatePartner.partnerType,
                phoneNumber: parseInt(formUpdatePartner.phoneNumber).toString(),
                updatedAt: formUpdatePartner.updatedAt,
            },
            async onCompleted(){
                Swal.fire('Success','Added project successful','success');
                setTimeout(() => {
                    router.push('/partners');
                }, 2300);
            },
            async onError(error){
                console.error(error);
                Swal.fire('Warning','Failed to add project','warning');
            }});
        
        }catch (e){
            console.error(e)
            Swal.fire('Warning','Failed to add project','warning');
        }
    };

    const initialize = async () => {
        try{

        const partnerInfo = await handleFetchPartnerById({ variables: { partnerId: parseInt(router.query.id) } });

        setFormUpdatePartner({
            id: parseInt(router.query.id),
            companyName: partnerInfo ? partnerInfo.data?.partners_by_pk?.company_name : '',
            contactName: partnerInfo ?  partnerInfo.data?.partners_by_pk?.contact_name : '',
            email: partnerInfo ? partnerInfo.data?.partners_by_pk?.email : '',
            partnerType: partnerInfo ? partnerInfo.data?.partners_by_pk?.partner_type : '',
            phoneNumber: partnerInfo ? partnerInfo.data?.partners_by_pk?.phone_number : '',
            updatedAt: today ? today : dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        })
        
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

    let mounted = true;
    if(mounted) initialize();
    mounted = false;

    console.log(formUpdatePartner, "formUpdatePartner useEffect")

    }, [router.query.id])

    return (
        <AdminLayout pageTitle="Update Partner">
            <section>
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="px-4 sm:px-6 lg:px-0">
                        <div className="mt-4 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Company Name <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" name="companyName" value={formUpdatePartner.companyName} onChange={handleChangeFormUpdatePartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.companyName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Partner Type <span className="text-red-500">*</span>
                                                </label>
                                                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="companyName" value={formUpdatePartner.companyName} onChange={handleChangeFormUpdatePartner} /> */}
                                                <select 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
                                                name="partnerType" value={formUpdatePartner.partnerType} onChange={handleChangeFormUpdatePartner}>
                                                    <option hidden>Please select an options</option>
                                                    <option value="clinic" >Clinic</option>
                                                    <option value="seller">Seller</option>
                                                </select>
                                                <p className="text-red-500 text-xs italic">{validateForm.partnerType.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Contact Name <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" name="contactName" value={formUpdatePartner.contactName} onChange={handleChangeFormUpdatePartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.contactName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" pattern="[0-9]*" maxlength="10" name="phoneNumber" value={formUpdatePartner.phoneNumber} onChange={handleChangeFormUpdatePartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.phoneNumber.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="email" name="email" value={formUpdatePartner.email} onChange={handleChangeFormUpdatePartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.email.message}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Link href="/partners">
                                                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                    Back
                                                </button>
                                            </Link>
                                            <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                            type="button" 
                                            onClick={handleSubmitUpdate}>
                                                    Submit
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AddPartner;