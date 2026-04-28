import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions';

import { Link } from 'react-router-dom';
import doctor from '../../../assets/Doctor/doctorOK.png';



class About extends Component {

    render() {

        let language = this.props.lang;

        return (
            <React.Fragment key={this.props.lang}>
                <div className="section-about">
                    <div className="section-about-header">
                        <FormattedMessage id="banner.about-header" defaultMessage="TQCare là gì?" />
                    </div>

                    <div className="section-about-content">
                        {/* LEFT - VIDEO */}
                        <div className="content-left">
                            <div className="video-wrapper">
                                <iframe
                                    width="100%"
                                    height="450"
                                    src="https://www.youtube.com/embed/8q3qZ4JZ_CA"
                                    title="Website TQCare"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>

                        {/* RIGHT - TEXT */}
                        <div className="content-right">
                            <h3>
                                <FormattedMessage id="banner.about-sub-title" defaultMessage="Nền tảng y tế thông minh" />
                            </h3>
                            <p>
                                <FormattedMessage
                                    id="banner.about-desc-1"
                                    defaultMessage="TQCare là nền tảng y tế hiện đại được thiết kế để kết nối bệnh nhân với bác sĩ một cách nhanh chóng và hiệu quả. Chúng tôi cung cấp dịch vụ tư vấn trực tuyến, đặt lịch khám và các dịch vụ y tế cá nhân hóa."
                                />
                            </p>

                            <p>
                                <FormattedMessage
                                    id="banner.about-desc-2"
                                    defaultMessage="Sứ mệnh của chúng tôi là làm cho dịch vụ chăm sóc sức khỏe trở nên dễ tiếp cận, minh bạch và thuận tiện hơn cho tất cả mọi người trong kỷ nguyên số."
                                />
                            </p>

                            <button className="btn-about">
                                <FormattedMessage id="banner.about-learn-more" defaultMessage="Tìm hiểu thêm" />
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
});
const mapDispatchToProps = dispatch => ({

    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);





