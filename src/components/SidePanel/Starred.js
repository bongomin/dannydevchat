import React, { Component } from 'react'
import {
   Menu,
   Icon,
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions';

class Starred extends Component {
   state = {
      starredChannels: [],
      activeChannel: ''

   }

   // setActive Channels function
   setActiveChannel = channel => {
      this.setState({ activeChannel: channel.id });
   };


   // change channels function
   changeChannel = channel => {
      this.setActiveChannel(channel);
      this.props.setCurrentChannel(channel);
      this.props.setPrivateChannel(false);
   };

   // display starredChannels function
   displayChannels = starredChannels =>
      starredChannels.length > 0 &&
      starredChannels.map(channel => (
         <Menu.Item
            key={channel.id}
            onClick={() => this.changeChannel(channel)}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={channel.id === this.state.activeChannel}
         >

            # {channel.name}
         </Menu.Item>
      ));

   render() {
      const { starredChannels } = this.state;
      return (
         <Menu.Menu className="menu">
            <Menu.Item>
               <span>
                  <Icon name="star" color="orange" /> STARRED
      </span>{" "}
      ({starredChannels.length}) <Icon name="add" onClick={this.openModal} />
            </Menu.Item>
            {this.displayChannels(starredChannels)}
         </Menu.Menu>

      )
   }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
