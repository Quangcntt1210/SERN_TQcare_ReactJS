import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { emitter } from '../../utils/emitter';
import { forEach } from 'lodash';
import './modalUser.scss';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',


        }
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })

    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        console.log('check copyState', copyState)
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrayInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isvalid = this.checkValidateInput();
        if (isvalid === true) {
            this.props.createNewUser(this.state)
        }
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        })
    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Create a new user
                </ModalHeader>

                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Enter email" onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-6 form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" placeholder="John" onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" placeholder="Doe" onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-12 form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" placeholder="123 Street, City..." onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Save
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => { this.toggle() }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


