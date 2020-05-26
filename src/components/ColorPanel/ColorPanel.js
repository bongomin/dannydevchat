import React from "react";
import { Sidebar, Menu, Divider, Button, Modal, Icon, Label } from "semantic-ui-react";
import { SliderPicker } from 'react-color';

class ColorPanel extends React.Component {
  state = {
    modal: false
  }

  openModal = () => this.setState({ modal: true });
  closeModel = () => this.setState({ modal: false });


  render() {
    const { modal } = this.state;

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
        <Button icon="angle double down" size="small" color="orange" onClick={this.openModal} />
        {/*colorPicker modal that opens and closes on councel*/}
        <Modal basic open={modal} onClose={this.closeModel}>
          <Modal.Header>Choose App Color</Modal.Header>
          <Modal.Content>
            <Label content="primary-color" />
            <SliderPicker />
            <Label content="secondary-color" />
            <SliderPicker />
          </Modal.Content>
          <Modal.Actions>
            <Button inverted color="green">
              <Icon name="checkmark" />Save Colors
          </Button>
            <Button inverted color="red" onClick={this.closeModel}>
              <Icon name="remove" />Cancel
          </Button>

          </Modal.Actions>

        </Modal>
      </Sidebar>
    );
  }
}

export default ColorPanel;
