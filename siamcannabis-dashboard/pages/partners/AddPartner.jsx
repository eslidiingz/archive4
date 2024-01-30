import { useState } from "react";
import { useRouter } from "next/router"
import AdminLayout from "../../components/Layouts/Admin/AdminLayout";
import Link from "next/link";
import Swal from "sweetalert2";
import { useWalletContext } from "../../context/Wallet";
import { INSERT_PARTNER } from "../../models/Partner";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import bcrypt from 'bcryptjs';

const AddPartner = () => {
    const router = useRouter();
    const today = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    const salt = bcrypt.genSaltSync(10);

    const { wallet } = useWalletContext();

    const [handleInsertPartner] = useMutation(INSERT_PARTNER);

    const [formAddPartner, setFormAddPartner] = useState({
        userName: '',
        passWord: '',
        partnerType: '',
        companyName: '',
        contactName: '',
        phoneNumber: '',
        isActive: false,
        isApprove: false,
        approveAt: null,
        createdAt: today,
        updatedAt: today,
        email: ''
    });

    const [validateForm, setValidateForm] = useState({
        userName: {invalid: false, message: 'Please fill out this field.'},
        passWord: {invalid: false, message: 'Please choose a password.'},
        partnerType: {invalid: false, message: 'Please select an option.'},
        companyName: {invalid: false, message: 'Please fill out this field.'},
        contactName: {invalid: false, message: 'Please fill out this field.'},
        phoneNumber: {invalid: false, message: 'Please fill out this field.'},
        isActive: {invalid: false, message: ''},
        isApprove: {invalid: false, message: ''},
        approveAt: {invalid: false, message: ''},
        createdAt: {invalid: false, message: ''},
        updatedAt: {invalid: false, message: ''},
        email: {invalid: false, message: 'Please fill out this field.'},
    });

    const handleChangeformAddPartner = (e) => {
        setFormAddPartner((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validateAddProjectInput = async () => {
        try{
            let validated = true;
            for (let inputKey in formAddPartner) {
                if (formAddPartner.hasOwnProperty(inputKey)) {
                    let isInvalid = false;

                    if(inputKey === 'userName'){
                        if(!formAddPartner[inputKey].trim() || formAddPartner[inputKey].trim() < 1){
                            validated = false;
                            isInvalid = true;
                        }
                    // }else if(inputKey !== 'passWord'){
                    //     if(!formAddPartner[inputKey].trim() || formAddPartner[inputKey].trim() < 0){
                    //         validated = false;
                    //         isInvalid = true;
                    //     }
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
    
    const handleMappingProjectObject = async () => {
        return {
            username: formAddPartner.userName,
            password: bcrypt.hashSync(formAddPartner.passWord, salt),
            partner_type: formAddPartner.partnerType,
            company_name: formAddPartner.companyName,
            contact_name: formAddPartner.contactName,
            phone_number: parseInt(formAddPartner.phoneNumber).toString(),
            is_active: formAddPartner.isActive,
            is_approve: formAddPartner.isApprove,
            approved_at: parseInt(formAddPartner.approveAt),
            created_at: formAddPartner.createdAt,
            updated_at: formAddPartner.updatedAt,
            email: formAddPartner.email
        };
    };

    const handleSubmitProject = async () => {
        try{
            if(!wallet){
                Swal.fire('Warning','Please connect your wallet','warning');
                return;
            }

            const validated = await validateAddProjectInput();

            if (!validated) {
                Swal.fire('Warning','Please enter required input','warning');
                return;
            }

            // console.log({formAddPartner});return;
            
            const mappedProjectObject = await handleMappingProjectObject();
            // console.log(mappedProjectObject, "mappedProjectObject from handleSubmitProject")

            await handleInsertPartner({ variables: {
                object: mappedProjectObject
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

    return (
        <AdminLayout pageTitle="Add Partner">
            <section>
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="px-4 sm:px-6 lg:px-0">
                        <div className="mt-4 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Username <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="userName" value={formAddPartner.userName} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.userName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="password" name="passWord" placeholder="******************" value={formAddPartner.passWord} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.passWord.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Company Name <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="companyName" value={formAddPartner.companyName} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.companyName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Partner Type <span className="text-red-500">*</span>
                                                </label>
                                                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="companyName" value={formAddPartner.companyName} onChange={handleChangeformAddPartner} /> */}
                                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" name="partnerType" value={formAddPartner.partnerType} onChange={handleChangeformAddPartner}>
                                                    <option hidden >Please select an option</option>
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
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="contactName" value={formAddPartner.contactName} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.contactName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="phoneNumber" value={formAddPartner.phoneNumber} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.phoneNumber.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={formAddPartner.email} onChange={handleChangeformAddPartner} />
                                                <p className="text-red-500 text-xs italic">{validateForm.email.message}</p>
                                            </div>
                                        </div>

                                        

                                        <div className="flex items-center justify-between">
                                            <Link href="/partners">
                                                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                    Back
                                                </button>
                                            </Link>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmitProject}>
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