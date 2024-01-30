import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Mainlayout from "/components/layouts/Mainlayout";
import { Form, InputGroup } from "react-bootstrap";
import { Row, Container, Col } from "react-bootstrap";
import CardNFT from "/components/card/CardNFT";
import { useWalletContext } from "/context/wallet";

import { render } from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import Config from "/configs/config";
import Swal from "sweetalert2";
import { createMetadata, mintAsset, myCollection } from "/models/Asset";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";

// const suggestions = COUNTRIES.map((country) => {
//   return {
//     id: country,
//     text: country,
//   };
// });

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const imageMaxSize = 4; // MB
const sourceMaxSize = 20; // MB

const Create = () => {
  const { wallet, walletAction } = useWalletContext();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    image: "",
    imagePreview: "",
    name: "",
    description: "",
    sourceFile: "",
    externalLink: "",
    tags: [],
    collectionOption: "newCollection",
    collectionName: "",
  });

  const [fileChoosed, setFileChoosed] = useState({
    image: "",
    sourceFile: "",
  });

  const [errors, setErrors] = useState({
    image: "",
    name: "",
    description: "",
    sourceFile: "",
    collectionName: "",
  });

  const [collectionExisting, setCollectionExisting] = useState([]);

  const handleDelete = (i) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: form.tags.filter((tag, index) => index !== i),
    }));
  };

  const handleAddition = (tag) => {
    setForm((prevForm) => ({ ...prevForm, tags: [...form.tags, tag] }));
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];

    let keyName = e.target.name;

    if (file) {
      let fileSize = file.size / 1024 / 1024; // Convert to MB
      fileSize = Math.round(fileSize * 100) / 100; // Convert to 2 decimal

      if (
        keyName === "image" &&
        parseFloat(fileSize) > parseFloat(imageMaxSize)
      ) {
        setErrors((prevErr) => ({
          ...prevErr,
          [keyName]: `Image file size is more than ${imageMaxSize} MB`,
        }));
      }

      if (
        keyName === "sourceFile" &&
        parseFloat(fileSize) > parseFloat(sourceMaxSize)
      ) {
        setErrors((prevErr) => ({
          ...prevErr,
          [keyName]: `Source file size is more than ${sourceMaxSize} MB`,
        }));
      }

      setFileChoosed((prevChoose) => ({
        ...prevChoose,
        [keyName]: file.name,
      }));

      let url = URL.createObjectURL(file);

      setForm((prevForm) => ({
        ...prevForm,
        [keyName]: file,
        ...(keyName === "image" && { imagePreview: url }),
      }));
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.type) {
      case "file":
        handleFileChange(e);
        break;

      default:
        setForm((prevForm) => ({
          ...prevForm,
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  const handleCollectionOptionChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      collectionOption: e.target.value,
      collectionName: "",
    }));
  };

  const getMyCollectionList = async () => {
    let collectionList = await myCollection(wallet);

    setCollectionExisting(collectionList.data);
  };

  const uploadFileToServer = async (_fileContent) => {
    let fd = new FormData();

    fd.append("file", _fileContent);

    let res = await fetch(Config.FILE_SERVER_URI, {
      method: "POST",
      body: fd,
    });

    return await res.json();
  };

  const validated = () => {
    let status = true;

    Object.entries(errors).map((err) => {
      let key = err[0];
      let val = err[1];

      let msg;

      if (form[key].length < 1) {
        msg = "This field is required.";
        status = false;
      } else {
        msg = "";
      }

      setErrors((prevErr) => ({
        ...prevErr,
        [key]: msg,
      }));
    });

    return status;
  };

  const handleCreateNft = async (e) => {
    e.preventDefault();

    if (!validated()) {
      Swal.fire("Error", "Please check data field is required.", "error");
      return;
    }

    try {
      /** Upload file to file server */
      let image = await uploadFileToServer(form.image);
      let source = await uploadFileToServer(form.sourceFile);

      // let image = { filename: "image.jpg" }; // Mock data
      // let source = { filename: "source.jpg" }; // Mock data

      /** Make a new metadata before store */
      let metadata = form;

      delete metadata.imagePreview;

      metadata.image = `${Config.GET_FILE_URI}/${image.filename}`;
      metadata.sourceFile = `${Config.GET_FILE_URI}/${source.filename}`;

      /** Store metadata to dabase */
      const { status, data } = await createMetadata(metadata);

      if (status) {
        metadata = data;

        /** Mint NFT */
        const minted = await mintAsset(metadata);

        if (minted?.token_id) {
          router.push("/Profile");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.toString(), "error");
      console.log(
        `%c========== ERROR handleCreateNft ==========`,
        "color: red",
        error
      );
    }
  };

  const initialize = async () => {};

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (wallet) getMyCollectionList();
  }, [wallet]);

  return (
    <>
      <section className="section-gradient">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <h1 className="ci-white">Upload</h1>
            </div>
            <div className="col-6 text-end">
              <p className="text-navgation text-white">
                <Link href="/">
                  <a className="text-white text-navation_mr">Home</a>
                </Link>{" "}
                {"<"}
                <Link href="/Explore-collection/item">
                  <a className="text-white text-navation_mr">Collections</a>
                </Link>{" "}
                {"<"}
                <Link href="/Explore-collection">
                  <a className="text-white text-navation_mr">Explore</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue">
        <div>
          <Container>
            <Row className="py-4">
              <Col lg={12}>
                <h4 className=" text-white">Upload file</h4>
              </Col>
              <Col lg={8}>
                <div className="box-create text-white text-start mb-4">
                  <Form onSubmit={(e) => handleCreateNft(e)}>
                    <div>
                      Image <span className="text-danger">*</span>
                      {errors.image && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-inline"
                        >
                          {errors.image}
                        </Form.Control.Feedback>
                      )}
                    </div>
                    <Form.Group
                      controlId="formFile"
                      className="custom-file-upload "
                    >
                      <Form.Label>
                        <p>Choose image file </p>
                        <i className="fas fa-plus"></i>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>
                    {fileChoosed.image && (
                      <small>
                        File selected:{" "}
                        <span className="text-secondary font-light">
                          /{fileChoosed.image}
                        </span>
                      </small>
                    )}
                    <p className="ci-purple">
                      *Max file size {imageMaxSize} MB
                    </p>

                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                        {errors.name && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-inline"
                          >
                            {errors.name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="input-search-set height-54"
                        placeholder="Name"
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>

                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label>
                        Description <span className="text-danger">*</span>
                        {errors.description && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-inline"
                          >
                            {errors.description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Label>
                      <Form.Control
                        className="input-search-set"
                        as="textarea"
                        rows={4}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>

                    <div>
                      Source file Audio <span className="text-danger">*</span>
                      {errors.sourceFile && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-inline"
                        >
                          {errors.sourceFile}
                        </Form.Control.Feedback>
                      )}
                      <Form.Group
                        controlId="sourceFile"
                        className="custom-file-upload"
                      >
                        <Form.Label>
                          <p>Choose audio file </p>
                          <i className="fas fa-plus"></i>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="sourceFile"
                          accept=".mp3"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Form.Group>
                      {fileChoosed.sourceFile && (
                        <small>
                          File selected:{" "}
                          <span className="text-secondary font-light">
                            /{fileChoosed.sourceFile}
                          </span>
                        </small>
                      )}
                      <p className="ci-purple">
                        *Max file size {sourceMaxSize} MB
                      </p>
                      <Form.Group className="mb-3" controlId="externalLink">
                        <Form.Label>External link (URL)</Form.Label>
                        <Form.Control
                          type="url"
                          className="input-search-set height-54"
                          placeholder="https://google.com"
                          name="externalLink"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="tags">
                      <Form.Label>
                        Tags{" "}
                        <small className="text-secondary">
                          (Press enter after typed word)
                        </small>
                      </Form.Label>
                      <div>
                        <ReactTags
                          classNames={{
                            tagInputField: "w-full input-search-set height-54",
                          }}
                          tags={form.tags}
                          delimiters={delimiters}
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          // handleDrag={handleDrag}
                          // handleTagClick={handleTagClick}
                          inputFieldPosition="top"
                          autocomplete
                        />
                      </div>
                    </Form.Group>

                    <div className="mb-3">
                      <div className="mb-2">
                        Collection Name <span className="text-danger">*</span>
                        {errors.collectionName && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-inline"
                          >
                            {errors.collectionName}
                          </Form.Control.Feedback>
                        )}
                      </div>
                      {collectionExisting.length > 0 && (
                        <>
                          <Form.Check
                            inline
                            label="Add new"
                            name="collectionOption"
                            value="newCollection"
                            type="radio"
                            id={`inline-radio-1`}
                            checked={form.collectionOption == "newCollection"}
                            onChange={(e) => handleCollectionOptionChange(e)}
                          />

                          <Form.Check
                            inline
                            label="Collection Existing"
                            name="collectionOption"
                            value="collectionExisting"
                            type="radio"
                            id={`inline-radio-2`}
                            checked={
                              form.collectionOption == "collectionExisting"
                            }
                            onChange={(e) => handleCollectionOptionChange(e)}
                          />
                        </>
                      )}
                    </div>

                    {form.collectionOption === "collectionExisting" ? (
                      <Form.Group className="mb-3" controlId="collectionSelect">
                        <Form.Select
                          aria-label="collectionSelect"
                          className="input-search-set height-54"
                          onChange={(e) => {
                            setForm((prevForm) => ({
                              ...prevForm,
                              collectionName: e.target.value,
                            }));
                          }}
                        >
                          <option>- Select collection name -</option>
                          {collectionExisting.map((item) => {
                            return (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3" controlId="collectionName">
                        <Form.Control
                          type="text"
                          className="input-search-set height-54"
                          name="collectionName"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Form.Group>
                    )}
                    <button className="btn btn03 btn-hover color-1 w-100">
                      Submit
                    </button>
                  </Form>
                </div>
              </Col>
              <Col lg={4}>
                {/* Preview NFT card */}
                <CardNFT
                  img={form.imagePreview}
                  name={form.name}
                  description={form.description}
                  collectionName={form.collectionName}
                  tags={form.tags}
                />
                {/* End Preview NFT card */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Create;
Create.layout = Mainlayout;
