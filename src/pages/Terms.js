import React, { useEffect } from 'react';
import "./pageStatic.scss";

const Terms = () => {
    // Tự động cuộn lên đầu trang khi component được mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="static-page-wrapper">
            <div className="page-container">
                <header className="page-header">
                    <div className="category-tag">TQCare Legal</div>
                    <h1>Điều khoản sử dụng</h1>
                    <p className="last-updated">Cập nhật lần cuối: Ngày 14 tháng 04, 2026</p>
                </header>

                <div className="content-section">
                    <p className="intro-text">
                        Bằng việc truy cập hoặc sử dụng nền tảng <strong>TQCare</strong>, bạn đồng ý chịu sự ràng buộc bởi các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ trước khi tiếp tục.
                    </p>

                    <section className="policy-block">
                        <h3><i className="fas fa-gavel"></i> 1. Sử dụng hợp pháp</h3>
                        <p>Dịch vụ của chúng tôi chỉ được sử dụng cho các mục đích hợp pháp. Bạn cam kết:</p>
                        <ul>
                            <li>Không mạo danh cá nhân hoặc tổ chức khác.</li>
                            <li>Không sử dụng công cụ tự động để thu thập dữ liệu trái phép.</li>
                            <li>Tuân thủ các quy định về y tế và an ninh mạng tại Việt Nam.</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-user-shield"></i> 2. Quản lý tài khoản</h3>
                        <p>Bạn có trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của mình. TQCare không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh từ việc bạn để lộ thông tin đăng nhập.</p>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-exclamation-triangle"></i> 3. Giới hạn trách nhiệm</h3>
                        <p>Chúng tôi cung cấp nền tảng kết nối y tế, tuy nhiên:</p>
                        <ul>
                            <li>Thông tin trên website không thay thế cho việc cấp cứu y tế khẩn cấp.</li>
                            <li>TQCare không chịu trách nhiệm cho các gián đoạn dịch vụ do sự cố hạ tầng internet hoặc bất khả kháng.</li>
                        </ul>
                    </section>

                    <section className="policy-block">
                        <h3><i className="fas fa-edit"></i> 4. Thay đổi điều khoản</h3>
                        <p>Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web. Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận các thay đổi đó.</p>
                    </section>
                </div>

                <footer className="page-footer-contact">
                    <p>Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:</p>
                    <button className="btn-contact">Liên hệ bộ phận Pháp lý</button>
                </footer>
            </div>
        </div>
    );
};

export default Terms;