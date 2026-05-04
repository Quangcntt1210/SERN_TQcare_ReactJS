import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE, USER_ROLE } from '../../utils';
// import { LANGUAGE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }





    render() {
        const { processLogout, lang, userInfo } = this.props;


        return (
            <div className="header-container" >

                <div className="header-tabs-container">
                    {/* <Navigator key={lang} menus={adminMenu} /> */}
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="header-actions">
                    <div className="language-select">
                        <i className="fas fa-globe"></i>
                        <select
                            className='flag'
                            value={lang}
                            onChange={(e) => this.handleChangeLanguage(e.target.value)}
                        >
                            <option
                                className={lang === LANGUAGE.VI ? 'language-vi action' : 'language-vi'}
                                value={LANGUAGE.VI}
                            >
                                Vietnamese
                            </option>
                            <option
                                className={lang === LANGUAGE.EN ? 'language-en action' : 'language-en'}
                                value={LANGUAGE.EN}
                            >
                                English
                            </option>
                        </select>

                    </div>
                    <span className='welcome'>
                        <FormattedMessage id="menu.system.welcome" />{userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>

                    <div className="btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>

                        <span><FormattedMessage id="menu.system.logout" /></span>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
