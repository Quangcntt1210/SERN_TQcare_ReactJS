import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions';
import { CommonUtils } from '../../../utils';
import { withRouter } from 'react-router-dom';
import DetailDoctor from '../../Patient/Doctor/detailDoctor';
import { Route } from 'react-router-dom';
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {

            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }

    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    handleViewDetailDoctor = (event, doctor) => {
        event.stopPropagation();
        console.log("check doctor ok:", doctor)
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }
    handleViewSpecialty = (event, doctor) => {
        event.stopPropagation(); // chặn việc nhảy trang doctor

        // gắn link chuyên khoa
        // this.props.history.push(`/detail-specialty/${doctor.specialtyId}`);
    }
    render() {
        // let { topDoctorsRedux } = this.props;
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.lang;


        return (

            <React.Fragment key={this.props.lang}>

                <div className='section-Doctor'>
                    <div className='Doctor-content'>

                        <div className='Doctor-header'>
                            <span className='Doctor-title'>
                                <FormattedMessage id="banner.top-doctor" />
                            </span>
                            <button className='Doctor-btn'>
                                <FormattedMessage id="banner.more-info" />
                            </button>
                        </div>

                        <Swiper
                            key={`swiper-${arrDoctors.length}-${this.props.lang}`}

                            // slidesPerView={3}
                            spaceBetween={20}
                            observer={true}
                            observeParents={true}
                            loop={true}
                            pagination={{ clickable: true }}
                            navigation={true}
                            breakpoints={{

                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 10
                                },

                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 15
                                },

                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                }
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item) => (
                                <SwiperSlide key={item.id}>


                                    <div
                                        className="bg-image"
                                        style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
                                        onClick={(event) => this.handleViewDetailDoctor(event, item)}
                                    />

                                    <div className="doctor-info">
                                        <div className="position">
                                            {item.positionData ? (language === LANGUAGE.VI ? item.positionData.valueVi : item.positionData.valueEn) : ''}
                                        </div>

                                        <div
                                            className="doctor-name"
                                            style={{ cursor: 'pointer' }}
                                            onClick={(event) => this.handleViewDetailDoctor(event, item)}
                                        >
                                            {item.lastName} {item.firstName}
                                        </div>


                                        <div
                                            className="specialty"
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                            onClick={(event) => this.handleViewSpecialty(event, item)}
                                        >
                                            Chuyên khoa
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    lang: state.app.language,
});
const mapDispatchToProps = dispatch => ({
    loadTopDoctor: () => dispatch(actions.fetchTopDoctorHome()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
});
const DoctorWithRedux = connect(mapStateToProps, mapDispatchToProps)(Doctor);
export default withRouter(DoctorWithRedux);