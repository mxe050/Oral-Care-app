import type { QuizQuestion } from '../types/quiz'

export const NEXT_ACTION_QUIZ: QuizQuestion[] = [
  {
    id: 'na-1',
    type: 'next_action',
    difficulty: 'beginner',
    prompt: 'OHAT-Jで義歯カテゴリがスコア2（適合不良）でした。最も適切な対応は？',
    options: [
      { id: 'a', text: '歯科医師に義歯の調整・修理を依頼', isCorrect: true },
      { id: 'b', text: '管理栄養士に食形態の変更を依頼', isCorrect: false },
      { id: 'c', text: '経過観察する', isCorrect: false },
    ],
    correctAnswerIds: ['a'],
    narrativeFeedback: {
      correct: '正解です。義歯の不適合は歯科医師への紹介が第一選択です。適切な連携先を判断できています。',
      incorrect: '義歯の不適合は歯科医師が対応する問題です。食形態変更は対症療法にすぎません。',
    },
    explanation: '義歯の問題は歯科医師の専門領域です。適合調整・修理・新製を依頼します。',
  },
  {
    id: 'na-2',
    type: 'next_action',
    difficulty: 'beginner',
    prompt: 'OHAT-Jで口腔清掃カテゴリがスコア2（大量の残渣＋口臭）でした。まず相談すべき職種は？',
    options: [
      { id: 'a', text: '医師', isCorrect: false },
      { id: 'b', text: '歯科衛生士', isCorrect: true },
      { id: 'c', text: '薬剤師', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '正解です。口腔清掃の問題は歯科衛生士による専門的口腔ケアが必要です。',
      incorrect: '口腔清掃不良の改善には、歯科衛生士による専門的口腔ケアとブラッシング指導が最も効果的です。',
    },
    explanation: '歯科衛生士は口腔ケアの専門家で、プラーク除去・ブラッシング指導・口腔内の清浄化を行います。',
  },
  {
    id: 'na-3',
    type: 'next_action',
    difficulty: 'intermediate',
    prompt: 'OHAT-Jで唾液カテゴリがスコア2で、患者さんは抗不安薬を3剤服用中です。まず確認すべきことは？',
    options: [
      { id: 'a', text: '歯科医師に口腔内の器質的問題を確認してもらう', isCorrect: false },
      { id: 'b', text: '薬剤師に薬剤性口腔乾燥の可能性を確認する', isCorrect: true },
      { id: 'c', text: '言語聴覚士に嚥下機能を評価してもらう', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '素晴らしい判断です。抗不安薬は口腔乾燥の原因となります。薬剤師と連携して減薬や代替薬の検討が重要です。',
      incorrect: '抗不安薬3剤服用中の口腔乾燥は、薬剤性を第一に疑います。薬剤師に確認し、減薬や代替薬の検討を依頼しましょう。',
    },
    explanation: '薬剤性口腔乾燥は投与開始1週間以内に発症し、中止後約2週間で回復します。常用量でも起こり得ます。',
  },
  {
    id: 'na-4',
    type: 'next_action',
    difficulty: 'intermediate',
    prompt: '食事中にむせが頻繁に見られ、食後に湿性嗄声が確認されます。どの職種に相談すべきですか？',
    options: [
      { id: 'a', text: '管理栄養士', isCorrect: false },
      { id: 'b', text: '理学療法士', isCorrect: false },
      { id: 'c', text: '言語聴覚士', isCorrect: true },
    ],
    correctAnswerIds: ['c'],
    narrativeFeedback: {
      correct: '正解です。むせと湿性嗄声は嚥下障害の典型的徴候です。言語聴覚士による嚥下機能評価（VE/VF）が必要です。',
      incorrect: 'むせと湿性嗄声は咽頭期の嚥下障害を示唆します。言語聴覚士に嚥下機能評価を依頼しましょう。',
    },
    explanation: '湿性嗄声は咽頭・喉頭に分泌物が貯留している徴候で、咽頭期の嚥下障害を強く示唆します。',
  },
  {
    id: 'na-5',
    type: 'next_action',
    difficulty: 'advanced',
    prompt: '車椅子で食事する患者さんが仙骨座りになっており、頸部が過伸展しています。食事中のむせも増えています。最も適切な対応は？',
    options: [
      { id: 'a', text: '理学療法士にポジショニングを相談する', isCorrect: true },
      { id: 'b', text: '食形態をペースト食に変更する', isCorrect: false },
      { id: 'c', text: '食事を中止して医師に報告する', isCorrect: false },
    ],
    correctAnswerIds: ['a'],
    narrativeFeedback: {
      correct: '正解です。仙骨座り→頸部過伸展→嚥下障害の連鎖は、ポジショニング改善で大きく改善できます。姿勢の問題を食形態変更で代替するのは「的外れなケア」です。',
      incorrect: '仙骨座り→頸部過伸展は姿勢の問題であり、食形態変更ではなくポジショニング改善が根本的解決です。理学療法士との連携が重要です。',
    },
    explanation: '仙骨座りによる頸部過伸展→嚥下機能低下は、姿勢調整で改善可能な問題です。食形態のダウンは対症療法にすぎず、「的外れなケア計画」の典型例です。',
  },
]
