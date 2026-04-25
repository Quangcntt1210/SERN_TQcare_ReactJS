import React, { Component } from 'react';
import { connect } from 'react-redux';
import hardAvatar from "../../../assets/avatar_demo.jpg"
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions';
import adminReducer from '../../../store/reducers/adminReducer';
import * as actions from "../../../store/actions";
import { get } from 'lodash';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // genderArr: [],
            // positionArr: [],
            // roleArr: [],
            previewImg: '',
            isOpenPreview: false,
            hardAvatar: null,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            error: {},

        }

    }
    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }
    componentWillUnmount() {
        if (this.state.previewImg) {
            URL.revokeObjectURL(this.state.previewImg);
        }
    }
    handleOnChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImg: objectUrl,
                avatar: file
            })
        }
    }
    handlePreviewImage = () => {
        if (!this.state.previewImg) return;

        this.setState({
            isOpenPreview: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();

        if (isValid) {
            console.log("Submit OK");
        }
    }
    checkValidateInput = () => {
        let error = {};
        let { email, password, phoneNumber } = this.state;

        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'position', 'role'];



        arrInput.forEach(field => {
            if (!this.state[field]) {
                error[field] = 'manage-user.validate.required';
            }
        });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            error.email = 'manage-user.validate.email';
        }
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            error.phoneNumber = 'manage-user.validate.phone';
        }


        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (password && !passwordRegex.test(password)) {
            error.password = 'manage-user.validate.password';
        }

        this.setState({ error });

        return Object.keys(error).length === 0;
    }
    onChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        })
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.genderRedux !== this.props.genderRedux) {
    //         let arrGenders = this.props.genderRedux
    //         this.setState({
    //             genderArr: arrGenders,
    //             gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
    //         })
    //     }
    //     if (prevProps.positionRedux !== this.props.positionRedux) {
    //         let arrPositions = this.props.positionRedux
    //         this.setState({
    //             positionArr: arrPositions,
    //             position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
    //         })
    //     }
    //     if (prevProps.roleRedux !== this.props.roleRedux) {
    //         let arrRoles = this.props.roleRedux
    //         this.setState({
    //             roleArr: arrRoles,
    //             role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
    //         })
    //     }
    // }
    render() {
        // dung khi didupdate
        // let gender = this.props.genderArr
        //
        let getGender = this.props.genderRedux
        let getPosition = this.props.positionRedux
        let getRole = this.props.roleRedux

        let language = this.props.lang;
        let isLoadingGender = this.props.isLoadingGender
        let isLoadingPosition = this.props.isLoadingPosition
        let isLoadingRole = this.props.isLoadingRole

        let {
            email, password, firstName, lastName, address, phoneNumber,
            gender, position, role, avatar
        } = this.state


        return (
            <React.Fragment key={this.props.lang}>
                {isLoadingGender || isLoadingPosition || isLoadingRole ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="mt-3">Loading data...</p>
                    </div>
                ) : (
                    <div className='product-manage-container'>

                        <div className="user-redux-body py-5">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="card shadow-sm border-0">
                                            <div className="card-body p-4">
                                                <h3 className="text-center mb-4 fw-bold text-primary" >
                                                    <FormattedMessage id="manage-user.add" />
                                                </h3>

                                                {/* --- Phần Preview Image --- */}

                                                <div className="text-center mb-4">
                                                    <div className="position-relative d-inline-block">
                                                        <img
                                                            src={this.state.previewImg ? this.state.previewImg : hardAvatar}
                                                            alt="Preview"
                                                            className="rounded-circle img-thumbnail shadow-sm"
                                                            style={{
                                                                width: '120px',
                                                                height: '120px',
                                                                objectFit: 'cover',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={this.handlePreviewImage}
                                                        />

                                                        <label
                                                            htmlFor="upload-photo"
                                                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                                                            style={{ width: '32px', height: '32px', cursor: 'pointer', border: '2px white solid' }}
                                                        >
                                                            <span style={{ fontSize: '18px' }}>+</span>

                                                            <input
                                                                type="file"
                                                                id="upload-photo"
                                                                hidden
                                                                onChange={this.handleOnChangeImage}
                                                            />
                                                        </label>
                                                    </div>

                                                    <p className="small text-muted mt-2">
                                                        <FormattedMessage id="manage-user.upload-img" />
                                                    </p>
                                                </div>
                                                {this.state.isOpenPreview && (
                                                    <div
                                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                            zIndex: 9999
                                                        }}
                                                        onClick={(e) => {
                                                            if (e.target === e.currentTarget) {
                                                                this.setState({ isOpenPreview: false })
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            src={this.state.previewImg}
                                                            alt="Preview Large"
                                                            style={{
                                                                maxWidth: '80%',
                                                                maxHeight: '80%',
                                                                borderRadius: '10px'
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <hr className="mb-4 text-secondary opacity-25" />

                                                <form >
                                                    {/* Hàng 1: Email - Password */}
                                                    <div className="row mb-3">
                                                        <div className="form-group col-md-6">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.email" />
                                                            </label>
                                                            <input type="email" className={`form-control ${this.state.error.email ? 'is-invalid' : ''}`}
                                                                placeholder="name@example.com"
                                                                value={email}
                                                                onChange={(e) => this.onChangeInput(e, 'email')}
                                                            />
                                                            {this.state.error.email && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.email} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.password" />
                                                            </label>
                                                            <input type="password" className={`form-control ${this.state.error.password ? 'is-invalid' : ''}`}
                                                                placeholder="Enter password"
                                                                value={password}
                                                                onChange={(e) => this.onChangeInput(e, 'password')}
                                                            />
                                                            {this.state.error.password && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.password} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Hàng 2: First Name - Last Name */}
                                                    <div className="row mb-3">
                                                        <div className="form-group col-md-6">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.firstName" />
                                                            </label>
                                                            <input type="text" className={`form-control ${this.state.error.firstName ? 'is-invalid' : ''}`} placeholder="John"
                                                                value={firstName}
                                                                onChange={(e) => this.onChangeInput(e, 'firstName')}
                                                            />
                                                            {this.state.error.firstName && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.firstName} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.lastName" />
                                                            </label>
                                                            <input type="text" className={`form-control ${this.state.error.lastName ? 'is-invalid' : ''}`} placeholder="Doe"
                                                                value={lastName}
                                                                onChange={(e) => this.onChangeInput(e, 'lastName')}
                                                            />
                                                            {this.state.error.lastName && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.lastName} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Hàng 3: ADDRESS & POSITION */}
                                                    <div className="row mb-3">
                                                        <div className="form-group col-md-8">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.address" />
                                                            </label>
                                                            <input type="text" className={`form-control ${this.state.error.address ? 'is-invalid' : ''}`} placeholder="Apartment, studio, or floor"
                                                                value={address}
                                                                onChange={(e) => this.onChangeInput(e, 'address')}
                                                            />
                                                            {this.state.error.address && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.address} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group col-md-4">

                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.role" />
                                                            </label>
                                                            <select className={`form-select ${this.state.error.role ? 'is-invalid' : ''}`} value={role}
                                                                onChange={(e) => this.onChangeInput(e, 'role')}>
                                                                <option value="">
                                                                    {language === LANGUAGE.VI ? '--- Chọn vai trò ---' : '--- Choose role ---'}
                                                                </option>
                                                                {getRole && getRole.length > 0 && getRole.map((item, index) => (
                                                                    <option key={index} value={item.key}>
                                                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Hàng 4: Phone - Role - Gender */}
                                                    <div className="row mb-4">
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.phonenumber" />
                                                            </label>
                                                            <input type="text" className={`form-control ${this.state.error.phoneNumber ? 'is-invalid' : ''}`} placeholder="+84 ..."
                                                                value={phoneNumber}
                                                                onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                                            />
                                                            {this.state.error.phoneNumber && (
                                                                <div className="text-danger small">
                                                                    <FormattedMessage id={this.state.error.phoneNumber} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group col-md-4">

                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.position" />
                                                            </label>
                                                            <select className={`form-select ${this.state.error.position ? 'is-invalid' : ''}`} value={position}
                                                                onChange={(e) => this.onChangeInput(e, 'position')} >

                                                                <option value="">
                                                                    {language === LANGUAGE.VI ? '--- Chọn vị trí ---' : '--- Choose position ---'}
                                                                </option>
                                                                {getPosition && getPosition.length > 0 && getPosition.map((item, index) => (
                                                                    <option key={index} value={item.key}>
                                                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="form-label fw-semibold">
                                                                <FormattedMessage id="manage-user.gender" />
                                                            </label>
                                                            <select className={`form-select ${this.state.error.gender ? 'is-invalid' : ''}`} value={gender}
                                                                onChange={(e) => this.onChangeInput(e, 'gender')} >
                                                                <option value="">
                                                                    {language === LANGUAGE.VI ? '--- Chọn giới tính ---' : '--- Choose gender ---'}
                                                                </option>
                                                                {getGender && getGender.length > 0 && getGender.map((item, index) => (
                                                                    <option key={index} value={item.key}>
                                                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Nút bấm */}
                                                    <div className="text-center mt-4 pt-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary px-3 me-2 shadow-sm"
                                                            onClick={() => this.handleSaveUser()}
                                                        >
                                                            <FormattedMessage id="manage-user.save" />
                                                        </button>

                                                        <button type="reset" className="btn btn-outline-secondary px-3 shadow-sm">
                                                            <FormattedMessage id="manage-user.cancel" />
                                                        </button>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </React.Fragment>
        );
    }

}



const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        //  processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
