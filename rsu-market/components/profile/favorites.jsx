
import { Row, Col} from "react-bootstrap";
import Search from "../../components/form/search";
import Select from "../../components/form/select";
import CardBuy from "../../components/card/CardBuy";




function SetFavorites() {

    return (
      <>

                <Row className="my-4">
                  <Col md={6} className="my-2">
                    <Search/>
                  </Col>
                  <Col md={3} className="my-2">
                    <Select selected="Single Items"/>
                  </Col>
                  <Col md={3} className="my-2">
                    <Select selected="Price"/>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     fav="12"
                     coin="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     iconheart="12"
                     diamond="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     iconheart="12"
                     diamond="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     iconheart="12"
                     diamond="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     iconheart="12"
                     diamond="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                  <Col lg={4} md={4} sm={6}  className="mb-4">
                     <CardBuy
                     img="../assets/rsu-image/music/music-demo.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     iconheart="12"
                     diamond="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                  </Col>
                </Row>


      </>
    )
  }
  export default SetFavorites
  