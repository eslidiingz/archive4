import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Setvertify() {
  return (
    <>
      <Row className=" px-3">
        <Col md={12}>
          <h2 className="text-white mt-3">Vertify Account</h2>
          <p className="text-white">
            Please Vertify your account to become the Creator.
          </p>
          <div className="box-create text-white text-start mb-4">
            <p>Music</p>
            <Form.Group
              controlId="formFile"
              className="mb-3 custom-file-upload "
            >
              <Form.Label>
                <p>Choose file </p>
                <i className="fas fa-plus"></i>
              </Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <p className="ci-purple">*Max file sizeis 20mb</p>

            <Form>
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  className="input-search-set height-54"
                  placeholder="firstname"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  className="input-search-set height-54"
                  placeholder="lastname"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="about">
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" rows={3} className="input-search-set" />
              </Form.Group>
                <div className="d-flex align-items-center mb-2">
                    <h5 className="me-auto mb-0">Portfolios</h5>
                    <div className="ms-auto">
                        <button className="btn btn03 btn-hover color-1 w-120">Add</button>
                    </div>
                </div>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="portfolios">
                    https://
                    </InputGroup.Text>
                    <FormControl className="input-search-set" id="basic-url" aria-describedby="portfolios" />
                    <Button variant="danger" id="button-addon2" className="w-120">
                        Delete
                    </Button>
                </InputGroup>

              <button className="btn btn03 btn-hover color-1 w-100">
                Submit
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default Setvertify;
