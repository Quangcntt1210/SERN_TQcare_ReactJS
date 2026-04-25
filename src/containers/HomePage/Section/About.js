import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';


import { Link } from 'react-router-dom';
import doctor from '../../../assets/Doctor/doctorOK.png';



class About extends Component {

    render() {



        return (
            <div className="section-about">
                <div className="section-about-header">
                    What is TQCare?
                </div>

                <div className="section-about-content">
                    {/* LEFT - VIDEO */}
                    <div className="content-left">
                        <div className="video-wrapper">
                            <iframe
                                width="966"
                                height="543" src="https://www.youtube.com/embed/8q3qZ4JZ_CA"
                                title="Website TQCare" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                            </iframe>
                        </div>
                    </div>

                    {/* RIGHT - TEXT */}
                    <div className="content-right">
                        <h3>Smart Healthcare Platform</h3>
                        <p>
                            TQCare is a modern healthcare platform designed to connect patients with doctors
                            quickly and efficiently. We provide online consultation, appointment booking,
                            and personalized medical services.
                        </p>

                        <p>
                            Our mission is to make healthcare more accessible, transparent, and convenient
                            for everyone in the digital age.
                        </p>

                        <button className="btn-about" >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(About);





