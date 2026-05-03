import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './detailDoctor.scss';
import hardAvatar from "../../../assets/avatar_demo.jpg";
import { getDetailInforDoctorService } from '../../../services/userService';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        };
    }

    async componentDidMount() {
        if (this.props.match?.params?.id) {
            let id = this.props.match.params.id;

            try {
                let res = await getDetailInforDoctorService(id);

                if (res && res.errorCode === 0) {
                    this.setState({
                        detailDoctor: res.data
                    });
                }
            } catch (e) {
                console.error("Fetch doctor detail error:", e);
            }
        }
    }

    render() {

        let { detailDoctor } = this.state;

        let imageBase64 = '';

        if (detailDoctor.image) {
            try {
                imageBase64 = atob(detailDoctor.image);
            } catch (e) {
                imageBase64 = detailDoctor.image;
            }
        }
        console.log("IMAGE:", detailDoctor.image);
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className='doctor-detail-container'>

                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${imageBase64})` }}
                        />

                        <div className='content-right'>
                            <div className='up'>
                                {detailDoctor?.positionData?.valueVi || ''},{" "}
                                {detailDoctor?.lastName} {detailDoctor?.firstName}
                            </div>

                            <div className='down'>
                                {detailDoctor?.Markdown?.description || ''}
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>

                    </div>

                    <div className='detail-infor-doctor'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: detailDoctor?.Markdown?.contentHTML || ''
                            }}
                        />
                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);