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
import { injectIntl } from 'react-intl';
const mdParser = new MarkdownIt();



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctor: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors && this.props.allDoctors.length > 0) {
            this.setState({
                listDoctor: this.props.allDoctors
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    buildDataInputSelected = (inputData) => {
        const { lang } = this.props;
        let result = [];

        if (inputData && inputData.length > 0) {
            result = inputData.map(item => ({
                label: lang === LANGUAGE.VI
                    ? `${item.lastName} ${item.firstName}`
                    : `${item.firstName} ${item.lastName}`,
                value: item.id
            }));
        }

        return result;
    }
    handleSaveContentMarkdown = () => {
        const { selectedDoctor, contentHTML, contentMarkdown, description } = this.state;

        if (!selectedDoctor) {
            alert("Please select doctor");
            return;
        }

        let data = {
            doctorId: selectedDoctor.value,
            contentHTML,
            contentMarkdown,
            description
        };

        console.log('DATA SEND:', data);
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
        const { intl } = this.props;
        return (
            <React.Fragment key={this.props.lang}>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <i className="fas fa-user-md"></i>
                        <span><FormattedMessage id="manage-doctor.title" /></span>
                    </div>

                    <div className='more-infor'>
                        <div className='content-left'>
                            <label><FormattedMessage id="manage-doctor.infor" /></label>
                            <textarea

                                onChange={(event) => this.handleOnChangeDescription(event)}
                                value={this.state.description}
                                className="more-info-textarea"
                                placeholder={intl.formatMessage({ id: 'manage-doctor.doctor-description' })}
                            />
                        </div>

                        <div className='content-right'>
                            <label><FormattedMessage id="manage-doctor.select-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeDoctor}
                                options={this.buildDataInputSelected(this.state.listDoctor)}
                                classNamePrefix="react-select"
                                placeholder={intl.formatMessage({ id: 'manage-doctor.doctor-search' })}
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
                            disabled={!this.state.selectedDoctor}
                            onClick={this.handleSaveContentMarkdown}
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
    allDoctors: state.admin.allDoctors
});

const mapDispatchToProps = dispatch => ({
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors())
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(ManageDoctor)
);