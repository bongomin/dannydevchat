import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button, Icon } from "semantic-ui-react"


class ColorPanel extends Component {
   render() {
      return (
         <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            vertical
            visible
            width="very thin"
         >
            <Divider />
            <Button icon="left arrow icon" size="small" color="yellow" />
         </Sidebar>
      );
   }
}

export default ColorPanel;