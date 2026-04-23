import type { TarotCard } from '@/lib/tarot/types';

export type ViTriTraiBai = 'past' | 'present' | 'future';
export type ChieuLaBai = 'upright' | 'reversed';
export type MucDoDienGiai = 'short' | 'medium' | 'deep';

export interface DauVaoLaBai {
  position: ViTriTraiBai;
  card: TarotCard;
  orientation: ChieuLaBai;
  yNghiaHieuLuc: string;
}

export interface DauVaoDienGiaiSau {
  spread: 'triple';
  cards: [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai];
  locale: 'vi';
}

export interface DocTheoViTri {
  position: ViTriTraiBai;
  tieuDe: string;
  dienGiai: string;
}

export interface TongKetDienGiai {
  diemSangCotLoi: string;
  dieuCanTranh: string;
  viecNenLam: [string, string, string];
}

export interface KetQuaDienGiaiSau {
  spread: 'triple';
  diemSangCotLoi: string;
  xungLucNoiTam: string;
  tongKet: TongKetDienGiai;
  docTheoViTri: [DocTheoViTri, DocTheoViTri, DocTheoViTri];
  doNhatQuan: number;
  daDungPhuongAnDuPhong: boolean;
}

export interface DienGiaiDaDinhDang {
  diemSangCotLoi: string;
  xungLucNoiTam: string;
  viecNenLam: [string, string, string];
  vanBanDayDu: string;
}
