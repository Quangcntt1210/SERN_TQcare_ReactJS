import React, { useEffect } from 'react';
import "./pageStatic.scss";

const FAQ = () => {
    // Tự động cuộn lên đầu trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="static-page-wrapper">
            <div className="page-container">
                <header className="page-header">
                    <div className="category-tag">TQCare Support</div>
                    <h1>Câu hỏi thường gặp</h1>
                    <p className="last-updated">Chúng tôi ở đây để giúp đỡ bạn</p>
                </header>

                <div className="content-section">
                    <p className="intro-text">
                        Tìm câu trả lời nhanh cho các thắc mắc phổ biến nhất về <strong>TQCare</strong>. Nếu bạn không tìm thấy thông tin mình cần, vui lòng liên hệ với đội ngũ hỗ trợ.
                    </p>

                    <section className="policy-block">
                        <h3><i className="fas fa-info-circle"></i> 1. TQCare là gì?</h3>
                        <p>
                            TQCare là hệ thống quản lý và đặt lịch khám bệnh thông minh, giúp kết nối bệnh nhân với các bác sĩ chuyên khoa giỏi một cách nhanh chóng và thuận tiện nhất thông qua nền tảng trực tuyến.
                        </p>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-user-plus"></i> 2. Tôi có cần đăng ký tài khoản không?</h3>
                        <p>
                            <strong>Có.</strong> Để đảm bảo tính bảo mật và quản lý hồ sơ y tế cá nhân, bạn cần đăng ký tài khoản. Việc có tài khoản giúp bạn:
                        </p>
                        <ul>
                            <li>Theo dõi lịch sử khám bệnh.</li>
                            <li>Nhận thông báo nhắc lịch tự động.</li>
                            <li>Quản lý thông tin sức khỏe của người thân.</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-lock"></i> 3. Dữ liệu của tôi có an toàn không?</h3>
                        <p>
                            Tuyệt đối an toàn. Chúng tôi sử dụng công nghệ mã hóa SSL 256-bit và tuân thủ các tiêu chuẩn bảo mật y tế nghiêm ngặt nhất để bảo vệ thông tin cá nhân và hồ sơ bệnh án của bạn khỏi mọi truy cập trái phép.
                        </p>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-calendar-check"></i> 4. Làm sao để đặt lịch khám?</h3>
                        <p>
                            Bạn chỉ cần thực hiện 3 bước đơn giản:
                        </p>
                        <ol style={{ paddingLeft: '20px', color: '#475569' }}>
                            <li>Tìm kiếm bác sĩ hoặc chuyên khoa phù hợp.</li>
                            <li>Chọn khung giờ còn trống.</li>
                            <li>Xác nhận thông tin và nhận mã đặt lịch qua Email/SĐT.</li>
                        </ol>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-headset"></i> 5. Làm sao để liên hệ hỗ trợ?</h3>
                        <p>
                            Bạn có thể liên hệ với chúng tôi qua các kênh sau:
                        </p>
                        <ul>
                            <li><strong>Hotline:</strong> +84 889131883 (24/7)</li>
                            <li><strong>Email:</strong> n.tien.quang1210@gmail.com</li>
                            <li><strong>Văn phòng:</strong> Hà Nội, Việt Nam</li>
                        </ul>
                    </section>
                </div>

                <footer className="page-footer-contact">
                    <p>Vẫn còn thắc mắc khác?</p>
                    <button className="btn-contact">Trò chuyện với hỗ trợ viên</button>
                </footer>
            </div>
        </div>
    );
};

export default FAQ;