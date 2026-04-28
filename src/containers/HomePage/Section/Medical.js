import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Medical.scss';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import coxuongkhop from '../../../assets/specialty/cocuongkhop.png';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

class Medical extends Component {
    render() {
        return (
            <div className='section-medical'>
                <div className='medical-content'>
                    <div className='medical-header'>
                        <span className='medical-title'>Cơ sở y tế nổi bật</span>
                        <button className='medical-btn'>XEM THÊM</button>
                    </div>
                    <div className='medical-body'>
                        <Swiper
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
                                    <span className="medical-name">Bệnh viện đa khoa An Việt</span>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Medical);