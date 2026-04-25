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

                            <SwiperSlide className='medical-xuongkhop'>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${coxuongkhop})` }}
                                ></div>
                                <span> Bệnh viện đa khoa An Việt</span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medical);
