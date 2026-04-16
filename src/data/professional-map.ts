import type { ProfessionalReferral } from '../types/common'

export const PROFESSIONAL_MAP: ProfessionalReferral[] = [
  { problem: '義歯不適合・破損', professional: '歯科医師', reason: '義歯の調整・修理・新製' },
  { problem: '口腔清掃不良', professional: '歯科衛生士', reason: '専門的口腔ケア・ブラッシング指導' },
  { problem: '口腔乾燥＋薬剤使用中', professional: '薬剤師', reason: '薬剤性口腔乾燥の確認・代替薬の検討' },
  { problem: '嚥下障害の疑い', professional: '言語聴覚士', reason: '嚥下機能評価（VE/VF）・嚥下訓練' },
  { problem: '摂食量低下', professional: '管理栄養士', reason: '食形態・栄養量の調整' },
  { problem: '不良姿勢', professional: '理学療法士', reason: 'ポジショニング指導・シーティング調整' },
  { problem: '食具操作困難', professional: '作業療法士', reason: '自助具選定・食事動作訓練・環境調整' },
  { problem: '急性変化・発熱', professional: '医師', reason: '誤嚥性肺炎の鑑別・治療方針の決定' },
]
