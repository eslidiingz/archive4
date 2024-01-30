import { useWalletContext } from "../../../context/Wallet";
import { shortWallet } from "../../../utils/misc";

const AdminTopbar = ({ handleWallet }) => {

    const { wallet, walletBalance, tokenSymbol, usdcBalance, walletAction } = useWalletContext();

    return (
        <>
            <nav className="flex items-center justify-end flex-wrap bg-head p-3 md:pl-64 max-h-nav">
                <div className=" items-center flex-shrink-0 text-white md:px-6 lg:px-8 justify-end">
                    {!wallet && <div className="text-sm lg:flex-grow">
                        <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            onClick={handleWallet}
                        >
                            Connect Wallet
                        </button>
                    </div>}
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <h3 className="pt-1">{wallet ? `Wallet : ${shortWallet(wallet)}` : ""}</h3>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminTopbar;
