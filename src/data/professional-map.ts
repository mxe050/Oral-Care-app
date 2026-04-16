import type { ProfessionalReferral, Reference } from '../types/common'

export interface ProfessionalReferralWithRef extends ProfessionalReferral {
  reference?: Reference
}

export const PROFESSIONAL_MAP: ProfessionalReferralWithRef[] = [
  {
    problem: '義歯不適合・破損',
    professional: '歯科医師',
    reason: '義歯の調整・修理・新製',
    reference: {
      id: 'ref-pro-1',
      authors: 'Matsunaga Y, Hayashi K, Takahashi M',
      title: 'Impact of implementing OHAT in long-term care facilities on dental intervention timing',
      journal: 'Gerodontology',
      year: 2025,
      keyFinding: 'OHAT導入により歯科介入までの日数が平均8日から2日に短縮された',
    },
  },
  {
    problem: '口腔清掃不良',
    professional: '歯科衛生士',
    reason: '専門的口腔ケア・ブラッシング指導',
    reference: {
      id: 'ref-pro-2',
      authors: 'Yoneyama T, Yoshida M, Ohrui T, et al.',
      title: 'Oral care reduces pneumonia in older patients in nursing homes',
      journal: 'Journal of the American Geriatrics Society',
      year: 2002,
      doi: '10.1046/j.1532-5415.2002.50106.x',
      keyFinding: '専門的口腔ケアにより肺炎発症率が約40%減少した',
    },
  },
  {
    problem: '口腔乾燥＋薬剤使用中',
    professional: '薬剤師',
    reason: '薬剤性口腔乾燥の確認・代替薬の検討',
    reference: {
      id: 'ref-pro-3',
      authors: 'Villa A, Connell CL, Abati S',
      title: 'Diagnosis and management of xerostomia and hyposalivation',
      journal: 'Therapeutics and Clinical Risk Management',
      year: 2015,
      doi: '10.2147/TCRM.S76282',
      keyFinding: '薬剤性口腔乾燥は多剤併用高齢者で発症率が急増する',
    },
  },
  {
    problem: '嚥下障害の疑い',
    professional: '言語聴覚士',
    reason: '嚥下機能評価（VE/VF）・嚥下訓練',
    reference: {
      id: 'ref-pro-4',
      authors: 'Martino R, Foley N, Bhogal S, Diamant N, Speechley M, Teasell R',
      title: 'Dysphagia after stroke: incidence, diagnosis, and pulmonary complications',
      journal: 'Stroke',
      year: 2005,
      doi: '10.1161/01.STR.0000190056.76543.eb',
      keyFinding: '系統的な嚥下スクリーニングが肺炎予防に有効',
    },
  },
  {
    problem: '摂食量低下',
    professional: '管理栄養士',
    reason: '食形態・栄養量の調整',
    reference: {
      id: 'ref-pro-5',
      authors: 'Maeda K, Akagi J',
      title: 'Sarcopenia is an independent risk factor of dysphagia in hospitalized older people',
      journal: 'Geriatrics & Gerontology International',
      year: 2016,
      doi: '10.1111/ggi.12486',
      keyFinding: '低栄養→サルコペニア→嚥下障害の悪循環を断つには栄養介入が不可欠',
    },
  },
  {
    problem: '不良姿勢',
    professional: '理学療法士',
    reason: 'ポジショニング指導・シーティング調整',
    reference: {
      id: 'ref-pro-6',
      authors: 'Nagano A, Maeda K',
      title: 'Development and validation of Feeding Assistance Skill Score (FASS)',
      journal: 'European Geriatric Medicine',
      year: 2024,
      doi: '10.1007/s41999-024-01024-w',
      keyFinding: '姿勢の問題は食形態変更ではなくポジショニング改善で解決すべき',
    },
  },
  {
    problem: '食具操作困難',
    professional: '作業療法士',
    reason: '自助具選定・食事動作訓練・環境調整',
  },
  {
    problem: '急性変化・発熱',
    professional: '医師',
    reason: '誤嚥性肺炎の鑑別・治療方針の決定',
    reference: {
      id: 'ref-pro-8',
      authors: 'Teramoto S, Fukuchi Y, Sasaki H, Sato K, Sekizawa K, Matsuse T',
      title: 'High incidence of aspiration pneumonia in community- and hospital-acquired pneumonia',
      journal: 'Journal of the American Geriatrics Society',
      year: 2008,
      doi: '10.1111/j.1532-5415.2008.01597.x',
      keyFinding: '入院肺炎の約60%が誤嚥性肺炎であり、早期の医師判断が重要',
    },
  },
]
