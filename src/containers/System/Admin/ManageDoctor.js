import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGE } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './manageDoctor.scss';
import Select from 'react-select';

const mdParser = new MarkdownIt();
const options = [

    { value: 'chocolate', label: 'Chocolate' },

    { value: 'strawberry', label: 'Strawberry' },

    { value: 'vanilla', label: 'Vanilla' },

];


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentMarkdown = () => {
        console.log('check state', this.state);
    }

    handleChangeDoctor = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Doctor selected:`, this.state.selectedDoctor)
        );
    };


    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment key={this.props.lang}>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <i className="fas fa-user-md"></i>
                        <span><FormattedMessage id="manage-doctor.title" /></span>
                    </div>

                    <div className='more-infor'>
                        <div className='content-left'>
                            <label>Thông tin giới thiệu</label>
                            <textarea

                                onChange={(event) => this.handleOnChangeDescription(event)}
                                value={this.state.description}
                                className="more-info-textarea"
                                placeholder="Nhập mô tả ngắn gọn về bác sĩ..."
                            />
                        </div>

                        <div className='content-right'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeDoctor}
                                options={options}
                                classNamePrefix="react-select"
                                placeholder="Tìm kiếm bác sĩ..."
                            />
                        </div>
                    </div>

                    <div className="editor-wrapper">
                        <div className="editor-header">
                            <span className="header-label"><FormattedMessage id="manage-doctor.info" /></span>
                            <div className="status-badge">
                                <span className="dot"></span> <FormattedMessage id="manage-doctor.typing" />
                            </div>
                        </div>

                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn-save"
                            onClick={() => this.handleSaveContentMarkdown()}
                        >
                            <i className="fas fa-save"></i> <FormattedMessage id="manage-doctor.save" />
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.app.language,
});

const mapDispatchToProps = dispatch => ({
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);