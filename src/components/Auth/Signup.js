import React, { Component } from 'react';
import { Button, Grid, Form, Segment, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import md5 from 'md5'
import firebase from '../../firebase';


class Signup extends Component {
   // global state object
   state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
   }

   // function handling form validation
   isFormValid = () => {
      let errors = [];
      let error;
      if (this.isFormEmpty(this.state)) {
         // throw error
         error = { message: "Fill in all the Fields please...!!" };
         this.setState({ errors: errors.concat(error) })
         return false;
      } else if (!this.isPasswordValid(this.state)) {
         // throw an error
         error = { message: "password is Invalid" }
         this.setState({ errors: errors.concat(error) })
         return false
      } else {
         // form is valid
         return true

      }

   }

   isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
      return !username.length || !email.length || !password.length || !passwordConfirmation.length;
   }
   isPasswordValid = ({ password, passwordConfirmation }) => {
      if (password.length < 6 || passwordConfirmation < 6) {
         return false
      } else if (password !== passwordConfirmation) {
         return false
      } else {
         return true
      }

   }
   // now i want to display the errors to the users
   displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

   // function handling on change event in the inputs
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }
   // function handling form submission
   handleSubmit = (e) => {
      e.preventDefault();
      if (this.isFormValid()) {
         this.setState({ errors: [], loading: true })
         firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
               console.log(createdUser)
               createdUser.user.updateProfile({
                  displayName: this.state.username,
                  photoURL: `http://gravatar.com/avatar/${md5(createdUser.user)}?d=identicon`
               })
                  .then(() => {
                     this.saveUser(createdUser).then(() => {
                        console.log("User  Saved")
                     })
                     //   this.setState({loading:false})
                  }).catch(err => {
                     console.error(err)
                     this.setState({ errors: this.state.errors.concat(err), loading: false })
                  })

            })
            .catch(err => {
               console.log(err)
               this.setState({ errors: this.state.errors.concat(err), loading: false })
            })
      }
   };

   saveUser = createdUser => {
      return this.state.usersRef.child(createdUser.user.uid).set({
         name: createdUser.user.displayName,
         avatar: createdUser.user.photoURL
      })

   }

   handleInputError = (errors, inputName) => {
      return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : ""

   }
   render() {
      const { username, email, password, passwordConfirmation, errors, loading } = this.state;
      return (
         <Grid textAlign="center" verticleAlign="middle" style={{ height: "100vh", backGround: "#eee", padding: "5em" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as="h2" icon color="violet" textAlign="center">
                  <Icon name="street view" color="violet">

                  </Icon>
                  Register for dannyDevChat
               </Header>
               <Form size="Large" onSubmit={this.handleSubmit}>
                  <Segment>
                     <Form.Input
                        className={this.handleInputError(errors, 'username')}
                        type="text"
                        fluid
                        name="username"
                        value={username}
                        icon="user"
                        iconPosition="left"
                        placeholder="username"
                        onChange={this.handleChange}
                     />
                     <Form.Input
                        className={this.handleInputError(errors, 'email')}
                        type="email" fluid
                        name="email"
                        value={email}
                        icon="mail"
                        iconPosition="left"
                        placeholder="Email"
                        onChange={this.handleChange} />
                     <Form.Input
                        className={this.handleInputError(errors, 'password')}
                        type="password"
                        fluid
                        name="password"
                        value={password}
                        icon="lock"
                        iconPosition="left"
                        placeholder="password"
                        onChange={this.handleChange}
                     />
                     <Form.Input
                        className={this.handleInputError(errors, 'passwordConfirmation')}
                        type="password"
                        fluid name="passwordConfirmation"
                        value={passwordConfirmation}
                        icon="repeat"
                        iconPosition="left"
                        placeholder="password"
                        onChange={this.handleChange} />
                     <Button disabled={loading} className={loading ? 'loading' : ""} color="violet" fluid size="Large">submit</Button>
                  </Segment>
               </Form>
               {errors.length > 0 && (
                  <Message error>
                     <h3>Error</h3>
                     {this.displayErrors(errors)}
                  </Message>
               )}
               <Message>
                  Already a user? <Link to="/login">Login</Link>
               </Message>
            </Grid.Column >
         </Grid>
      )
   }
}

export default Signup;
