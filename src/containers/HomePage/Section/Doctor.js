import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import doctor from '../../../assets/Doctor/doctorOK.png';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

class Doctor extends Component {

    render() {

        const doctors = [
            {
                id: 1,
                name: "PGS.TS Đỗ Ngọc Hải",
                hospital: "Cơ xương khớp",
                image: doctor,
                link: "/doctor/1"
            },
            {
                id: 2,
                name: "Bác sĩ Minh",
                hospital: "Bệnh viện Bạch Mai",
                image: doctor,
                link: "/doctor/2"
            },
            {
                id: 3,
                name: "Bác sĩ Tuấn",
                hospital: "Bệnh viện Việt Đức",
                image: doctor,
                link: "/doctor/3"
            },
            {
                id: 4,
                name: "Bác sĩ Lan",
                hospital: "Bệnh viện 108",
                image: doctor,
                link: "/doctor/4"
            },
            {
                id: 5,
                name: "Bác sĩ Hùng",
                hospital: "Bệnh viện Hồng Ngọc",
                image: doctor,
                link: "/doctor/5"
            }
        ];

        return (
            <div className='section-Doctor'>
                <div className='Doctor-content'>

                    <div className='Doctor-header'>
                        <span className='Doctor-title'>
                            Bác sĩ nổi bật tuần qua
                        </span>
                        <button className='Doctor-btn'>
                            XEM THÊM
                        </button>
                    </div>

                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        loop={true}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {doctors.map((item) => (
                            <SwiperSlide key={item.id}>


                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />

                                <Link to={item.link} className="card-link">
                                    {item.name}
                                </Link>
                                <span>{item.hospital}</span>




                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Doctor);