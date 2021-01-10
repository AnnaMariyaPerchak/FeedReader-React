import React from "react";
import "./style.css";
import Table from "react-bootstrap/Table";

class GetAllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        posts:[]
    };

    this.getAllPosts = this.getAllPosts.bind(this);
  }

  getAllPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((data) => {
        if (localStorage.getItem("newPost")) {
          const newPost = JSON.parse(localStorage.getItem("newPost"));
          data.push(newPost);
        }
        this.setState({ posts: data });
      });
  }

  renderTableData = () => {
    return this.state.posts.map((post, index) => {
      const { id, title, body } = post;
      return (
        <div>
          <tr key={id}>
            <td style={{ width: "6%" }}>{id}</td>
            <td style={{ width: "30%" }}>{title}</td>
            <td style={{ width: "65%" }}>{body}</td>
          </tr>
        </div>
      );
    });
  }
  
  render() {
    return (
      <div>
          <button
              type="submit"
              onClick={this.getAllPosts}
              className="button"
            >
              Get all posts
            </button>

            <Table striped bordered hover>
              <tbody>{this.renderTableData()}</tbody>
            </Table>
      </div>
    );
  }
}

export default GetAllPosts;
