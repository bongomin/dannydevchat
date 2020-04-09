import React, { Component } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase'
import FileModal from './FileModal'

class MessagesForm extends Component {
   state = {
      message: "",
      channel: "",
      user: "",
      loading: false,
      errors: [],
      modal: false
   };
   openModal = () => this.setState({ modal: true });
   closeModal = () => this.setState({ modal: false });

   componentWillReceiveProps(newProps) {
      console.log(newProps);
      console.log(this.props);
      if (this.props.currentChannel !== newProps.currentChannel) {
         this.setState({ channel: newProps.currentChannel })
      }


      if (this.props.currentUser !== newProps.currentUser) {
         this.setState({ user: newProps.currentUser })
      }

   }

   componentWillMount() {
      this.setState({
         channel: this.props.currentChannel,
         user: this.props.currentUser
      })
   }

   // handle change function
   handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   };

   // create message function
   createMessage = () => {
      const message = {
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         user: {
            id: this.state.user.uid,
            name: this.state.user.displayName,
            avatar: this.state.user.photoURL
         },
         content: this.state.message
      };
      return message;
   };
   // send message function
   sendMessage = () => {
      console.log(this.props, "props displayed now");
      const { messagesRef } = this.props;
      const { message, channel } = this.state;

      if (message) {
         this.setState({ loading: true });
         messagesRef
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(() => {
               this.setState({ loading: false, message: "", errors: [] });
            })
            .catch(err => {
               console.error(err);
               this.setState({
                  loading: false,
                  errors: this.state.errors.concat(err)
               });
            });
      } else {
         this.setState({
            errors: this.state.errors.concat({ message: "Add a message" })
         });
      }
   };

   uploadFile = (file, metadata) => {
      console.log(file, metadata);
   }

   render() {
      const { errors, modal, message, loading } = this.state;
      console.log(this.props, "this are the props here")

      return (
         <Segment className="message__form">
            <Input
               fluid
               name="message"
               onChange={this.handleChange}
               value={message}
               style={{ marginBottom: "0.7em" }}
               label={<Button icon={"add"} />}
               labelPosition="left"
               className={
                  errors.some(error => error.message.includes("message"))
                     ? "error"
                     : ""
               }
               placeholder="Write your message"
            />
            <Button.Group icon widths="2">
               <Button
                  onClick={this.sendMessage}
                  disabled={loading}
                  color="orange"
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
               />
               <Button
                  onClick={this.openModal}
                  color="teal"
                  content="Upload Media"
                  labelPosition="right"
                  icon="cloud upload"
               />
               <FileModal
                  uploadFile={this.uploadFile}
                  modal={modal}
                  closeModal={this.closeModal}
               />
            </Button.Group>
         </Segment>
      );
   }
}

export default MessagesForm
