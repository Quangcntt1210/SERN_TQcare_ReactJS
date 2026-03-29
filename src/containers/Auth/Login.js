import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import '@fortawesome/fontawesome-free/css/all.min.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,

        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = () => {
        console.log(this.state.username)
        console.log(this.state.password)
        console.log(this.state)
    }
    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input' >
                            <label>UserName: </label>
                            <input type='text' className='form-control' placeholder='Enter Your UserName'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord: </label>

                            <div className='custom-input-password'>

                                <input type={this.state.showPassword ? 'text' : 'password'}
                                    placeholder='Enter Your PassWord' className='form-control'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)} />


                                <span onClick={() => this.handleShowPassword()}>
                                    <i class={this.state.showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className='col-12 forgot'>
                            <span className='forgot-password'>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or Login With</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className="fa-brands fa-google google" />
                            <i className="fa-brands fa-facebook facebook" />
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
