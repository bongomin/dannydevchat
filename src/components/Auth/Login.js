import React, { Component } from 'react';
import { Button, Grid, Form, Segment, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
class Login extends Component {
   // global state object
   state = {
      email: "",
      password: "",
      errors: [],
      loading: false
   }

   // function handling on change event in the inputs
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }
   handleSubmit = (e) => {
      e.preventDefault();
      if(this.isFormValid(this.state)){
         this.setState({errors:[],loading:true})
         
         .auth()
         .signinWithEmailAndPassword(this.state.email,this.state.password)
         .then(signedInUser =>{
            console.log(signedInUser)
         })
         .catch(error => {
            console.error(error)
            this.setState({ 
               error : this.state.errors.concat(error),
               loadind:false
            });
         });
      }

   };
     // function handling form validation
     isFormValid = ({email,password}) => email && password;
   // now i want to display the errors to the users
   displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

   

   handleInputError = (errors,inputName)=>{
     return errors.some(error=>error.message.toLowerCase().includes(inputName))? "error": ""

   }
   render() {
      const { email, password,errors, loading } = this.state;
      return (
         <Grid textAlign="center" verticleAlign="middle" style={{ height: "100vh", backGround: "#eee", padding: "5em" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as="h2" icon color="violet" textAlign="center">
                  <Icon name="code branch" color="violet">
                  </Icon>
                  Login to dannyDevChat
               </Header>
               <Form size="Large" onSubmit={this.handleSubmit}>
                  <Segment>
                     <Form.Input 
                      className={this.handleInputError(errors,'email')}
                      type="email" fluid 
                      name="email" 
                      value={email}
                      icon="mail"
                      iconPosition="left" 
                      placeholder="Email" 
                      onChange={this.handleChange} />
                     <Form.Input 
                     className={this.handleInputError(errors,'password')}
                     type="password" 
                     fluid 
                     name="password"
                      value={password} 
                      icon="lock" 
                      iconPosition="left" 
                      placeholder="password" 
                      onChange={this.handleChange} 
                      />
                     <Button disabled={loading} className={loading ? 'loading' : ""} color="violet" fluid size="Large">Login</Button>
                  </Segment>
               </Form>
               {errors.length > 0 && (
                  <Message error>
                     <h3>Error</h3>
                     {this.displayErrors(errors)}
                  </Message>
               )}
               <Message>
                  Do not have an Account? <Link to="/register">register</Link>
               </Message>
            </Grid.Column >
         </Grid>
      )
   }
}

export default Login;
