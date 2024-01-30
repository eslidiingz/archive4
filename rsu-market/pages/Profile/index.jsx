import { useEffect, useState } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";

import Setprofile from "../../components/profile/profile";
import Setvertify from "../../components/profile/vertify";
import SetInventory from "../../components/profile/Inventory";
import SetActivity from "../../components/profile/activity";
import SetFavorites from "../../components/profile/favorites";
import SetHidden from "../../components/profile/hidden";
import SetCollection from "../../components/profile/collection";
import SetOffer from "../../components/profile/offer";
import SetSetting from "../../components/profile/setting";
import Setplacement from "../../components/profile/placement";
import Setbiding from "../../components/profile/biding";



const Profile = () => {
  const [page, setPage] = useState("profile");
  return (
    <>
      <section className="section-gradient">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <h1 className="ci-white">Profile</h1>
            </div>
            <div className="col-6 text-end">
              <p className="ci-white mb-0">
                Home <span> {">"} </span> <span> Collections </span>{" "}
                <span> {">"} </span> <span>Explore</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue test2">
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile" onSelect={(e) => {console.log(e); setPage(e)}}>
          <div className=" container d-flex-set-profile">
            <div className="w-300-100profile">
              <Nav
                variant="pills"
                className="flex-column tab-profile nav-profile-md"
              >
                <Nav.Item>
                  <Nav.Link eventKey="profile">
                    <img
                      src="assets/rsu-image/icons/profile.svg"
                      className="mx-3"
                    />
                    Profile
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="vertify">
                    <img
                      src="assets/rsu-image/icons/verify.svg"
                      className="mx-3"
                    />
                    Verification
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="inventory">
                    <img
                      src="assets/rsu-image/icons/create.svg"
                      className="mx-3"
                    />
                    Inventory
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                <Nav.Link eventKey="collected">
                <img src="assets/rsu-image/icons/collected.svg" className="mx-3" />
                Collected
                </Nav.Link>
              </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="activity">
                    <img
                      src="assets/rsu-image/icons/activity.svg"
                      className="mx-3"
                    />
                    Activity
                  </Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="favorites">
                    <img
                      src="assets/rsu-image/icons/favorites.svg"
                      className="mx-3"
                    />
                    Favorites <span> (3)</span>
                  </Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link eventKey="hidden">
                    <img
                      src="assets/rsu-image/icons/hidden.svg"
                      className="mx-3"
                    />
                    Hidden <span> (3)</span>
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="collection">
                    <img
                      src="assets/rsu-image/icons/collection.svg"
                      className="mx-3"
                    />
                    Collection <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="offer">
                    <img
                      src="assets/rsu-image/icons/offer.svg"
                      className="mx-3"
                    />
                    offer <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="settings">
                    <img
                      src="assets/rsu-image/icons/setting.svg"
                      className="mx-3"
                    />
                    Settings <span> (3)</span>
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="placement">
                    <img
                      src="assets/rsu-image/icons/placement-list.svg"
                      className="mx-3"
                    />
                    Placement list <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="biding">
                    <img
                      src="assets/rsu-image/icons/bidding.svg"
                      className="mx-3"
                    />
                    Biding list <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="col bd-left ps-lg-4 ps-0">
              <Tab.Content className="px-3 px-lg-0">
                <Tab.Pane eventKey="profile">
                  <Setprofile page={page} />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="vertify">
                  <Setvertify page={page} />
                </Tab.Pane> */}
                <Tab.Pane eventKey="inventory">
                  <SetInventory page={page}/>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="activity">
                  <SetActivity page={page} />
                </Tab.Pane>
                <Tab.Pane eventKey="favorites">
                  <SetFavorites page={page} />
                </Tab.Pane>
                <Tab.Pane eventKey="hidden">
                  <SetHidden page={page} />
                </Tab.Pane> */}
                <Tab.Pane eventKey="collection">
                  <SetCollection page={page} />
                </Tab.Pane>
                <Tab.Pane eventKey="offer">
                  <SetOffer page={page} />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="settings">
                  <SetSetting page={page} />
                </Tab.Pane> */}
                <Tab.Pane eventKey="placement">
                  <Setplacement page={page}/>
                </Tab.Pane>
                <Tab.Pane eventKey="biding">
                  <Setbiding page={page}/>
                 </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </section>
    </>
  );
};

export default Profile;
Profile.layout = Mainlayout;
