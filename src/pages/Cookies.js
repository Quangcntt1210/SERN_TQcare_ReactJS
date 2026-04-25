import React, { useEffect } from 'react';
import "./pageStatic.scss";

const Cookies = () => {
    // Luôn cuộn lên đầu trang khi truy cập
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="static-page-wrapper">
            <div className="page-container">
                <header className="page-header">
                    <div className="category-tag">TQCare Transparency</div>
                    <h1>Chính sách Cookie</h1>
                    <p className="last-updated">Đảm bảo trải nghiệm duyệt web tối ưu và an toàn</p>
                </header>

                <div className="content-section">
                    <p className="intro-text">
                        Chúng tôi sử dụng Cookie và các công nghệ tương tự để giúp website <strong>TQCare</strong> vận hành hiệu quả, bảo mật và ghi nhớ sở thích cá nhân của bạn.
                    </p>

                    <section className="policy-block">
                        <h3><i className="fas fa-cookie-bite"></i> 1. Cookie là gì?</h3>
                        <p>
                            Cookie là các tệp văn bản nhỏ được lưu trữ trên máy tính hoặc thiết bị di động của bạn khi bạn truy cập trang web. Chúng giúp website "nhận diện" bạn trong những lần truy cập sau để mang lại trải nghiệm liền mạch hơn.
                        </p>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-tasks"></i> 2. Chúng tôi sử dụng Cookie để làm gì?</h3>
                        <p>Cookie đóng vai trò quan trọng trong việc duy trì và phát triển dịch vụ của chúng tôi:</p>
                        <ul>
                            <li><strong>Cookie thiết yếu:</strong> Giúp bạn đăng nhập và duy trì phiên làm việc an toàn mà không cần nhập lại mật khẩu liên tục.</li>
                            <li><strong>Cookie hiệu suất:</strong> Thu thập dữ liệu ẩn danh về cách bạn tương tác với website để chúng tôi sửa lỗi và cải thiện tốc độ tải trang.</li>
                            <li><strong>Cookie cá nhân hóa:</strong> Ghi nhớ ngôn ngữ, chuyên khoa bạn thường xem hoặc vị trí địa lý của bạn để đề xuất bác sĩ gần nhất.</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-user-cog"></i> 3. Quyền quản lý của bạn</h3>
                        <p>
                            Bạn hoàn toàn có quyền kiểm soát các tệp Cookie này. Hầu hết các trình duyệt (Chrome, Safari, Edge) đều cho phép bạn:
                        </p>
                        <ul>
                            <li>Xem các cookie hiện có và xóa chúng theo ý muốn.</li>
                            <li>Chặn cookie của bên thứ ba.</li>
                            <li>Chặn hoàn toàn việc sử dụng cookie (Lưu ý: Điều này có thể khiến bạn không thể sử dụng chức năng Đặt lịch trên TQCare).</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-check-circle"></i> 4. Sự chấp thuận</h3>
                        <p>
                            Bằng cách tiếp tục sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc TQCare lưu trữ các Cookie cần thiết để cung cấp đầy đủ các tính năng y tế cốt lõi.
                        </p>
                    </section>
                </div>

                <footer className="page-footer-contact">
                    <p>Bạn muốn biết thêm về cách chúng tôi bảo vệ quyền riêng tư?</p>
                    <button className="btn-contact">Xem Chính sách Bảo mật</button>
                </footer>
            </div>
        </div>
    );
};

export default Cookies;