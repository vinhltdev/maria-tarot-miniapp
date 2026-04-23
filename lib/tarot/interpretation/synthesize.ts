import type { DauVaoDienGiaiSau, KetQuaDienGiaiSau, DauVaoLaBai } from './types';

const tieuDeViTri: Record<'past' | 'present' | 'future', string> = {
  past: 'Quá khứ — Dấu ấn còn ảnh hưởng',
  present: 'Hiện tại — Tâm điểm cần xử lý',
  future: 'Tương lai — Hướng mở nếu giữ nhịp đúng',
};

function moTaTheoViTri(la: DauVaoLaBai): string {
  const trangThai = la.orientation === 'reversed' ? 'đang ở chiều ngược' : 'đang ở chiều xuôi';
  return `${la.card.name} ${trangThai}, gợi ý rằng ${la.yNghiaHieuLuc.toLowerCase()}.`;
}

function taoDiemSangCotLoi(baLa: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai]): string {
  const [, hienTai, tuongLai] = baLa;
  return `Điểm sáng cốt lõi của bạn nằm ở việc chuyển trọng tâm từ ${hienTai.card.name} sang hướng trưởng thành hơn theo tín hiệu của ${tuongLai.card.name}.`;
}

function taoXungLucNoiTam(baLa: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai]): string {
  const [quaKhu, , tuongLai] = baLa;
  const lucKeoLui = quaKhu.orientation === 'reversed' ? quaKhu.card.name : `${quaKhu.card.name} (thói quen cũ)`;
  const lucTienLen = tuongLai.orientation === 'upright' ? tuongLai.card.name : `${tuongLai.card.name} (bài học cần đối diện)`;

  return `Bạn đang giằng co giữa lực kéo lùi từ ${lucKeoLui} và nhu cầu tiến lên theo hướng ${lucTienLen}.`;
}

function taoDieuCanTranh(baLa: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai]): string {
  const [quaKhu, hienTai, tuongLai] = baLa;

  return `Điều cần tránh là tiếp tục phản ứng theo mô thức của ${quaKhu.card.name} mà bỏ qua bài học hiện tại từ ${hienTai.card.name}; nếu kéo dài, bạn dễ rơi vào thế bị động theo ${tuongLai.card.name}.`;
}

function taoViecNenLam(baLa: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai]): [string, string, string] {
  const [quaKhu, hienTai, tuongLai] = baLa;

  return [
    `[24h] Viết rõ một thói quen cũ gắn với ${quaKhu.card.name} mà bạn cần dừng ngay, rồi thay bằng một hành động nhỏ làm được trước tối nay.`,
    `[7 ngày] Dựa theo bài học từ ${hienTai.card.name}, duy trì một khung 15 phút mỗi ngày để giữ nhịp ổn định thay vì phản ứng cảm tính.`,
    `[30 ngày] Đặt một mốc kết quả theo hướng ${tuongLai.card.name}, chia thành 4 bước theo tuần và tự rà soát vào cuối mỗi tuần.`,
  ];
}

function tinhDoNhatQuan(baLa: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai]): number {
  const soLaNguoc = baLa.filter((la) => la.orientation === 'reversed').length;

  if (soLaNguoc === 0) return 90;
  if (soLaNguoc === 1) return 82;
  if (soLaNguoc === 2) return 76;
  return 72;
}

export function tongHopDienGiaiSau(dauVao: DauVaoDienGiaiSau): KetQuaDienGiaiSau {
  const baLa = dauVao.cards;

  return {
    spread: 'triple',
    diemSangCotLoi: taoDiemSangCotLoi(baLa),
    xungLucNoiTam: taoXungLucNoiTam(baLa),
    tongKet: {
      diemSangCotLoi: taoDiemSangCotLoi(baLa),
      dieuCanTranh: taoDieuCanTranh(baLa),
      viecNenLam: taoViecNenLam(baLa),
    },
    docTheoViTri: [
      {
        position: baLa[0].position,
        tieuDe: tieuDeViTri[baLa[0].position],
        dienGiai: moTaTheoViTri(baLa[0]),
      },
      {
        position: baLa[1].position,
        tieuDe: tieuDeViTri[baLa[1].position],
        dienGiai: moTaTheoViTri(baLa[1]),
      },
      {
        position: baLa[2].position,
        tieuDe: tieuDeViTri[baLa[2].position],
        dienGiai: moTaTheoViTri(baLa[2]),
      },
    ],
    doNhatQuan: tinhDoNhatQuan(baLa),
    daDungPhuongAnDuPhong: false,
  };
}
