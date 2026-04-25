import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';


// footer
import { Link } from 'react-router-dom';

class HomeFooter extends Component {
    render() {
        return (
            <footer className="home-footer">
                <div className="footer-container">

                    {/* COL 1: BRAND */}
                    <div className="footer-col">
                        <h2 className="logo">TQCare</h2>
                        <p className="slogan">
                            Nền tảng chăm sóc sức khỏe thông minh cho cuộc sống hiện đại.
                        </p>

                        <div className="footer-social">
                            <a href="https://github.com/quangntq1210" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <i className="fab fa-github"></i>
                            </a>

                            <a href="https://www.facebook.com/quang.ntq.121024" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>

                            <a href="https://www.linkedin.com/in/ti%E1%BA%BFn-quang-nguy%E1%BB%85n-644836370" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* COL 2: QUICK LINKS */}
                    <div className="footer-col">
                        <h4>Khám Phá</h4>
                        <ul>
                            <li><a href="#services">Dịch vụ</a></li>
                            <li><a href="#doctors">Đội ngũ bác sĩ</a></li>
                            <li><a href="#specialty">Chuyên khoa</a></li>
                        </ul>
                    </div>

                    {/* COL 3: LEGAL (Chính sách & Điều khoản) */}
                    <div className="footer-col">
                        <h4>Pháp Lý</h4>
                        <ul>
                            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                            <li><Link to="/terms">Điều khoản sử dụng</Link></li>
                            <li><Link to="/cookies">Chính sách Cookie</Link></li>
                            <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                        </ul>
                    </div>

                    {/* COL 4: CONTACT */}
                    <div className="footer-col">
                        <h4>Liên Hệ</h4>
                        <div className="contact-info">
                            <p><i className="fas fa-phone-alt"></i> +84 889131883</p>
                            <p><i className="fas fa-envelope"></i> n.tien.quang1210@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 TQCare. Tất cả quyền được bảo lưu.</p>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(HomeFooter);