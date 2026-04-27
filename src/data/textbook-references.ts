// 参考文献(本アプリで参照する教科書・専門誌)
// 各疾患ページで引用元として使用する

export interface TextbookReference {
  id: string
  authors: string
  title: string
  journal?: string
  publisher?: string
  year?: number
  pages?: string
  shortLabel: string
}

export const TEXTBOOK_REFERENCES: Record<string, TextbookReference> = {
  uchida_shisei: {
    id: 'uchida_shisei',
    authors: '森若 文雄(監修)、内田 学(編)',
    title: '姿勢から介入する摂食嚥下 — 脳卒中患者のリハビリテーション',
    publisher: 'メジカルビュー社',
    year: 2017,
    shortLabel: '森若・内田『姿勢から介入する摂食嚥下』',
  },
  uchida_shinkei: {
    id: 'uchida_shinkei',
    authors: '森若 文雄(監修)、内田 学(編)',
    title: '姿勢を意識した神経疾患患者の食べられるポジショニング',
    publisher: 'メジカルビュー社',
    year: 2019,
    shortLabel: '森若・内田『姿勢を意識した神経疾患患者の食べられるポジショニング』',
  },
  koyama_kuchi: {
    id: 'koyama_kuchi',
    authors: '小山 珠美(編)',
    title: '口から食べる幸せをサポートする包括的スキル — KTバランスチャートの活用と支援',
    publisher: '医学書院',
    year: 2015,
    shortLabel: '小山『口から食べる幸せをサポート』',
  },
  koyama_jissen1: {
    id: 'koyama_jissen1',
    authors: '小山 珠美・芳村 直美(監修)',
    title: '実践で身につく!摂食・嚥下障害へのアプローチ — 急性期から「食べたい」を支えるケアと技術 (Part 1)',
    publisher: '学研メディカル秀潤社',
    year: 2014,
    shortLabel: '小山・芳村『実践で身につく摂食・嚥下障害へのアプローチ』(Part 1)',
  },
  koyama_jissen2: {
    id: 'koyama_jissen2',
    authors: '小山 珠美・芳村 直美(監修)',
    title: '実践で身につく!摂食・嚥下障害へのアプローチ — 急性期から「食べたい」を支えるケアと技術 (Part 2)',
    publisher: '学研メディカル秀潤社',
    year: 2014,
    shortLabel: '小山・芳村『実践で身につく摂食・嚥下障害へのアプローチ』(Part 2)',
  },
  yamada_ninchisho: {
    id: 'yamada_ninchisho',
    authors: '山田 律子(北海道医療大学看護福祉学部教授)',
    title: '認知症高齢者の摂食嚥下障害への次の一手! - 最期まで食べる喜びを支えるために',
    journal: 'Monthly Book Medical Rehabilitation No.259',
    year: 2021,
    pages: '67-72',
    shortLabel: '山田『認知症高齢者の摂食嚥下障害への次の一手!』',
  },
  watanabe_shokuyoku: {
    id: 'watanabe_shokuyoku',
    authors: '渡辺 克哉、段 俊之、入瀬 俊憲、足江 浩、村田 咲泰子(医療法人社団勝谷会)',
    title: '食欲不振のアセスメント',
    journal: '看護技術 vol.62 No.10',
    year: 2016,
    pages: '22-25',
    shortLabel: '渡辺ほか『食欲不振のアセスメント』',
  },
  wakabayashi_koreisha: {
    id: 'wakabayashi_koreisha',
    authors: '若林 秀隆(編著)',
    title: '高齢者の摂食嚥下サポート — 老嚥・オーラルフレイル・サルコペニア・認知症',
    publisher: '新興医学出版社',
    year: 2017,
    shortLabel: '若林『高齢者の摂食嚥下サポート』',
  },
  takabatake_goen: {
    id: 'takabatake_goen',
    authors: '前田 圭介(著)、髙畠 英昭(編)',
    title: '誤嚥性肺炎の包括的アプローチ — 診断・治療から、栄養管理・呼吸リハ・嚥下リハ・口腔ケアまで',
    publisher: '医歯薬出版株式会社',
    year: 2021,
    shortLabel: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』',
  },
}

export type TextbookId = keyof typeof TEXTBOOK_REFERENCES

// 引用ヘルパー: ID とページ番号から短い引用文字列を生成
export function citeShort(id: TextbookId, pages?: string): string {
  const ref = TEXTBOOK_REFERENCES[id]
  if (!ref) return ''
  return pages ? `${ref.shortLabel} p.${pages}` : ref.shortLabel
}
