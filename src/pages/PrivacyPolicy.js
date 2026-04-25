import React, { useEffect } from 'react';
import "./pageStatic.scss";

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="static-page-wrapper">
            <div className="page-container">
                <header className="page-header">
                    <div className="category-tag">TQCare Security</div>
                    <h1>Chính sách bảo mật</h1>
                    <p className="last-updated">Cập nhật lần cuối: Ngày 14 tháng 04, 2026</p>
                </header>

                <div className="content-section">
                    <p className="intro-text">
                        Tại <strong>TQCare</strong>, chúng tôi coi trọng sự riêng tư và cam kết bảo vệ tuyệt đối thông tin cá nhân của người dùng.
                        Chính sách này giải thích cách chúng tôi xử lý dữ liệu của bạn.
                    </p>

                    <section className="policy-block">
                        <h3><i className="fas fa-database"></i> 1. Thông tin thu thập</h3>
                        <p>Chúng tôi thu thập các thông tin cần thiết để cung cấp dịch vụ tốt nhất:</p>
                        <ul>
                            <li>Thông tin định danh: Họ tên, ngày sinh, giới tính.</li>
                            <li>Thông tin liên lạc: Email, số điện thoại, địa chỉ.</li>
                            <li>Dữ liệu y tế: Triệu chứng, lịch sử đặt khám (được mã hóa).</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-shield-alt"></i> 2. Bảo mật thông tin</h3>
                        <p>Dữ liệu của bạn được bảo vệ bởi các lớp bảo mật tiêu chuẩn quốc tế (SSL/TLS). Chúng tôi áp dụng quy trình kiểm soát truy cập nghiêm ngặt để đảm bảo chỉ những nhân viên có thẩm quyền mới có thể tiếp cận.</p>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-user-check"></i> 3. Quyền của bạn</h3>
                        <p>Bạn luôn có toàn quyền kiểm soát dữ liệu của mình, bao gồm:</p>
                        <ul>
                            <li>Yêu cầu truy xuất bản sao dữ liệu cá nhân.</li>
                            <li>Chỉnh sửa thông tin không chính xác.</li>
                            <li>Yêu cầu xóa tài khoản và dữ liệu liên quan vĩnh viễn.</li>
                        </ul>
                    </section>
                </div>

                <footer className="page-footer-contact">
                    <p>Bạn có thắc mắc về chính sách của chúng tôi?</p>
                    <button className="btn-contact">Gửi yêu cầu hỗ trợ</button>
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicy;