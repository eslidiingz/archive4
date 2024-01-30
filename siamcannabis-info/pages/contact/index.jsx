import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";



const Contact = () => {
 
  return (
    <>
    <section className="layout_contact">
      <div className="container fix-container my-md-5 my-3">
      <div className="body_detailNews">
        <div className="row">
            <div className="col-lg-4 col-12">
                <p className="topic_project m-0 mb-lg-4 mb-3">สถานที่ตั้ง</p>
                <p className="text-location_project mb-lg-5 mb-3">
					SP investerest Ltd.<br/>
					Kemp House,160 City Road, London, EC1V 2NX, UNITED KINGDOM<br/>
					Mr.Sarawut Sartpant
				</p>
                {/* <p className="topic_project m-0 mb-lg-4 mb-3">เบอร์ติดต่อ</p>
                <p className="text-location_project">(307) 555-0133</p>
                <p className="text-location_project mb-lg-5 mb-3">(603) 555-0123</p>
                <p className="topic_project m-0 mb-lg-4 mb-3">เบอร์ติดต่อ</p>
                <p className="text-location_project">alma.lawson@example.com</p> */}
            </div>
            <div className="col-lg-8 col-12">
                <p className="topic_project m-0 mb-3">Google Map</p>
				<iframe className="map_project" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2408154518307!2d-0.07579638419350024!3d51.50879781842194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603b28df3e485%3A0x3e8de887300d9d0c!2sTower%20Bridge%20House!5e0!3m2!1sth!2sth!4v1657015444978!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
         </div>
    </div>
      </div>
    </section>
      
    </>
  );
};

export default Contact;
Contact.layout = Mainlayout;
