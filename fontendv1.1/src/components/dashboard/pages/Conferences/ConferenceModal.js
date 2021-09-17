import React from 'react';
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Modal,

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import store from '../../../../redux/store'

const {Paragraph} = Placeholder


class ConferenceModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        overflow: true,
        rows: 0
      };
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.resetRows = this.resetRows.bind(this);
    }
    close() {
      this.setState({ show: false });
    }
    resetRows() {
      this.setState({ rows: 0 });
    }
    open(event) {
      this.setState({ show: true });
      setTimeout(() => {
        this.setState({
          rows: 80
        });
      }, 3000);
    }

    componentDidMount = ()=>{
        console.log(store)
    }


    render() {
      const { overflow, show } = this.state;
      return (
        <div className="modal-container">
         
  
          <Modal show={show} onHide={this.close} onExited={this.resetRows}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.rows ? (
                  <>
                      <div className="container text-center mx-auto py-md-4 py-1">
                          <p>
                              Conférence créée avec succes
                          </p>
                      </div>
                  </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close} appearance="primary">
                Ok
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
  export default ConferenceModal;