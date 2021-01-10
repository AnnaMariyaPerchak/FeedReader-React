import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      title: "",
      body: "",
      id:0,
      user: "",
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
  }

  handleModalShowHide = () => {
    this.setState({ showHide: !this.state.showHide });
  }

  handleModalSave = () => {
      const { title, body } = this.state
      const user = JSON.parse(localStorage.getItem("user"))
    this.setState({ showHide: !this.state.showHide });
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: user.id,
        })
      })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem("newPost", JSON.stringify(json));
        });
  }

handleChangeTitle = (event) => {
    this.setState({title: event.target.value});
  }
  handleChangeBody = (event) => {
    this.setState({body: event.target.value});
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.handleModalShowHide()}>Add new post</button>

        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Add new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <input className="modalInput" type="text" placeholder="Enter your title" value={this.state.title} onChange={this.handleChangeTitle} />
             <input className="modalInput" type="text" placeholder="Enter your body" value={this.state.body} onChange={this.handleChangeBody} />
          </Modal.Body>
          <Modal.Footer>
            <button className="button" onClick={() => this.handleModalShowHide()}>Close</button>
            <button className="button" onClick={() => this.handleModalSave()}>Save Changes</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddPost;
