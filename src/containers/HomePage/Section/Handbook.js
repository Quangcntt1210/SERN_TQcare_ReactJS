import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handbook.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import doctor from '../../../assets/Doctor/doctorOK.png';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

class Handbook extends Component {

    render() {

        const Handbooks = [
            {
                id: 1,

                hospital: "Làm sao để cơ thể\n khỏe mạnh hơn mỗi ngày ?",
                image: doctor,
                link: "/doctor/1"
            },
            {
                id: 2,

                hospital: "Bệnh viện Bạch Mai",
                image: doctor,
                link: "/doctor/2"
            },
            {
                id: 3,

                hospital: "Bệnh viện Việt Đức",
                image: doctor,
                link: "/doctor/3"
            },
            {
                id: 4,

                hospital: "Bệnh viện 108",
                image: doctor,
                link: "/doctor/4"
            },
            {
                id: 5,

                hospital: "Bệnh viện Hồng Ngọc",
                image: doctor,
                link: "/doctor/5"
            }
        ];

        return (
            <div className='section-Handbook'>
                <div className='Handbook-content'>

                    <div className='Handbook-header'>
                        <span className='Handbook-title'>
                            Cẩm nang
                        </span>
                        <button className='Handbook-btn'>
                            XEM THÊM
                        </button>
                    </div>

                    <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        loop={true}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {Handbooks.map((item) => (
                            <SwiperSlide key={item.id}>


                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />



                                <div className="content">
                                    <Link to={item.link} className="card-link">
                                        {item.hospital}
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Handbook);