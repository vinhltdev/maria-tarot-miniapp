import type { DeepInterpretationInput, DeepInterpretationResult, SpreadCardInput } from './types';

const positionTitle: Record<SpreadCardInput['position'], string> = {
  past: 'Quá khứ – Dấu ấn còn ảnh hưởng',
  present: 'Hiện tại – Trục năng lượng chính',
  future: 'Tương lai – Hướng chuyển động kế tiếp',
};

function makePositionInterpretation(item: SpreadCardInput): string {
  const orientationText = item.orientation === 'reversed' ? 'đang bị nghẽn' : 'đang mở';
  return `${item.card.name} tại vị trí ${item.position} cho thấy năng lượng ${orientationText}: ${item.effectiveMeaning}`;
}

function buildMainTheme(cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput]): string {
  const [past, present, future] = cards;
  return `Chủ đề: Bạn đang chuyển từ quán tính của ${past.card.name} sang trọng tâm ${present.card.name}, và quỹ đạo ${future.card.name} sẽ rõ hơn khi bạn hành động có chủ đích.`;
}

function buildChallenge(cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput]): string {
  const [past, present, future] = cards;
  const pullBack = past.orientation === 'reversed' ? past.card.name : `${past.card.name} (thói quen cũ)`;
  const moveForward = future.orientation === 'upright' ? future.card.name : `${present.card.name} (điều chỉnh hiện tại)`;
  return `Bạn đang giằng co giữa lực kéo lùi từ ${pullBack} và nhu cầu tiến tới theo tín hiệu của ${moveForward}.`;
}

function buildWarning(cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput]): string {
  const [past, present, future] = cards;
  return `Nếu bạn tiếp tục phản ứng theo mô thức của ${past.card.name} mà bỏ qua bài học hiện tại từ ${present.card.name}, rủi ro dễ xảy ra là kết quả tương lai của ${future.card.name} sẽ đến trong trạng thái bị động.`;
}

function buildActions(cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput]): [string, string, string] {
  const [past, present, future] = cards;
  return [
    `[24h] Viết ra 1 hành vi cũ liên quan tới ${past.card.name} mà bạn cần dừng ngay, và chọn 1 thay thế cụ thể trong ngày hôm nay.`,
    `[7d] Dựa trên ${present.card.name}, thiết lập một nhịp thực hành 15 phút mỗi ngày để củng cố hướng đi hiện tại thay vì phản ứng cảm tính.`,
    `[30d] Đặt một mốc kết quả theo tinh thần của ${future.card.name}, chia thành 4 bước tuần và tự review vào cuối mỗi tuần.`,
  ];
}

function computeCoherenceScore(cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput]): number {
  const reversedCount = cards.filter((c) => c.orientation === 'reversed').length;
  if (reversedCount === 0) return 90;
  if (reversedCount === 1) return 82;
  if (reversedCount === 2) return 76;
  return 72;
}

export function synthesizeDeepInterpretation(input: DeepInterpretationInput): DeepInterpretationResult {
  const cards = input.cards;

  return {
    spread: 'triple',
    insight: buildMainTheme(cards),
    challenge: buildChallenge(cards),
    summary: {
      mainTheme: buildMainTheme(cards),
      warning: buildWarning(cards),
      actions: buildActions(cards),
    },
    positionReadings: [
      { position: cards[0].position, title: positionTitle[cards[0].position], interpretation: makePositionInterpretation(cards[0]) },
      { position: cards[1].position, title: positionTitle[cards[1].position], interpretation: makePositionInterpretation(cards[1]) },
      { position: cards[2].position, title: positionTitle[cards[2].position], interpretation: makePositionInterpretation(cards[2]) },
    ],
    coherenceScore: computeCoherenceScore(cards),
    usedFallback: false,
  };
}
