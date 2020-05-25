import React, { Component } from 'react';
import { Segment, Accordion, Header, Icon } from 'semantic-ui-react';


class MetaPanel extends Component {
   state = {
      privateChannel: this.props.isPrivateChannel,
      activeIndex: 0
   }
   setActiveIndex = (event, titleProps) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;
      this.setState({ activeIndex: newIndex });

   }
   render() {
      const { activeIndex, privateChannel } = this.state;
      if (privateChannel) return null;
      return (
         <Segment>
            <Header as="h3" attached="top" color="orange" style={{ background: "#3359DF" }}>
               About # Channel
            </Header>
            <Accordion styled attached="true" style={{ color: "olive" }}>
               <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown" />
                  <Icon name="info" color="orange" />
                   Channel Details
               </Accordion.Title>
               <Accordion.Content
                  active={activeIndex === 0}>
                  details
               </Accordion.Content>

               <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown" />
                  <Icon name="user cirlce" color="orange" />
                   Top Posters
               </Accordion.Title>
               <Accordion.Content
                  active={activeIndex === 1}>
                  posters
               </Accordion.Content>

               <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={this.setActiveIndex}
               >
                  <Icon name="dropdown" />
                  <Icon name="pencil alternate" color="orange" />
                   Created By
               </Accordion.Title>
               <Accordion.Content
                  active={activeIndex === 2}>
                  creator
               </Accordion.Content>

            </Accordion>
         </Segment>
      )
   }
}

export default MetaPanel;