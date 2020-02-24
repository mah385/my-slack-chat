import React, { Component } from "react";
import { Link } from "react-router-dom";
import md5 from "md5";
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
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false
  };

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(JSON.stringify(this.state, null, 2));
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all the fields" };
      console.log(JSON.stringify(error, null, 2));
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors => {
    return errors.map((error, index) => {
      return <p key={index}>{error.message}</p>;
    });
  };

  handleSubmit = event => {
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(JSON.stringify(createdUser, null, 2));
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravtor.com/avator/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("User Saved");
              });
              this.setState({ loading: false });
            })
            .catch(error => {
              this.setState({
                errors: this.state.errors.concat(error),
                loading: false
              });
            });
        })
        .catch(error => {
          console.log(JSON.stringify(error, null, 2));
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false
          });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => {
      return error.message.toLowerCase().includes(inputName);
    })
      ? "error"
      : "";
  };

  render() {
    // const { username, email, password, passwordConfirmation, errors } = this.state;

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
                value={this.state.username}
                className={this.handleInputError(this.state.errors, "username")}
              />

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

              <Form.Input
                fluid
                name={"passwordConfirmation"}
                icon={"repeat"}
                iconPosition={"left"}
                placeholder={"Password Confirmation"}
                onChange={this.handleOnChange}
                type={"password"}
                value={this.state.passwordConfirmation}
                className={this.handleInputError(
                  this.state.errors,
                  "passwordConfirmation"
                )}
              />
              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
                color={"green"}
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
            Already a user? <Link to={"/login"}>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
