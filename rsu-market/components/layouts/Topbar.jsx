import Link from "next/link";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Search from "../form/search";
import { useEffect, useState } from "react";
// import {
//   ConnectMetamask,
//   DisconnectMetamask,
//   GetShortAddress,
//   GetWalletAddress,
//   isConnected,
// } from "../../utils/ethers/connect-metamask";

import Image from "next/image";

import { useWalletContext } from "/context/wallet";
import Config, { debug } from "/configs/config";
import { web3Modal, web3Provider } from "/utils/providers/connector";
import Swal from "sweetalert2";
import { shortWallet } from "/utils/misc";
import { ethers } from "ethers";

function Topbar() {
  const { wallet, walletAction } = useWalletContext();

  const [isActive, setActive] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const toggleMode = () => {
    setActive(!isActive);
  };
  const [walletAddress, setWalletAddress] = useState(null);
  const initialize = async () => {
    await WalletHandler();
    let wallet = await GetWalletAddress();
    if (wallet) setWalletAddress(wallet);
  };
  const WalletHandler = async () => {
    const _isSign = await isConnected();
    setIsSign(_isSign);
    console.log(_isSign);
  };
  useEffect(() => {
    // initialize();
    // window.ethereum.on("accountsChanged", (accounts) => {
    //   let acc = accounts[0];
    //   if (acc) setWalletAddress(acc);
    // });
  }, []);

  const getNetworkId = async () => {
    try {
      const provider = web3Provider();
      const { chainId } = await provider?.getNetwork();

      return chainId;
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async (chainId) => {
    const currentChainId = await getNetworkId();

    if (currentChainId !== chainId) {
      try {
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(chainId).toString() }],
          })
          .then((res) => {
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        if (error.code === 4902) {
          console.log("add chain");
        }
      }
    }
  };

  const switchChainID = async () => {
    try {
      await window.ethereum.on("chainChanged", (chain) => {
        if (Number(chain) !== Config.CHAIN_ID) {
          switchNetwork(Config.CHAIN_ID);
          location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (debug)
      console.log(`%c========== Connect wallet ==========`, "color: orange");

    if (typeof window.ethereum === "undefined") {
      Swal.fire(
        "Warning",
        "Please, Install metamark extension to connect DApp",
        "warning"
      );
      return;
    }

    const _web3Modal = web3Modal();

    try {
      const _wInstance = await _web3Modal.connect();
      const _wProvider = web3Provider(_wInstance);
      const signer = _wProvider.getSigner();

      walletAction.store(await signer.getAddress());

      await switchNetwork(Config.CHAIN_ID);
      await switchChainID();
    } catch (error) {
      Swal.fire("Error", error.toString().replace("Error: ", ""), "error");
    }
  };

  useEffect(() => {
    if (wallet) {
      connectWallet();
    }
  }, [wallet]);

  return (
    <>
      <Navbar className="backdrop-blur topbar" expand="lg" fixed="top">
        <Container className="justify-content-between py-1">
          <Link href="/">
            <a className=" navbar-brand">
              <img
                height={50}
                alt=""
                src="/assets/rsu-image/ShoreaMuse-logo.svg"
              />
            </a>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {/* Mobile Version */}
          <Navbar.Collapse id="navbarScroll" className="topbar-right">
            <Nav className="nav-menucustom w-full" navbarScroll>
              <Link href="/Explore-collection">
                <a className="nav-link">Explore</a>
              </Link>
              <Link href="/Stats">
                <a className="nav-link">Stats</a>
              </Link>
              {/* <Link href="/Create">
                <a className="nav-link">Create</a>
              </Link> */}
              <div className="d-lg-none">
                <Button className="btn-hover color-1 w-full">
                  {walletAddress
                    ? GetShortAddress(walletAddress)
                    : "Connect Wallet"}
                </Button>

                {/* Login */}
                <Nav.Link href="#" className="w-300">
                  Your Wallet
                  <div className="one-line-dot">
                    <i onClick={(e) => connectWallet()}>
                      {/* {!walletAddress ? "Connect metamask" : walletAddress} */}
                    </i>
                    {/* <i onClick={() => ConnectMetamask()}>
                      {!walletAddress ? "Connect metamask" : walletAddress}
                    </i> */}
                  </div>
                </Nav.Link>
                <Nav.Link href="/Profile">Profile</Nav.Link>
                {/* <Nav.Link href="#">Setting</Nav.Link> */}
              </div>
            </Nav>
          </Navbar.Collapse>
          {/* End Mobile Version */}

          {/* Desktop Version */}
          <div className="d-none d-lg-flex">
            <div className="">
              <div className="d-flex gap-2 mx-3">
                {/* <div
                  className={`mode my-auto ${isActive ? "active" : ""}`}
                  onClick={toggleMode}
                ></div> */}
                {wallet ? (
                  <DropdownButton
                    align="end"
                    title={shortWallet(wallet)}
                    id="dropdown-menu-align-end"
                  >
                    <Link href="/Profile">
                      <a aria-selected="false" className="dropdown-item">
                        My Profile
                      </a>
                    </Link>
                    <Link href="/Create">
                      <a aria-selected="false" className="dropdown-item">
                        Create NFT
                      </a>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Disconnect</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  <button
                    className="btn btn-hover color-1 w-fit"
                    onClick={() => connectWallet()}
                  >
                    Connect Wallet
                  </button>
                )}

                {/* <DropdownButton
                  variant="outline-secondary"
                  id="input-group-dropdown-1"
                  align="end"
                  title={wallet ? shortWallet(wallet) : "Connect Wallet"}
                >
                  <button
                    className="btn btn-hover color-1 w-fit"
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    {wallet ? shortWallet(wallet) : "Connect Wallet"}
                  </button>
                  <Dropdown.Item className="w-300">
                    <p className="mb-0">Your Wallet</p>

                    <div className="one-line-dot">
                    <i onClick={() => connectWallet()}>
                        {!walletAddress ? "Connect metamask" : walletAddress}
                      </i>
                    <i onClick={() => ConnectMetamask()}>
                        {!walletAddress ? "Connect metamask" : walletAddress}
                      </i>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Setting</Dropdown.Item>
                </DropdownButton> */}
              </div>
              <div className="ms-4 ms-xxl-0 w-100">
                {/* <button
                  className="btn btn-hover color-1 w-fit"
                  onClick={() => {
                    ConnectMetamask();
                  }}
                >
                  {walletAddress
                    ? GetShortAddress(walletAddress)
                    : "Connect Wallet"}
                </button> */}
              </div>
            </div>
          </div>
          {/* End Desktop Version */}
          <div className="hide-menu">
            {/* <Button className="btn-hover color-1 form-control" >Connect Wallet</Button> */}

            {/* Login */}
            {/* <DropdownButton
                  className="navbar-user-btn mobile-view"
                  variant="outline-secondary"
                  id="input-group-dropdown-1"
                  align="end"
                >
                  <Dropdown.Item className="w-300" >
                    Your Wallet
                    <div className="one-line-dot">0x8AfCa4EC80B712a1691d4eE593a8B6eaa93b39570x8AfCa4EC80B712a1691d4eE593a8B6eaa93b3957</div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Setting</Dropdown.Item>
              </DropdownButton> */}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
export default Topbar;
