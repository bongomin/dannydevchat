import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {

    const { channelName, numUniqueUsers, handleSeacrhChange, searchLoading, isPrivateChannel } = this.props;


    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {/* channel name here */}
            {channelName}
            {!isPrivateChannel && <Icon name={"star outline"} color="black" />}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSeacrhChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
