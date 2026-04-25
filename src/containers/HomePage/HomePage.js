import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty.js';
import Medical from './Section/Medical.js';
import Doctor from './Section/Doctor.js';
import Handbook from './Section/Handbook.js';
import '../../../src/styles/common.scss';
import About from './Section/About.js';
import HomeFooter from './HomeFooter.js';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

class HomePage extends Component {

    render() {


        return (
            <div>
                <HomeHeader />
                <Specialty />
                <Medical />
                <Doctor />
                <Handbook />
                <About />
                <HomeFooter />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
