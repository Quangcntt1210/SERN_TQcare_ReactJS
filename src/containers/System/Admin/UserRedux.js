import React, { Component } from 'react';
import { connect } from 'react-redux';
import hardAvatar from "../../../assets/avatar_demo.jpg"
import { FormattedMessage } from 'react-intl';
import { LANGUAGE, CRUD_ACTIONS, } from '../../../utils/constant';
import { CommonUtils } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions';
import adminReducer from '../../../store/reducers/adminReducer';
import * as actions from "../../../store/actions";
import { get, set } from 'lodash';
import TableManageUser from './TableManageUser';
import { toast } from "react-toastify";
import { injectIntl } from 'react-intl';


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
            actions: CRUD_ACTIONS.CREATE,
            userEditId: '',
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
    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {

            // anh goc chua nen
            let base64 = await CommonUtils.getBase64(file);

            // nen anh
            let base64Compressed = await CommonUtils.compressImage(base64, 0.7);

            if (this.state.previewImg) {
                URL.revokeObjectURL(this.state.previewImg);
            }
            let objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImg: objectUrl,

                // luu anh sau khi da nen va gui len server
                avatar: base64Compressed
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
        if (!isValid) return;
        let { actions } = this.state
        if (actions === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
        } else if (actions === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                // password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avatar || undefined
            })

        }
    }
    // checkValidateInput = () => {
    //     let error = {};

    //     const fields = [
    //         'email',
    //         'password',
    //         'firstName',
    //         'lastName',
    //         'address',
    //         'phoneNumber',
    //         'gender',
    //         'position',
    //         'role'
    //     ];

    //     for (let i = 0; i < fields.length; i++) {
    //         let field = fields[i];
    //         let value = this.state[field];

    //         switch (field) {
    //             case 'email':
    //                 if (!value) {
    //                     error.email = 'manage-user.validate.required';
    //                 } else {
    //                     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //                     if (!emailRegex.test(value)) {
    //                         error.email = 'manage-user.validate.email';
    //                     }
    //                 }
    //                 break;

    //             // case 'password':
    //             //     if (!value) {
    //             //         error.password = 'manage-user.validate.required';
    //             //     } else {
    //             //         const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    //             //         if (!passwordRegex.test(value)) {
    //             //             error.password = 'manage-user.validate.password';
    //             //         }
    //             //     }
    //             //     break;
    //             case 'password':
    //                 if (this.state.actions !== CRUD_ACTIONS.EDIT) {
    //                     if (!value) {
    //                         error.password = 'manage-user.validate.required';
    //                     } else {
    //                         const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    //                         if (!passwordRegex.test(value)) {
    //                             error.password = 'manage-user.validate.password';
    //                         }
    //                     }
    //                 }
    //                 break;

    //             case 'phoneNumber':
    //                 if (!value) {
    //                     error.phoneNumber = 'manage-user.validate.required';
    //                 } else {
    //                     const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    //                     if (!phoneRegex.test(value)) {
    //                         error.phoneNumber = 'manage-user.validate.phone';
    //                     }
    //                 }
    //                 break;

    //             default:
    //                 if (!value) {
    //                     error[field] = 'manage-user.validate.required';
    //                 }
    //                 break;
    //         }


    //         if (Object.keys(error).length > 0) break;
    //     }

    //     this.setState({ error });

    //     return Object.keys(error).length === 0;
    // };
    checkValidateInput = () => {
        let error = {};

        const fields = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
            'phoneNumber',
            'gender',
            'position',
            'role'
        ];

        fields.forEach(field => {
            let value = this.state[field];

            switch (field) {
                case 'email':
                    if (!value) {
                        error.email = 'manage-user.validate.required';
                    } else {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            error.email = 'manage-user.validate.email';
                        }
                    }
                    break;

                case 'password':
                    if (this.state.actions !== CRUD_ACTIONS.EDIT) {
                        if (!value) {
                            error.password = 'manage-user.validate.required';
                        } else {
                            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
                            if (!passwordRegex.test(value)) {
                                error.password = 'manage-user.validate.password';
                            }
                        }
                    }
                    break;

                case 'phoneNumber':
                    if (!value) {
                        error.phoneNumber = 'manage-user.validate.required';
                    } else {
                        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
                        if (!phoneRegex.test(value)) {
                            error.phoneNumber = 'manage-user.validate.phone';
                        }
                    }
                    break;

                default:
                    if (!value) {
                        error[field] = 'manage-user.validate.required';
                    }
                    break;
            }
        });

        this.setState({ error });

        return Object.keys(error).length === 0;
    };
    onChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        })
    }

    //v1
    //     componentDidUpdate(prevProps) {

    //       if (prevProps.genderRedux !== this.props.genderRedux && this.state.actions !== CRUD_ACTIONS.EDIT) {
    //     this.setState({ gender: '' });
    // }
    //         //     const arr = this.props.genderRedux;

    //         //     this.setState({
    //         //         // gender: arr?.[0]?.key || ''
    //         //         gender: '',
    //         //     });
    //         // }

    //         if (prevProps.positionRedux !== this.props.positionRedux) {
    //             const arr = this.props.positionRedux;

    //             this.setState({
    //                 // position: arr?.[0]?.key || ''
    //                 position: '',
    //             });
    //         }

    //         if (prevProps.roleRedux !== this.props.roleRedux) {
    //             const arr = this.props.roleRedux;

    //             this.setState({
    //                 // role: arr?.[0]?.key || ''
    //                 role: '',
    //             });
    //         }
    //         // if (prevProps.listUsers !== this.props.listUsers) {

    //         //     this.handleReset();
    //         // }
    //         if (prevProps.isUserCreated !== this.props.isUserCreated) {
    //             if (this.props.isUserCreated === true) {

    //                 toast.success(
    //                     this.props.intl.formatMessage({ id: "manage-user.create-success" })
    //                 );

    //                 this.handleReset();

    //                 this.props.resetCreateUser();

    //             }
    //         }
    //         // SUCCESS
    //         if (prevProps.deleteStatus !== this.props.deleteStatus) {

    //             if (this.props.deleteStatus === 'success') {
    //                 toast.success(
    //                     <FormattedMessage id="manage-user.delete-success" />
    //                 );

    //                 this.props.fetchUserRedux();
    //                 this.props.resetDeleteUser();
    //             }

    //             if (this.props.deleteStatus === 'fail') {
    //                 toast.error(
    //                     <FormattedMessage id="manage-user.delete-fails" />
    //                 );

    //                 this.props.resetDeleteUser();
    //             }
    //         }
    //         if (prevProps.isUserUpdated !== this.props.isUserUpdated) {

    //             if (this.props.isUserUpdated === 'success') {

    //                 toast.success(
    //                     this.props.intl.formatMessage({ id: "manage-user.update-success" })
    //                 );

    //                 this.handleReset();

    //                 this.props.fetchUserRedux();

    //                 this.props.resetUpdateUser();
    //             }

    //             if (this.props.isUserUpdated === 'fail') {

    //                 toast.error(
    //                     this.props.intl.formatMessage({ id: "manage-user.update-fails" })
    //                 );

    //                 this.props.resetUpdateUser();
    //             }
    //         }
    //     }

    //V2
    // componentDidUpdate(prevProps) {

    //     const isEditing = this.state.actions === CRUD_ACTIONS.EDIT;
    //     if (isEditing) return;
    //     if (prevProps.genderRedux !== this.props.genderRedux && !isEditing) {
    //         this.setState({ gender: '' });
    //     }

    //     if (prevProps.positionRedux !== this.props.positionRedux && !isEditing) {
    //         this.setState({ position: '' });
    //     }

    //     if (prevProps.roleRedux !== this.props.roleRedux && !isEditing) {
    //         this.setState({ role: '' });
    //     }

    //     // create
    //     if (prevProps.isUserCreated !== this.props.isUserCreated) {
    //         if (this.props.isUserCreated === true) {
    //             toast.success(
    //                 this.props.intl.formatMessage({ id: "manage-user.create-success" })
    //             );
    //             this.handleReset();
    //             this.props.resetCreateUser();
    //         }
    //     }

    //     // delete
    //     if (prevProps.deleteStatus !== this.props.deleteStatus
    //         && this.props.deleteStatus !== 'idle'
    //     ) {
    //         if (this.props.deleteStatus === 'success') {
    //             toast.success(<FormattedMessage id="manage-user.delete-success" />);
    //             this.props.fetchUserRedux();
    //             this.props.resetDeleteUser();
    //         }

    //         if (this.props.deleteStatus === 'fail') {
    //             toast.error(<FormattedMessage id="manage-user.delete-fails" />);
    //             this.props.resetDeleteUser();
    //         }

    //     }

    //     // update
    //     if (prevProps.isUserUpdated !== this.props.isUserUpdated
    //         && this.props.isUserUpdated !== 'idle'
    //     ) {
    //         if (this.props.isUserUpdated === 'success') {
    //             toast.success(
    //                 this.props.intl.formatMessage({ id: "manage-user.update-success" })
    //             );
    //             this.handleReset();
    //             this.props.fetchUserRedux();
    //             this.props.resetEditUserRedux();
    //         }

    //         if (this.props.isUserUpdated === 'fail') {
    //             toast.error(
    //                 this.props.intl.formatMessage({ id: "manage-user.update-fails" })
    //             );
    //             this.props.resetEditUserRedux();
    //         }
    //     }
    // }
    componentDidUpdate(prevProps) {

        const isEditing = this.state.actions === CRUD_ACTIONS.EDIT;

        // chỉ chặn reset form khi edit
        if (!isEditing) {
            if (prevProps.genderRedux !== this.props.genderRedux) {
                this.setState({ gender: '' });
            }

            if (prevProps.positionRedux !== this.props.positionRedux) {
                this.setState({ position: '' });
            }

            if (prevProps.roleRedux !== this.props.roleRedux) {
                this.setState({ role: '' });
            }
        }

        // create
        if (prevProps.isUserCreated !== this.props.isUserCreated) {
            if (this.props.isUserCreated === true) {
                toast.success(
                    this.props.intl.formatMessage({ id: "manage-user.create-success" })
                );
                this.handleReset();
                this.props.resetCreateUser();
            }
        }

        // delete
        if (prevProps.deleteStatus !== this.props.deleteStatus
            && this.props.deleteStatus !== 'idle'
        ) {
            if (this.props.deleteStatus === 'success') {
                toast.success(<FormattedMessage id="manage-user.delete-success" />);
                this.props.fetchUserRedux();
            }

            if (this.props.deleteStatus === 'fail') {
                toast.error(<FormattedMessage id="manage-user.delete-fails" />);
            }

            this.props.resetDeleteUser();
        }

        // update
        if (prevProps.isUserUpdated !== this.props.isUserUpdated
            && this.props.isUserUpdated !== 'idle'
        ) {
            if (this.props.isUserUpdated === 'success') {
                toast.success(
                    this.props.intl.formatMessage({ id: "manage-user.update-success" })
                );
                this.handleReset();
                this.props.fetchUserRedux();
            }

            if (this.props.isUserUpdated === 'fail') {
                toast.error(
                    this.props.intl.formatMessage({ id: "manage-user.update-fails" })
                );
            }

            this.props.resetEditUserRedux();
        }
    }
    // handleEditUserFromParent = (user) => {
    //     let imageBase64 = '';
    //     if (user.image && user.image.data) {

    //         imageBase64 = btoa(
    //             new Uint8Array(user.image.data).reduce(
    //                 (data, byte) => data + String.fromCharCode(byte),
    //                 ''
    //             )
    //         );


    //         // imageBase64 = `data:image/binary;base64,${imageBase64}`;
    //         imageBase64 = `data:image/png;base64,${imageBase64}`
    //     }

    //     this.setState({
    //         email: user.email,
    //         password: '*******',
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         address: user.address,
    //         phoneNumber: user.phoneNumber,
    //         gender: user.gender,
    //         position: user.positionId,
    //         role: user.roleId,
    //         avatar: '',
    //         previewImg: imageBase64,
    //         actions: CRUD_ACTIONS.EDIT,
    //         error: {},
    //         userEditId: user.id
    //     }, () => {
    //         console.log('State after reset:', this.state);
    //     })

    // }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';

        if (user.image && user.image.data) {

            imageBase64 = CommonUtils.getBase64FromBuffer(user.image.data);
            // const base64String = new TextDecoder().decode(
            //     new Uint8Array(user.image.data)
            // );

            // imageBase64 = base64String;
        }

        this.setState({
            previewImg: imageBase64,
            email: user.email,
            password: '*******',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            actions: CRUD_ACTIONS.EDIT,
            error: {},
            userEditId: user.id
        });
    };
    handleReset = () => {
        if (this.state.previewImg) {
            URL.revokeObjectURL(this.state.previewImg);
        }
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            previewImg: '',
            role: '',
            error: {},
            actions: CRUD_ACTIONS.CREATE,
            userEditId: '',

        })
    }

    render() {

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
                                                            <input type="email" disabled={this.state.actions === CRUD_ACTIONS.EDIT}
                                                                className={`form-control ${this.state.error.email ? 'is-invalid' : ''}`}
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
                                                                placeholder="Enter password" disabled={this.state.actions === CRUD_ACTIONS.EDIT}
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
                                                                    <option key={index} value={item.keyMap}>
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
                                                                    <option key={index} value={item.keyMap}>
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
                                                                    <option key={index} value={item.keyMap}>
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
                                                            className={this.state.actions === CRUD_ACTIONS.EDIT ? "btn btn-warning px-3 me-2 shadow-sm" : "btn btn-primary px-3 me-2 shadow-sm"}
                                                            onClick={() => this.handleSaveUser()}
                                                        >
                                                            {this.state.actions === CRUD_ACTIONS.EDIT ?
                                                                <FormattedMessage id="manage-user.edit" />
                                                                : <FormattedMessage id="manage-user.save" />
                                                            }

                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={this.handleReset}
                                                            className="btn btn-outline-secondary px-3 shadow-sm"
                                                        >
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
                        <div className="container pb-5">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10">

                                    <div className="card shadow-sm border-0">
                                        <div className="card-header bg-white border-0">
                                            <h5 className="mb-0 fw-bold text-primary">

                                            </h5>
                                        </div>

                                        <div className="card-body p-3">

                                            {/* TABLE USER */}
                                            <TableManageUser
                                                handleEditUserFromParent={this.handleEditUserFromParent}
                                                actions={this.state.actions}
                                            />

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
        roleRedux: state.admin.roles,
        isUserCreated: state.admin.isUserCreated,
        deleteStatus: state.admin.deleteStatus,
        isUserUpdated: state.admin.isUserUpdated

    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.saveCreateUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        resetCreateUser: () => dispatch(actions.resetCreateUser()),
        deleteAUser: (userId) => dispatch(actions.deleteAUser(userId)),
        resetDeleteUser: () => dispatch(actions.resetDeleteUser()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        resetEditUserRedux: () => dispatch(actions.resetEditUser()),
        //  processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

    };
};

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(UserRedux)
);
