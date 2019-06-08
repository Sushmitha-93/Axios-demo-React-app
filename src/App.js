import React, { Component } from "react";
import "./App.css";
import Axios from "axios";

class App extends Component {
  state = {
    posts: [],
    appEndPoint: "https://jsonplaceholder.typicode.com/posts"
  };

  async componentDidMount() {
    const { data: posts } = await Axios.get(this.state.appEndPoint);
    //console.log(posts);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "title", body: "body" };
    const { data: post } = await Axios.post(this.state.appEndPoint, obj);
    this.setState({ posts: [post, ...this.state.posts] });
    //console.log(post);
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await Axios.put(this.state.appEndPoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
    //console.log(data);
  };

  handleDelete = async post => {
    await Axios.delete(this.state.appEndPoint + "/" + post.id);

    const posts = this.state.posts.filter(p => p.id != post.id);
    this.setState({ posts });

    //console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
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
