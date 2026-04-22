# Deep Interpretation Architecture Plan (Phase 1)

Cập nhật: 2026-04-22  
Repo: `maria-tarot-miniapp`

## Scope
- Áp dụng cho triple spread (past/present/future).
- Input là 3 lá đã rút + orientation.
- Output là kiến giải có cấu trúc để render UI.

## Data Contract
- Input chuẩn hóa: `SpreadCardInput[]` gồm vị trí, card, orientation, effectiveMeaning.
- Output chuẩn: `DeepInterpretationResult` gồm:
  - `insight`
  - `challenge`
  - `summary.warning`
  - `summary.actions` (3 items)
  - `positionReadings`
  - `coherenceScore`

## Narrative Engine Pipeline
1. Normalize input.
2. Per-card reading theo từng vị trí.
3. Cross-card synthesis (core insight + shadow/challenge + warning).
4. Action layer theo timeframe 24h/7d/30d.
5. Quality guardrails (anti-generic/anti-contradiction/structural).

## Guardrails chính
- Không output generic mơ hồ.
- Không mâu thuẫn nội dung giữa warning và action.
- Luôn có 3 actions, mỗi action bắt đầu bằng động từ và có timeframe.

## Fallback Strategy
- Nếu provider sâu lỗi/thiếu field -> fallback sang rule-based synthesizer.
- Vẫn trả output đầy đủ schema để UI không vỡ.

## Acceptance
- Triple spread luôn có output nhiều tầng, không chỉ ghép tên lá.
- Có đủ block Insight/Cảnh báo/Hành động.
- Build/lint/typecheck pass.
