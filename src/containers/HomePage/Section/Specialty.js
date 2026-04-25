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
                        <span className='specialty-title'>Chuyên khoa phổ biến</span>
                        <button className='specialty-btn'>XEM THÊM</button>
                    </div>
                    <div className='specialty-body'>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >

                            <SwiperSlide className='specialty-xuongkhop'>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Cơ xương khớp</span>
                            </SwiperSlide>
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

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);