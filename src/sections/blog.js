import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Modal } from "rsuite";
import { Box, Textarea, Input, Button, Label } from "theme-ui";
import Calculator from "./calculator";
import router from "next/router";
import Image from "../assets/banner-thumb.png";
import { createBlog, getBlogs } from "dataStore/actions/blogAction";
import { useDispatch, useSelector } from "react-redux";

const Blog = () => {
  const [open, setOpen] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    blog_text: "",
    keywords: "",
  });
  const blogSelector = useSelector((state) => state.blogState);
  const dispatch = useDispatch();
  console.log(blogSelector);

  const handleClose = () => setOpen(false);
  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  const handleInputChange = (event) => {
    event.persist();
    setBlog((details) => ({
      ...details,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const { title, blog_text, keywords } = blog;

    const bodyData = {
      title,
      blog_text,
      keywords,
    };
    if (bodyData.title !== "" && bodyData.blog_text !== "") {
      createBlog(dispatch, bodyData).then((response) => {
        if (response.status === 200) getBlogs(dispatch);
      });
    } else {
      dispatchCheckDetails({
        type: "ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
    }
  };

  useEffect(() => {
    getBlogs(dispatch);
  }, [dispatch]);
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ marginLeft: "20px" }}>
        <h3>BLOGS:</h3>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <Grid fluid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={8}>
                  <div className="show-col">
                    <img src={Image} alt="image" width={300} height={180} />
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="show-col">
                    <h4>Introduction </h4># React Suite is a library of React
                    components, designed for middle platform and back-end
                    products. Committed to creating intimate interactive designs
                    while providing developers with a friendly development
                    experience.
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={8}>
                  <div className="show-col">
                    <img src={Image} alt="image" width={300} height={180} />
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="show-col">
                    <h4>Introduction </h4># React Suite is a library of React
                    components, designed for middle platform and back-end
                    products. Committed to creating intimate interactive designs
                    while providing developers with a friendly development
                    experience.
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={8}>
                  <div className="show-col">
                    <img src={Image} alt="image" width={300} height={180} />
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="show-col">
                    <h4>Introduction </h4># React Suite is a library of React
                    components, designed for middle platform and back-end
                    products. Committed to creating intimate interactive designs
                    while providing developers with a friendly development
                    experience.
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={8}>
                  <div className="show-col">
                    <img src={Image} alt="image" width={300} height={180} />
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="show-col">
                    <h4>Introduction </h4># React Suite is a library of React
                    components, designed for middle platform and back-end
                    products. Committed to creating intimate interactive designs
                    while providing developers with a friendly development
                    experience.
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={8}>
                  <div className="show-col">
                    <img src={Image} alt="image" width={300} height={180} />
                  </div>
                </Col>
                <Col xs={16}>
                  <div className="show-col">
                    <h4>Introduction </h4># React Suite is a library of React
                    components, designed for middle platform and back-end
                    products. Committed to creating intimate interactive designs
                    while providing developers with a friendly development
                    experience.
                  </div>
                </Col>
              </Row>
            </Grid>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Calculator />
            <div style={{ marginTop: "40px" }}>
              <Panel shaded>
                <center>
                  <h3>GET THESE FOR FREE</h3>
                </center>
                <List>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiCheckCircle
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free Turnitin Plagiarism report
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FaListUl style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free work in progress drafts
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <BiRevision
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free revisions for all orders
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <GoMail style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free text/email updates
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiPhoneCall
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 24/7 VIP customer support
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFileText2
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 1 page summary.
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFilePdf style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free cover page
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiEdit style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free formatting for your work
                  </List.Item>
                </List>
              </Panel>
            </div>
            <div style={{ paddingTop: "50px" }}>
              <Button
                onClick={() =>
                  router.push("/dashboard/create_order", scroll(0, 0))
                }
                style={{
                  color: "white",
                  width: "100%",
                  backgroundColor: "#17c671",
                }}
              >
                Order Now
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
      <Modal size="md" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box as="form" onSubmit={handleUserLogin}>
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
            />
            <Label htmlFor="Blog_Keywords">Blog Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              value={blog.keywords}
              onChange={handleInputChange}
            />
            <Label htmlFor="Blog_content">Blog content</Label>
            <Textarea
              defaultValue="Create blog"
              name="blog_text"
              value={blog.blog_text}
              onChange={handleInputChange}
              rows={20}
            />
            <Button>Create</Button>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blog;
