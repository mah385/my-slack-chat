import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
class Register extends Component {
  state = { username: "", email: "", password: "", passwordConfirmation: "" };

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(JSON.stringify(this.state, null, 2));
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(JSON.stringify(createdUser, null, 2));
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
      });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as={"h2"} icon color={"green"} textAlign={"center"}>
            <Icon name={"chat"} color={"green"} />
            Register For DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size={"large"}>
            <Segment stacked>
              <Form.Input
                fluid
                name={"username"}
                icon={"user"}
                iconPosition={"left"}
                placeholder={"Username"}
                onChange={this.handleOnChange}
                type={"text"}
                value={username}
              />
              <Form.Input
                fluid
                name={"email"}
                icon={"mail"}
                iconPosition={"left"}
                placeholder={"Email"}
                onChange={this.handleOnChange}
                type={"email"}
                value={email}
              />
              <Form.Input
                fluid
                name={"password"}
                icon={"lock"}
                iconPosition={"left"}
                placeholder={"Password"}
                onChange={this.handleOnChange}
                type={"password"}
                value={password}
              />
              <Form.Input
                fluid
                name={"passwordConfirmation"}
                icon={"repeat"}
                iconPosition={"left"}
                placeholder={"Password Confirmation"}
                onChange={this.handleOnChange}
                type={"password"}
                value={passwordConfirmation}
              />
              <Button color={"green"} fluid size={"large"}>
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to={"/login"}>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
