import React, { Component } from 'react';
import { Header, Input, Segment, Icon } from "semantic-ui-react"

class MessagesHeader extends Component {
   render() {
      return (
         <Segment clearing>
            {/* channel title */}
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
               <span>
                  channel
               <Icon name={"star outline"} color="black" />
               </span>
               <Header.Subheader>2 users</Header.Subheader>
            </Header>
            {/* channel search input */}
            <Header floated="right">
               <Input
                  size="mini"
                  name="SearchTerm"
                  placeholder="search Messages"
               />
            </Header>
         </Segment>
      )
   }
}
export default MessagesHeader
