import "./style.css";

import { Redirect } from "react-router-dom";
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hasAccount: false,
      userID:0
    };
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  login = () => {
    // console.log(this.state.email)
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
      
      let getUser=true
      for(let i=0;i<data.length;i++){
        console.log(data[i].email)
      console.log(this.state.email)

        if (data[i].email === this.state.email){
          // console.log(data[i])
          // console.log(data[i].id)
          this.setState({userID : data[i].id , hasAccount: true})
          localStorage.setItem("user", JSON.stringify(data[i]));
          getUser=true
          break
        } else {
          getUser=false;
        }
      }
      if (getUser === false){
        alert('Username or password is wrong.Please try one more time.')
          this.setState({
            email: "",
            password: "",
            hasAccount: false,
            userID:0
          });
      }
    })
    .catch((error) => console.log(error))
  }

  render() {
    const isInvalid = this.state.email === "" || this.state.password === "";
    const { hasAccount,userID } = this.state;
    // console.log(userID)
    return (
      <div>
        {hasAccount ? (
          // <Redirect to={"/posts?userId=" +  userID}/>
          <Redirect to={"/"+userID+"/posts"}/>
        ) : (
        <div className="login">
          <p className="loginText">Login</p>
          <input
            type="email"
            id="email"
            className="inputEmail"
            placeholder="Enter your email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            type="password"
            id="password"
            className="inputPassword"
            placeholder="Enter your password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            type="submit"
            className="inputSubmit"
            disabled={isInvalid}
            value="Login"
            onClick={this.login}
          />
          {/* <p className="loginText">
            Don’t have an account yet? <Link to="/register">Register</Link>
          </p> */}
        </div>
        )}
      </div>
    );
  }
}

export default Login;

 // Sincere@april.biz
