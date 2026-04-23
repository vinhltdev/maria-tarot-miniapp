# Deep Interpretation Architecture Plan (Phase 1)

Cập nhật: 2026-04-22  
Repo: `maria-tarot-miniapp`  
Scope: Nâng cấp phần triple spread từ template “Tổng quan trải bài” thành engine kiến giải nhiều tầng, bám theo kiến trúc hiện tại (`app/page.tsx`, `lib/tarot/*`).

---

## Spec: Deep Triple-Spread Interpretation

### Scope
- Chỉ áp dụng cho mode `triple` (Past / Present / Future).
- Input là 3 lá đã rút trong UI hiện tại (đã có `isReversed` từng lá).
- Output là bản kiến giải sâu có cấu trúc, dùng được ngay để render UI.
- Không thay đổi cơ chế draw card hiện tại; chỉ thêm interpretation layer.

### Requirements
- Có data contract rõ cho thư viện kiến giải sâu (input/output schema TypeScript).
- Có pipeline mapping 3 lá -> narrative engine nhiều tầng.
- Có rules synthesis cụ thể: **chủ đề chính, xung đột nội tâm, cảnh báo, hành động cụ thể**.
- Có guardrails chất lượng để tránh văn bản chung chung/mâu thuẫn.
- Có fallback strategy khi thiếu field hoặc source lỗi.

### Acceptance Criteria
- [ ] Triple spread trả về object `DeepInterpretationResult` hợp lệ cho mọi tổ hợp 3 lá.
- [ ] Output luôn có đủ 4 khối: `mainTheme`, `innerConflict`, `warning`, `actions`.
- [ ] Nội dung tham chiếu trực tiếp cả 3 vị trí (past/present/future), không bỏ sót lá.
- [ ] Không có khuyến nghị mâu thuẫn trực tiếp trong cùng kết quả.
- [ ] Nếu thư viện sâu lỗi/thiếu field, hệ thống fallback an toàn và vẫn render được.
