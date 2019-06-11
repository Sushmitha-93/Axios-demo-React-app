import React, { Component } from "react";
import "./App.css";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndPoint);
    //console.log(posts);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "title", body: "body" };
    const { data: post } = await http.post(config.apiEndPoint, obj);
    this.setState({ posts: [post, ...this.state.posts] });
    //console.log(post);
  };

  handleUpdate = async post => {
    //const originalPosts = [...this.state.posts];
    const posts = [...this.state.posts];

    post.title = "UPDATED";

    await http.put(config.apiEndPoint + "/" + post.id, post);
    const index = posts.includes(post);
    posts[index] = { ...post };
    this.setState({ posts });
    //console.log(originalPosts);

    //console.log(data);
  };

  handleDelete = async post => {
    const originalPosts = [...this.state.posts]; //For optimistic update approach

    const posts = this.state.posts.filter(p => p.id !== post.id);
    console.log("Deltet setState posts");
    this.setState({ posts });

    try {
      await http.delete("p" + config.apiEndPoint + "/" + post.id);
      //throw new Error("");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted!");

      console.log("catch bolck of handle delete");
      console.log("Dete setState originalPosts");
      this.setState({ posts: originalPosts });
    }
    //console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
