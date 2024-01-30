import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Tab from 'react-bootstrap/Tab'
import { Container, Row, Col, Nav} from "react-bootstrap";
import Category from "../../components/layouts/Category";
import CardExplore from "../../components/card/CardExplore";




const ExploreCollection = () => {

  return (
    <>
    <section className="section-gradient">
      <div className="container pd-top-bottom-section">
        <div className="row d-flex align-items-center">
          <div className="col-12">
            <h1 className="ci-white">Explore Collections</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-blue">
      <div className="container d-flex flex-column flex-lg-row">
        <div className="w-300-100 py-4">
          <Category/>
        </div>
        <div className="col py-4" >
          <div className="row">
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4 " >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-4" >
              <CardExplore 
                cover="/assets/rsu-image/demo/img1.png" 
                imgProfile="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
                name="Water color"
                user="Warawrp"
                title="Lorem Ipsum has been the industry's standard"
                des="Lorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummyLorem Ipsum has been the industry's standard dummy" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ExploreCollection;
ExploreCollection.layout = Mainlayout;
