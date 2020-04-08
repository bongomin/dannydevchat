import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessagesForm";
import firebase from '../../firebase';


class Meassages extends Component {
   state = {
      messagesRef: firebase.database().ref('messages'),
      channel: "",
      user: ""
   };

   componentWillReceiveProps(newProps) {
      console.log(newProps, 'new props messages');
      console.log(this.props, 'old props messages');
      if (this.props.currentChannel !== newProps.currentChannel) {
         this.setState({ channel: newProps.currentChannel })
      }

      if (this.props.currentUser !== newProps.currentUser) {
         this.setState({ user: newProps.currentUser })
      }


   }

   componentWillMount() {
      console.log(this.props, 'componetWillMount props');
      this.setState({
         channel: this.props.currentChannel,
         user: this.props.currentUser
      })
   }

   render() {
      const { messagesRef, channel, user } = this.state;
      console.log(this.state, 'props in messages')

      return (
         <React.Fragment>
            <MessagesHeader />

            <Segment>
               <Comment.Group className="messages">{/* Messages */}</Comment.Group>
            </Segment>

            <MessageForm
               messagesRef={messagesRef}
               currentChannel={channel}
               currentUser={user}
            />
         </React.Fragment>
      );
   }
}

export default Meassages;