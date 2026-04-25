import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { emitter } from '../../utils/emitter';
import { forEach } from 'lodash';
import { editUserService } from '../../services/userService';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }

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
        let arrayInput = ['password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrayInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleUpdateUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
            // await editUserService(this.state);
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.currentUser !== this.props.currentUser) {

    //         this.setState({
    //             id: this.props.currentUser.id,
    //             email: this.props.currentUser.email,

    //         })
    //     }
    // }

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
                    Edit User
                </ModalHeader>

                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Enter email"
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}
                                    disabled
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
                        onClick={() => { this.handleUpdateUser() }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


