import React, { Component } from 'react'
import { Menu, Icon, } from 'semantic-ui-react'
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions';

class DirectMessages extends Component {

   state = {
      activeChannel: '',
      users: [],
      user: this.props.currentUser,
      usersRef: firebase.database().ref('users'),
      connectedRef: firebase.database().ref('.info/connected'),
      presenceRef: firebase.database().ref('presence')

   }

   componentDidMount() {
      if (this.state.user) {
         this.addListeners(this.state.user.uid);
      }
   }

   addListeners = currentUserUid => {
      let loadedUsers = [];
      this.state.usersRef.on('child_added', snap => {
         if (currentUserUid !== snap.key) {
            let user = snap.val();
            user['uid'] = snap.key;
            user['status'] = 'ofline';
            loadedUsers.push(user)
            this.setState({
               users: loadedUsers
            })
         }
      });
      this.state.connectedRef.on('value', snap => {
         if (snap.val() === true) {
            const ref = this.state.presenceRef.child(currentUserUid);
            ref.set(true);
            ref.onDisconnect().remove(error => {
               if (error !== null) {
                  console.error(error);
               }
            })
         }
      });
      this.state.presenceRef.on('child_added', snap => {
         if (currentUserUid !== snap.key) {
            // we add status to the user
            this.addStatusToUser(snap.key);

         }
      });

      this.state.presenceRef.on('child_removed', snap => {
         if (currentUserUid !== snap.key) {
            // we add status to the user
            this.addStatusToUser(snap.key, false);

         }
      });

   }

   addStatusToUser = (userId, connected = true) => {
      const updatedUsers = this.state.users.reduce((acc, user) => {
         if (user.uid === userId) {
            user['status'] = `${connected ? 'online' : 'offline'}`;
         }
         return acc.concat(user);
      }, []);
      this.setState({ users: updatedUsers })
   }

   // check user online status
   isUserOnline = user => user.status === 'online';

   // change channel function
   changeChannel = user => {
      const channelId = this.getChannelId(user.uid);
      const channelData = {
         id: channelId,
         name: user.name
      };
      this.props.setCurrentChannel(channelData);
      this.props.setPrivateChannel(true);
      this.setActiveChannel(user.uid);
   }

   getChannelId = userId => {
      const currentUserId = this.state.user.uid;
      return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
   }

   setActiveChannel = userId => {
      this.setState({
         activeChannel: userId
      })
   }

   render() {
      const { users, activeChannel } = this.state
      return (
         <Menu.Menu className="menu">
            <Menu.Item>
               <span>
                  <Icon name="mail" color="orange" /> DIRECT MESSAGES
               </span>{''}
               ({users.length})
            </Menu.Item>
            {/* users to send to direct messages */}
            {users.map(user => (
               <Menu.Item
                  key={user.uid}
                  active={user.uid === activeChannel}
                  onClick={() => this.changeChannel(user)}
                  style={{ opacity: 0.7, color: 'orange', fontStyle: 'italic' }}
               >
                  <Icon
                     name="circle"
                     color={this.isUserOnline(user) ? 'green' : 'red'}
                  />
                  @ {user.name}

               </Menu.Item>
            ))}
         </Menu.Menu>
      )
   }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(DirectMessages);
