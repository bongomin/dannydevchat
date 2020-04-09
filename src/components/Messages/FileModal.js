import React, { Component } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';

class FileModal extends Component {
   state = {
      file: null,
      authorized: ['image/jpeg', 'image/png', 'image/jpg', 'image/pdf']
   }

   uploadFile = (event) => {
      const file = event.target.files[0];
      if (file) {
         this.setState({ file })
      }
   }

   sendFile = () => {
      const { file } = this.state
      const { uploadFile, closeModal } = this.props
      if (file !== null) {
         if (this.isAuthorized(file.name)) {
            // sendFile the media file
            const metadata = { contentType: mime.lookup(file.name) };
            uploadFile(file, metadata);
            closeModal();
            this.clearFile();

         }
      }
   }

   isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename))

   clearFile = () => {
      this.setState({ file: null })
   }

   render() {
      const { modal, closeModal } = this.props
      return (
         <Modal basic open={modal} onClose={closeModal} >
            <Modal.Header>select the media file</Modal.Header>
            <Modal.Content>
               <Input
                  onChange={this.uploadFile}
                  fluid
                  name="file"
                  type="file"
                  label="File types : jpg,png,jpeg,pdf"
               />
            </Modal.Content>
            <Modal.Actions>
               <Button
                  onClick={this.sendFile}
                  color="green"
                  inverted>
                  <Icon name="checkmark" /> sendFile
               </Button>

               <Button
                  color="remove"
                  inverted
                  onClick={closeModal}
               >
                  <Icon name="checkmark" /> Cancel
               </Button>
            </Modal.Actions>

         </Modal>
      )
   }
}

export default FileModal;
