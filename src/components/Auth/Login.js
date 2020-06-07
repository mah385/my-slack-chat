import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(JSON.stringify(this.state, null, 2));
  };

  displayErrors = (errors) => {
    return errors.map((error, index) => {
      return <p key={index}>{error.message}</p>;
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false,
          });
        });
    }
  };

  isFormValid = ({ email, password }) => {
    return email && password;
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) => {
      return error.message.toLowerCase().includes(inputName);
    })
      ? "error"
      : "";
  };

  render() {
    // const {email, password, errors } = this.state;

    return (
      <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as={"h1"} icon color={"violet"} textAlign={"center"}>
            <Icon name={"code branch"} color={"violet"} />
            Login to DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size={"large"}>
            <Segment stacked>
              <Form.Input
                fluid
                name={"email"}
                icon={"mail"}
                iconPosition={"left"}
                placeholder={"Email"}
                onChange={this.handleOnChange}
                type={"email"}
                value={this.state.email}
                className={this.handleInputError(this.state.errors, "email")}
              />

              <Form.Input
                fluid
                name={"password"}
                icon={"lock"}
                iconPosition={"left"}
                placeholder={"Password"}
                onChange={this.handleOnChange}
                type={"password"}
                value={this.state.password}
                className={this.handleInputError(this.state.errors, "password")}
              />

              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
                color={"violet"}
                fluid
                size={"large"}
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )}

          <Message>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
