import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router-dom';

class HomeHeader extends Component {




    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }

    }
    render() {
        let language = this.props.lang;


        return (
            <React.Fragment key={this.props.lang}>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.returnHome()}></div>
                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-hospital" /></div>                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.checkup-package" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.general-checkup" /></div>
                            </div>

                        </div>

                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-circle-question"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>


                            <select
                                className='flag'
                                value={this.props.lang}
                                onChange={(e) => this.changeLanguage(e.target.value)}
                            >
                                <option
                                    className={language === LANGUAGE.VI ? 'language-vi action' : 'language-vi'}
                                    value={LANGUAGE.VI}
                                >
                                    Vietnamese
                                </option>
                                <option
                                    className={language === LANGUAGE.EN ? 'language-en action' : 'language-en'}
                                    value={LANGUAGE.EN}
                                >
                                    English
                                </option>
                            </select>


                        </div>
                    </div>
                </div >
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>

                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <FormattedMessage id="banner.search-placeholder">
                                {placeholder => <input type="text" placeholder={placeholder} />}
                            </FormattedMessage>
                        </div>

                        <div className='option'>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.specialty-exam" /></div>
                            </div>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-mobile-screen-button"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.remote-exam" /></div>
                            </div>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-notes-medical"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.general-checkup" /></div>
                            </div>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.medical-tests" /></div>
                            </div>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-brain"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.mental-health" /></div>
                            </div>
                            <div className='child-option'>
                                <div className='icon-child'><i className="fas fa-tooth"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.dental-exam" /></div>
                            </div>
                        </div>
                    </div>

                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
