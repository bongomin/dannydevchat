import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    privateMessagesRef: firebase.database().ref('privateMessages'),
    privateChannel: this.props.isPrivateChannel,
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    isChannelStarred: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: [],
    usersRef: firebase.database().ref('users')
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
      this.addUserStarsListener(channel.id, user.uid);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
  };

  addUserStarsListener = (channelId, userId) => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .once('value')
      .then(data => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          this.setState({isChannelStarred:prevStarred});
          
        }
      })
  }

  handleStar = () => {
    this.setState(prevState => ({
      isChannelStarred: !prevState.isChannelStarred
    }), () => this.starChannel());
  }

  starChannel = () => {
    if (this.state.isChannelStarred) {
      // for every channel that is starred
      this.state.usersRef.child(`${this.state.user.uid}/starred`).update({
        [this.state.channel.id]: {
          name: this.state.channel.name,
          details: this.state.channel.details,
          createdBy: {
            name: this.state.channel.createdBy.name,
            avatar: this.state.channel.createdBy.avatar
          }
        }
      });
    } else {
      // for every channel that is unstarred
      this.state.usersRef
        .child(`${this.state.user.uid}/starred`)
        .child(this.state.channel.id)
        .remove(error => {
          if (error !== null) {
            console.error(error);
          }
        });

    }
  }

  getMessagesRef = () => {
    const { messagesRef, privateChannel, privateMessagesRef } = this.state;
    return privateChannel ? privateMessagesRef : messagesRef;
  }
  // handle search Change  function
  handleSeacrhChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    }, () => this.handleSeacrhMessages());
  }


  // handle search messages function
  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;

    }, []);
    // check number of users
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;

    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    this.setState({ numUniqueUsers })
  }

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  displayChannelName = channel => {
    return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` :
      '';
  }

  render() {
    const { numUniqueUsers, isChannelStarred, searchTerm, searchResults, messagesRef, messages, privateChannel, channel, user, searchLoading } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          handleSeacrhChange={this.handleSeacrhChange}
          searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
        />

        <Segment>
          <Comment.Group className="messages">
            {searchTerm ? this.displayMessages(searchResults) :
              this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
