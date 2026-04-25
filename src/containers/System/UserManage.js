import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { changeLanguageApp } from '../../store/actions';

import { LANGUAGE } from '../../utils/constant';
class UserManage extends Component {





    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
        // console.log('check response', response)

    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errorCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errorCode === 0) {
                await this.getAllUsersFromReact();
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.errorCode === 0) {
                // await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })
                this.getAllUsersFromReact();
            } else {

            }
        } catch (error) {

        }

    }
    render() {

        let arrUsers = this.state.arrUsers;
        let language = this.props.lang;
        return (

            // <div className="users-container">
            //     <ModalUser
            //         isOpen={this.state.isOpenModalUser}
            //         toggleFromParent={this.toggleUserModal}
            //         createNewUser={this.createNewUser}
            //     />
            //     {this.state.isOpenModalEditUser &&
            //         <ModalEditUser
            //             isOpen={this.state.isOpenModalEditUser}
            //             toggleFromParent={this.toggleUserEditModal}
            //             currentUser={this.state.userEdit}
            //             editUser={this.doEditUser}
            //         // userId = {this.state.userEdit.id}
            //         />
            //     }
            //     <div className="title text-center">
            //         Manage users
            //     </div>
            //     <div className='mx-1'>
            //         <button className='btn btn-neumorphic'
            //             onClick={() => this.handleAddNewUser()}>
            //             <i className="fas fa-plus-circle"></i>
            //             <span>Add User</span>
            //         </button>
            //     </div>
            //     <div className='user-table mt-4 mx-1'>
            //         <table>
            //             <tbody>
            //                 <tr >
            //                     <th> Email
            //                         {/* <FormattedMessage id="table.email" /> */}
            //                     </th>
            //                     <th>First Name</th>
            //                     <th>Last Name</th>
            //                     <th>Address</th>
            //                     <th>Action</th>
            //                 </tr>

            //                 {
            //                     arrUsers && arrUsers.map((item, index) => {
            //                         return (
            //                             <tr key={item.id}>

            //                                 <td>{item.email}</td>
            //                                 <td>{item.firstName}</td>
            //                                 <td>{item.lastName}</td>
            //                                 <td>{item.address}</td>
            //                                 <td>
            //                                     <button className='btn-edit' onClick={() => this.handleEditUser(item)} >
            //                                         <i className="fas fa-pencil-alt"></i>
            //                                     </button>
            //                                     <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
            //                                         <i className="fas fa-trash-alt"></i>
            //                                     </button>
            //                                 </td>

            //                             </tr>
            //                         )
            //                     })
            //                 }


            //             </tbody>
            //         </table>
            //     </div>
            // </div>
            <div className="users-container p-3"> {/* Thêm padding cho tổng thể container */}
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className="title">Manage Users</div>

                <div className="mb-4">
                    <button className='btn-neumorphic' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>

                    </button>
                </div>

                <div className='user-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className="text-center">
                                        <button className='btn-edit' title="Edit" onClick={() => this.handleEditUser(item)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className='btn-delete' title="Delete" onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
