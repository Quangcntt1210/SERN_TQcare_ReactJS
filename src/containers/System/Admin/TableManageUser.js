import React, { Component } from 'react';
import { connect } from 'react-redux';
import './tableManageUser.scss';
import * as actions from '../../../store/actions';
import Pagination from "react-js-pagination"; // Import thư viện

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            activePage: 1,
            itemsCountPerPage: 5
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
                // Reset về trang 1 nếu danh sách thay đổi (ví dụ sau khi xóa)
                activePage: 1
            })
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
    }

    handleDeleteUser = (userId) => {
        this.props.deleteAUserRedux(userId);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let { userRedux, activePage, itemsCountPerPage } = this.state;

        // Logic tính toán phân trang Client-side
        const indexOfLastItem = activePage * itemsCountPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
        const currentUsers = userRedux.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div className="users-container p-3">
                <div className='user-table'>
                    <table id="TableManageUser">
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
                            {currentUsers && currentUsers.length > 0 ?
                                currentUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className="text-center">
                                            <button className='btn-edit' title="Edit"
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' title="Delete"
                                                onClick={() => this.handleDeleteUser(item.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No data found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/* Phần hiển thị phân trang */}
                <div className="custom-pagination mt-3 d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={userRedux.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    listUsers: state.admin.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (userId) => dispatch(actions.deleteAUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);