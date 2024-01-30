import { useState } from "react";
import Mainlayout from "/components/layouts/Mainlayout";
import React from "react";
import Link from "next/link";
import Search from "../components/form/Search";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import TablesClinic from "../components/tables/TablesClinic";
import Redeem from "../components/modal/Redeem";
import Pagination from "react-bootstrap/Pagination";

const presalePage = () => {
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  let active = 1;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const handleOpenRedeemModal = () => {
    setShowRedeemModal(true);
  };

  const handleCloseRedeemModal = () => {
    setShowRedeemModal(false);
  };

  return (
    <>
      <section>
        <div className="container fix-container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12 mb-3">
              <div className="bg-topic_clinic">
                <p className="topic_clinic">Total Coupon</p>
                <p className="detail-topic_clinic">15</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 mb-3">
              <div className="bg-topic_clinic">
                <p className="topic_clinic">Total Redeem</p>
                <p className="detail-topic_clinic">15</p>
              </div>
            </div>
            <div className="col-lg-6 col-12 mb-5">
              <div className="bg-topic_clinic search">
                <p className="topic_clinic mb-2">Use Coupon</p>
                <InputGroup className="mb-3">
                  <i className="fas fa-search icon-search_redeem "></i>
                  <Form.Control
                    placeholder="Scan or Search for coupon.."
                    aria-describedby="basic-addon2"
                  />
                  <div className="btn_redeemSearch">
                    <Button onClick={handleOpenRedeemModal}>
                      <p>Redeem</p>
                    </Button>
                  </div>
                  <Redeem
                    show={showRedeemModal}
                    onClose={handleCloseRedeemModal}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="col-md-5 col-12 mb-3 redeem">
              <div className="row layout_redeem">
                <div className="col-9">
                  <Search placeholder="Search Coupon ID or Wallet Address.." />
                </div>
                <div className="col-3">
                  <Button>
                    <p className="w-100">Search</p>
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-12 d-flex align-items-center justify-content-end clinic_filter">
              <p className="topic_filter">Project</p>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <p className="text-filter_clinic">1st Presale</p>
                  <p className="text-filter_clinic-m">Project 1st Presale</p>
                  <img src="../assets/image/clinic/dropdown_icon.svg" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-12 mt-4 mb-5">
              <div className="bg_tables">
                <div className="overflow">
                  <TablesClinic />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First className="set-next" />
                    {items}
                    <Pagination.Last className="set-next" />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default presalePage;
presalePage.layout = Mainlayout;
