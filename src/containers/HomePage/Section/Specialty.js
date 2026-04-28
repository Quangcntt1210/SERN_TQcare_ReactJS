import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FormattedMessage } from 'react-intl';
import coxuongkhop from '../../../assets/specialty/cocuongkhop.png';

import './Specialty.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

class Specialty extends Component {
    render() {
        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <div className='specialty-header'>
                        <span className='specialty-title'>
                            <FormattedMessage id="homepage.specialty-popular" defaultMessage="Chuyên khoa phổ biến" />
                        </span>
                        <button className='specialty-btn'>
                            <FormattedMessage id="homepage.more-info" defaultMessage="XEM THÊM" />
                        </button>
                    </div>
                    <div className='specialty-body'>
                        <Swiper
                            key={`specialty-${this.props.lang}`} // Load lại swiper khi đổi ngôn ngữ
                            spaceBetween={20}
                            loop={true}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 15
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                }
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="bg-image"
                                        style={{ backgroundImage: `url(${coxuongkhop})` }}
                                    ></div>
                                    <span className="specialty-name">Cơ xương khớp</span>
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
    };
};

export default connect(mapStateToProps)(Specialty);