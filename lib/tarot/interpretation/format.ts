import type { KetQuaDienGiaiSau, DienGiaiDaDinhDang, MucDoDienGiai } from './types';

function taoVanBanDayDu(ketQua: KetQuaDienGiaiSau, mucDo: MucDoDienGiai): string {
  const nhan = mucDo === 'short' ? 'Tóm tắt nhanh' : mucDo === 'medium' ? 'Tóm tắt trọng tâm' : 'Kiến giải chi tiết';

  return `${nhan}: ${ketQua.diemSangCotLoi} ${ketQua.xungLucNoiTam} ${ketQua.tongKet.dieuCanTranh}`;
}

export function dinhDangDienGiai(
  ketQua: KetQuaDienGiaiSau,
  mucDo: MucDoDienGiai = 'deep',
): DienGiaiDaDinhDang {
  return {
    diemSangCotLoi: ketQua.diemSangCotLoi,
    xungLucNoiTam: ketQua.xungLucNoiTam,
    viecNenLam: ketQua.tongKet.viecNenLam,
    vanBanDayDu: taoVanBanDayDu(ketQua, mucDo),
  };
}
