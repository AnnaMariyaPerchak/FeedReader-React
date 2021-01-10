import "./style.css";

import { Redirect } from "react-router-dom";
import React from "react";

import AddPost from "./AddPost";
import GetAllPosts from "./GetAllPosts";
import GetUserPosts from "./GetUserPosts";
 
import { Tab, Nav, Row, Col } from "react-bootstrap";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: false,
      posts: [],
    };
  }

  logOut = () => {
    this.setState({ exit: true });
    localStorage.removeItem("user");
    localStorage.removeItem("newPost");
  };

  render() {
    const { exit, posts } = this.state;
    return (
      <div>
        {exit ? (
          <Redirect to="/" />
        ) : (
          <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={2}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link>
                        <button
                          type="submit"
                          onClick={this.logOut}
                          className="button"
                        >
                          Log out
                        </button>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="getUserPosts">Get user posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="getAllPosts">Get all posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>
                        <AddPost posts={posts} />
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="getUserPosts">
                      <GetUserPosts />
                    </Tab.Pane>
                    <Tab.Pane eventKey="getAllPosts">
                      <GetAllPosts />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
