import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions'



class Channels extends Component {
   state = {
      user: this.props.currentUser,
      channels: [],
      channelName: "",
      channelDetails: "",
      channelsRef: firebase.database().ref('channels'),
      modal: false
   }

   closeModal = () => {
      this.setState({
         modal: false
      })
   }

   openModal = () => {
      this.setState({
         modal: true
      })

   }
   // handleChange function
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   changeChannel = channel => {
      this.props.setCurrentChannel(channel)
   }

   displayChannels = channels => (

      channels.length > 0 && channels.map(channel => (
         <Menu.Item
            key={channel.id}
            onClick={() => this.changeChannel(channel)}
            name={channel.name}
            style={{ opersity: 0.7 }}
         >
            #{channel.name}
         </Menu.Item >
      ))
   )


   // handle submit function
   handleSubmit = (event) => {
      event.preventDefault()
      if (this.isFormValid(this.state)) {
         this.addChannel();
      }
   }
   // form validation
   isFormValid = ({ channelDetails, channelName }) => channelDetails && channelName;


   componentDidMount() {
      this.addListeners();
   }

   addListeners = () => {
      let loadedChannels = [];
      this.state.channelsRef.on('child_added', snap => {
         loadedChannels.push(snap.val());
         this.setState({ channels: loadedChannels });
      })

   }

   addChannel = () => {
      const { channelsRef, channelName, channelDetails, user } = this.state;
      // creating a unique key for every channel
      const key = channelsRef.push().key;

      const newChannel = {
         id: key,
         name: channelName,
         details: channelDetails,
         createdBy: {
            name: user.displayName,
            avatar: user.photoURL
         }
      };

      channelsRef
         .child(key)
         .update(newChannel)
         .then(() => {
            this.setState({ channelName: '', channelDetails: '' });
            this.closeModal();
            console.log("channel added to dannyDevChat")
         })
         .catch(err => {
            console.error(err)
         })

   }


   render() {
      const { channels, modal } = this.state
      return (
         <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
               <Menu.Item>
                  <span>
                     <Icon name="exchange" />CHANNELS
               </span>{""}
               ({channels.length}) <Icon name="add" onClick={this.openModal} />
               </Menu.Item>
               {/* channels created */}
               {this.displayChannels(channels)}
            </Menu.Menu>
            {/* // Add channel Modal */}
            <Modal basic open={modal} onClose={this.closeModal} >
               <Modal.Header>Add a Channel</Modal.Header>
               <Modal.Content>
                  <Form onSubmit={this.handleSubmit}>
                     <Form.Field>
                        <Input
                           fluid
                           label="Name of Channel"
                           name="channelName"
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                     <Form.Field>
                        <Input
                           fluid
                           label="About the channel"
                           name="channelDetails"
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                  </Form>
               </Modal.Content>
               <Modal.Actions>
                  <Button color="green" inverted onClick={this.handleSubmit}>
                     <Icon name="checkmark" />Add
               </Button>
                  <Button color="red" inverted onClick={this.closeModal}>
                     <Icon name="remove" />Cancel
               </Button>
               </Modal.Actions>

            </Modal >
         </React.Fragment>




      );
   }
}

export default connect(null,
   { setCurrentChannel }
)(Channels)
