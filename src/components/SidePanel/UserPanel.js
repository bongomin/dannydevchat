import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
class UserPanel extends Component {
   state = {
      user: this.props.currentUser,

   }



   // dropdown function
   dropdownoptions = () => [
      {
         key: "user",
         text: <pan>
            Signed in as<strong>{this.state.user.displayName}</strong>
         </pan>,
         disabled: true
      },
      {
         key: "avatar",
         text: <pan>Change Avatar</pan>
      },
      {
         key: "signout",
         text: <pan onClick={this.handleSignOut}>Sign out</pan>
      }
   ]


   // handling signout function
   handleSignOut = () => {
      firebase.auth().signOut().then(() => {
         console.log("SignOut")
      })
   }
   render() {
      const { user } = this.state;
      return (

         <Grid
            style={{ background: "#3359DF" }}
         >
            <Grid.Column>
               <Grid.Row style={{ padding: "1.2em", margin: 0 }} >
                  {/* App Header */}
                  <Header inverted floated="left" as="h3" >
                     <Icon name="code" />
                     <Header.Content>
                        DannyDevChat
                  </Header.Content>
                  </Header>
               </Grid.Row>
               {/* user Dropdown */}
               <Header style={{ padding: "1.2em" }} as="h4">
                  <Dropdown trigger={
                     <span>
                        <Image
                           src={user.photoURL}
                           spaced="right"
                           avatar
                        />
                        {this.state.user.displayName}
                     </span>
                  } options={
                     this.dropdownoptions()
                  } />
               </Header>
            </Grid.Column>
         </Grid>
      )
   }
}

export default UserPanel;
