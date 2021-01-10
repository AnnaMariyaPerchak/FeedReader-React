import React from "react";
import "./style.css";
import Table from "react-bootstrap/Table";

class GetUserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        posts:[]
    };

    this.getUserPosts = this.getUserPosts.bind(this);
  }

  getUserPosts = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
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
            <td style={{ width: "25%" }}>{title}</td>
            <td style={{ width: "55%" }}>{body}</td>
            <td style={{ width: "10%" }}>
              <button type="submit" className="button" onClick={() => this.deletePost(id)}>
                Delete post
              </button>
            </td>
          </tr>
        </div>
      );
    });
  }

  deletePost = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {method: "DELETE",})
      .then((res) => {
        const del = this.state.posts.filter((post) => postId !== post.id);
        this.setState({ posts: del });
      });
  };
  
  render() {
    return (
      <div>
          <button
              type="submit"
              onClick={this.getUserPosts}
              className="button"
            >
                Get user posts
            </button>

            <Table striped bordered hover>
              <tbody>{this.renderTableData()}</tbody>
            </Table>
      </div>
    );
  }
}

export default GetUserPosts;
