# Project review — 12 November 2026

Mục tiêu: cập nhật lần lượt các case cho portfolio ứng tuyển marketing, dựa trên tư liệu hiện có.

## Phạm vi đã kiểm tra

- [Certain] Đã đọc metadata và toàn bộ story của 8 project trong Keystatic; kiểm tra nguồn ảnh và liên kết document bằng bộ test hiện có.
- [Certain] Đã mở Work và case Pixself ở local; xem Pixself tại 1440 px và 390 px, gồm ảnh gốc và trang trước khi sửa.
- Chưa kiểm tra bản production trong đợt này. Các số liệu dưới đây là số liệu đã có trong portfolio, chưa được đối chiếu lại với báo cáo gốc.

## Đợt 1 — Pixself

- Đổi tiêu đề thành “Pixself: from a product idea to 150 orders”; tagline nêu rõ dự án sinh viên 13 tuần và vai trò cá nhân.
- Viết caption cụ thể cho bản nháp nhận diện, character builder, bài launch và workflow n8n, sau khi xem ảnh gốc.
- Đưa doanh thu khoảng 15 triệu đồng lên phần Results. Nguồn: đoạn kết quả đã có tại `content/keystatic/projects/items/0/story/11/value/body.mdoc`; đây là kết quả của nhóm.
- [Certain] TikTok embed báo lỗi `internal_server_error`, code `2005`, trong lần kiểm tra headless và tạo khoảng trống lớn trước phần story. Gallery đã có link “Watch original video”. Cần kiểm tra lại khả năng phát hoặc bổ sung video gốc cho đợt cập nhật media.
- Gallery dùng native `<details>` đóng mặc định để người xem mở media khi cần; phần story xuất hiện ngay sau ảnh cover. Trong dữ liệu hiện tại, Pixself và AEON Beta là hai case có gallery.

## Thứ tự cập nhật tiếp theo

Đây là đề xuất ưu tiên [Likely], có thể đổi theo vị trí ứng tuyển và tư liệu bổ sung.

| Ưu tiên | Project | Nội dung cần xử lý | Nguồn cần đối chiếu |
| --- | --- | --- | --- |
| 1 | Pixself | Hoàn thiện media; kiểm tra video và chuyển ảnh workflow về cạnh phần giải thích khi sửa trong CMS | Video gốc, báo cáo kết quả của nhóm |
| 2 | Hong Ha | Thay ba caption “Report Snapshot” bằng finding cụ thể; bổ sung cỡ mẫu và một ví dụ finding → recommendation nếu báo cáo có | Ba ảnh báo cáo hiện có và báo cáo nghiên cứu gốc |
| 3 | La Passion | Bổ sung minh chứng cho cách lập ngân sách theo doanh thu và sản phẩm content đã giao; hiện phần story chỉ có chữ | Bảng kế hoạch ngân sách đã ẩn dữ liệu nhạy cảm, sản phẩm content được phép công khai |
| 4 | C&S Paper | Giải thích từng trang proposal đang hiển thị; làm rõ quyết định positioning và phần đóng góp trong pitch | Bốn ảnh proposal hiện có, deck gốc nếu cần thêm chi tiết |
| 5 | AEON Beta | Đối chiếu năm thực hiện và các video đang liên kết; bổ sung brief/timeline chứng minh vai trò điều phối | Timeline production và xác nhận 31 video đã nghiệm thu |
| 6 | AEON MALL Thanh Hoa | Nối một yêu cầu trong brief với quyết định visual/adaptation; hiện đã có caption và credits phân vai | Brief và vòng feedback được phép công khai |
| 7 | Clario | Kiểm tra những tính năng được mô tả còn đúng với bản hiện tại; ảnh hiện ghi nguồn ngày 20/10/2026 | Repo Clario và public preview hiện tại |
| 8 | Selected creative work | Bổ sung một dòng brief, vai trò và credit cho từng nhóm tác phẩm | Brief và credit H4TF, TEDx NEU, MGC, Sun Group, ebook |

Ưu tiên chỉnh nội dung và tư liệu qua schema Keystatic hiện có. Chưa có căn cứ để thêm số liệu hiệu quả cho các case còn thiếu kết quả.

## Kiểm tra sau cập nhật

- Build production, lint và 29/29 test đều pass. Kiểm tra schema Keystatic vẫn đọc đủ nội dung và ảnh.
- Pixself: tiêu đề, doanh thu, 8 ảnh và đường đi Work → preview → case đều đúng; không tràn ngang ở 1440 px và 390 px. Gallery đóng còn 66 px, mở/đóng được bằng phím Enter ở cả Pixself và AEON Beta.
- Chưa xác nhận TikTok phát được khi mở gallery; lỗi từ embed bên ngoài vẫn là hạn chế đã ghi nhận. Thay đổi hiện ở branch local `codex/portfolio-project-updates`, chưa publish.
