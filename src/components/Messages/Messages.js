import React, { Component, Fragment } from 'react';
import { Segment, Comment, Message } from 'semantic-ui-react';
import MessageHeader from './MessagesHeader';
import MessageForm from './MessagesForm'


class Meassages extends Component {
   render() {
      return (
         <React.Fragment>
            <MessageHeader />
            <Segment>

               <Comment.Group className="messages">
                  {/* Messages will go here */}
               </Comment.Group>
            </Segment>

            <MessageForm />
         </React.Fragment>
      )
   }
}

export default Meassages;