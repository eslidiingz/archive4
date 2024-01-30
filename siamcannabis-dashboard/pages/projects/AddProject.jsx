import { useState } from "react";
import { useRouter } from "next/router"
import AdminLayout from "../../components/Layouts/Admin/AdminLayout";
import Link from "next/link";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner"
import { useWalletContext } from "../../context/Wallet";
import { setOpenZone } from "../../models/web3/Land";
import { parseEther } from "ethers/lib/utils";
import { convertDateToTimestampSecond } from "../../utils/misc";
import { BigNumber } from "ethers";
import { INSERT_PROJECT } from "../../models/Project";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";

const AddProject = () => {
    const router = useRouter();

    const { wallet } = useWalletContext();

    const [handleInsertProject] = useMutation(INSERT_PROJECT);

    const [loading, setLoading] = useState(false);

    const [formAddProject, setFormAddProject] = useState({
        projectName: '',
        zoneName: '',
        projectId: '',
        startSellingDate: '',
        endSellingDate: '',
        endProjectDate: '',
        rewardRate: '',
        assetPrice: '',
        clinicReward: '',
        receiveWalletAddress: '',
        assetAmount: ''
    });

    const [validateForm, setValidateForm] = useState({
        projectName: {invalid: false, message: ''},
        zoneName: {invalid: false, message: ''},
        projectId: {invalid: false, message: '', acceptZero: true},
        startSellingDate: {invalid: false, message: ''},
        endSellingDate: {invalid: false, message: ''},
        endProjectDate: {invalid: false, message: ''},
        rewardRate: {invalid: false, message: '', acceptZero: true},
        assetPrice: {invalid: false, message: '', acceptZero: true},
        clinicReward: {invalid: false, message: '', acceptZero: true},
        assetAmount: {invalid: false, message: '', acceptZero: false},
        receiveWalletAddress: {invalid: false, message: ''}
    });

    const handleChangeFormAddProject = (e) => {
        setFormAddProject((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validateAddProjectInput = async () => {
        try{
            let validated = true;
            for (let inputKey in formAddProject) {
                if (formAddProject.hasOwnProperty(inputKey)) {
                    let isInvalid = false;

                    if(inputKey === 'assetAmount'){
                        if(!formAddProject[inputKey].trim() || formAddProject[inputKey].trim() < 1){
                            validated = false;
                            isInvalid = true;
                        }
                    }else if(inputKey !== 'receiveWalletAddress'){
                        if(!formAddProject[inputKey].trim() || formAddProject[inputKey].trim() < 0){
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

    const handleMappingProjectObject = async (zoneId = null) => {
        const today = dayjs().format('YYYY-MM-DDTHH:mm:ss');

        return {
            project_name: formAddProject.projectName,
            zone_name: formAddProject.zoneName,
            project_id: parseInt(formAddProject.projectId),
            zone_id: parseInt(zoneId),
            start_sale_time: formAddProject.startSellingDate,
            end_sale_time: formAddProject.endSellingDate,
            zone_max: parseInt(formAddProject.assetAmount),
            end_holding_time: formAddProject.endProjectDate,
            zone_reward_rate: parseInt(formAddProject.rewardRate),
            land_price: parseInt(formAddProject.assetPrice),
            clinic_reward_rate: parseInt(formAddProject.clinicReward),
            clinic_name: '',
            is_opened: true,
            created_at: today,
            updated_at: today
        };
    };

    const handleSubmitProject = async () => {
        try{
            setLoading(true);

            if(!wallet){
                Swal.fire('Warning','Please connect your wallet','warning');
                return;
            }

            const validated = await validateAddProjectInput();

            if (!validated) {
                Swal.fire('Warning','Please enter required input','warning');
                return;
            }
            
            const projectInfoObject = {...formAddProject};

            projectInfoObject.startSellingDate = convertDateToTimestampSecond(projectInfoObject.startSellingDate);
            projectInfoObject.endSellingDate = convertDateToTimestampSecond(projectInfoObject.endSellingDate);
            projectInfoObject.endProjectDate = convertDateToTimestampSecond(projectInfoObject.endProjectDate);
            projectInfoObject.assetPrice = parseInt(BigNumber.from(parseEther(formAddProject.assetPrice))._hex, 16).toString();

            const responseAddProject = await setOpenZone(projectInfoObject);

            if(responseAddProject.status){
                const mappedProjectObject = await handleMappingProjectObject(responseAddProject.zoneId);

                await handleInsertProject({ variables: {
                    object: mappedProjectObject
                },
                async onCompleted(){
                    Swal.fire('Success','Added project successful','success');
                    setTimeout(() => {
                        router.push('/projects');   
                    }, 2300);
                },
                async onError(error){
                    console.error(error);
                    Swal.fire('Warning','Failed to add project','warning');
                }});
            }
        }catch (e){
            console.error(e)
            Swal.fire('Warning','Failed to add project','warning');
        }finally{
            setLoading(false);
        }
    };

    return (
        <AdminLayout pageTitle="Add Project">
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
                                                    Project Name <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="projectName" value={formAddProject.projectName} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.projectName.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Zone Name <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="zoneName" value={formAddProject.zoneName} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.zoneName.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Project ID <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="projectId" value={formAddProject.projectId} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.projectId.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Start Selling Date <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" name="startSellingDate" value={formAddProject.startSellingDate} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.startSellingDate.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    End Selling Date <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" name="endSellingDate" value={formAddProject.endSellingDate} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.endSellingDate.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    End Project Date <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" name="endProjectDate" value={formAddProject.endProjectDate} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.endProjectDate.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Reward rate <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="rewardRate" value={formAddProject.rewardRate} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.rewardRate.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Asset Price <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="assetPrice" value={formAddProject.assetPrice} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.assetPrice.message}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Clinic Raward <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="clinicReward" value={formAddProject.clinicReward} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.clinicReward.message}</p>
                                            </div>
                                            <div class="w-full md:w-1/2 px-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Receive Wallet Address <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="receiveWalletAddress" value={formAddProject.receiveWalletAddress} onChange={handleChangeFormAddProject} disabled={loading} />
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap -mx-3 mb-6">
                                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Asset Amount <span className="text-red-500">*</span>
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" type="text" name="assetAmount" value={formAddProject.assetAmount} onChange={handleChangeFormAddProject} disabled={loading} />
                                                <p className="text-red-500 text-xs italic">{validateForm.assetAmount.message}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end">
                                            {!loading && 
                                            <Link href="/projects">
                                                <button className="inline-flex items-center px-4 py-2 ml-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150">
                                                    Back
                                                </button>
                                            </Link>
                                            }
                                            <button className={`inline-flex items-center px-4 py-2 ml-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 ${loading ? 'cursor-not-allowed' : ''}`} type="button" onClick={handleSubmitProject} disabled={false}>
                                                {loading ? <Spinner color="white" textColorClass="text-white" /> : 'Submit'}
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

export default AddProject;