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
      correct: '正解です！義歯の不適合は歯科医師の専門領域です。OHAT導入施設では歯科介入までの日数が平均8日から2日に短縮されたという研究報告もあります（Matsunaga et al., 2025）。早期連携が患者アウトカムを変えます！',
      incorrect: '義歯の不適合は歯科医師が対応する問題です。食形態変更は対症療法にすぎず、義歯を使わないと咀嚼効率が60%以上低下します。根本原因への介入が重要です。',
    },
    explanation: '義歯の問題は歯科医師の専門領域です。適合調整・修理・新製を依頼します。OHAT-Jによる早期発見→早期歯科介入が重要です。',
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
      correct: '正解です！口腔内のプラーク1mgには約1億個の細菌が住んでいます。歯科衛生士による専門的口腔ケアで肺炎発症率が約40%減少するというエビデンスがあります（Yoneyama et al., 2002）。口腔ケアは「清潔ケア」ではなく「肺炎予防ケア」です！',
      incorrect: '口腔清掃不良の改善には、歯科衛生士による専門的口腔ケアとブラッシング指導が最も効果的です。研究では専門的口腔ケアで肺炎発症率が約40%減少しています。',
    },
    explanation: '歯科衛生士は口腔ケアの専門家で、プラーク除去・ブラッシング指導・口腔内の清浄化を行います。科学的根拠に基づく誤嚥性肺炎予防策です。',
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
      correct: '素晴らしい多職種連携の判断です！50種類以上の薬剤が口腔乾燥を引き起こす可能性があり、抗不安薬3剤併用は高リスクです。薬剤性口腔乾燥は投与開始1週間以内に発症し、中止後約2週間で回復します。原因を特定して対処する「修正可能なリスク因子」として最優先で取り組みましょう。',
      incorrect: '抗不安薬3剤服用中の口腔乾燥は、薬剤性を第一に疑います。薬剤師に確認し、減薬や代替薬の検討を依頼しましょう。薬剤性口腔乾燥は「修正可能なリスク因子」です。',
    },
    explanation: '薬剤性口腔乾燥は投与開始1週間以内に発症し、中止後約2週間で回復します。常用量でも起こり得るため、多剤併用の高齢者では常に疑う必要があります。',
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
      correct: '正解です！むせ＋湿性嗄声は咽頭期嚥下障害の二大徴候です。湿性嗄声は感度80%以上で喉頭侵入・誤嚥を検出できます（Warms & Richards, 2000）。言語聴覚士によるVE/VF検査で正確な嚥下機能評価が可能です。',
      incorrect: 'むせと湿性嗄声は咽頭期の嚥下障害を示唆する重要な臨床徴候です。言語聴覚士に嚥下機能評価（VE：嚥下内視鏡検査、VF：嚥下造影検査）を依頼しましょう。',
    },
    explanation: '湿性嗄声は咽頭・喉頭に分泌物や食物が貯留している徴候で、嚥下障害のベッドサイドスクリーニングとして高い感度を持ちます。',
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
      correct: '正解です！仙骨座り→頸部過伸展→嚥下障害の連鎖は、ポジショニング改善で劇的に改善できます。FASS（Nagano & Maeda, 2024）でも姿勢の確保が最も基本的な評価項目です。食形態変更は「的外れなケア計画」の典型例。原因に対処することが看護の専門性です！',
      incorrect: '仙骨座り→頸部過伸展は姿勢の問題であり、食形態変更ではなくポジショニング改善が根本的解決です。姿勢の問題を食形態のダウンで対応するのは「的外れなケア」の典型例です。理学療法士との連携が重要です。',
    },
    explanation: '仙骨座りによる頸部過伸展→嚥下機能低下は、姿勢調整で改善可能な問題です。原因に対する介入（ポジショニング）を選択し、対症療法（食形態変更）に逃げないことが重要です。',
  },
  {
    id: 'na-6',
    type: 'next_action',
    difficulty: 'beginner',
    prompt: '患者さんの口唇がスコア2（腫脹・潰瘍あり）で、食事中に痛みで顔をしかめています。まず相談すべきは？',
    options: [
      { id: 'a', text: '歯科医師に口唇の評価・治療を依頼', isCorrect: true },
      { id: 'b', text: '管理栄養士に液体食への変更を依頼', isCorrect: false },
      { id: 'c', text: '看護師間で経過観察を継続', isCorrect: false },
    ],
    correctAnswerIds: ['a'],
    narrativeFeedback: {
      correct: '正解です！口唇の腫脹・潰瘍は器質的な問題であり、歯科医師による診察が必要です。口唇ヘルペス、口角びらん、薬剤性の粘膜障害など原因の特定と治療が優先されます。食形態変更は原因治療と並行して検討するものです。',
      incorrect: '口唇の腫脹・潰瘍は歯科医師の診察が必要な器質的問題です。原因を特定しないまま食形態だけ変更しても根本的な解決にはなりません。',
    },
    explanation: '口唇のスコア2は潰瘍・腫脹・出血を含む病的状態です。歯科医師による原因の特定と治療が第一選択です。',
  },
  {
    id: 'na-7',
    type: 'next_action',
    difficulty: 'intermediate',
    prompt: '食事介助中、患者さんが食べ物を手で払いのけ、口を固く閉じています。認知症があり言語的コミュニケーションは困難です。最も考慮すべきことは？',
    options: [
      { id: 'a', text: '食事を中止し、口腔内の疼痛や不快感を確認する', isCorrect: true },
      { id: 'b', text: '食べたくないだけなので記録して報告する', isCorrect: false },
      { id: 'c', text: '好きな食べ物に変更して再度試みる', isCorrect: false },
    ],
    correctAnswerIds: ['a'],
    narrativeFeedback: {
      correct: '正解です！認知症患者の「食事拒否」の背景には、口腔内疼痛が隠れていることが多いです。Delwel et al.（2017）によると、認知症患者の47%が未治療の口腔疼痛を有しています。拒食＝嫌い、ではなく「痛いのかも」と疑う視点が重要です。',
      incorrect: '認知症患者の食事拒否は口腔内疼痛のサインである可能性があります。「食べたくない」のではなく「痛くて食べられない」のかもしれません。まずOHAT-Jで口腔内の状態を確認しましょう。',
    },
    explanation: '認知症患者の摂食拒否は多因子的ですが、口腔内疼痛は見落とされやすい原因の一つです。非言語的サインを読み取り、口腔内を確認する視点が重要です。',
  },
  {
    id: 'na-8',
    type: 'next_action',
    difficulty: 'advanced',
    prompt: 'OHAT-Jで複数のカテゴリが悪化しています：口唇1、舌2、唾液2、口腔清掃2、歯痛1。最も優先すべき対応の順番は？',
    options: [
      { id: 'a', text: '舌の治療→口腔清掃→唾液対策→口唇ケア→歯痛対応', isCorrect: false },
      { id: 'b', text: '歯痛対応（歯科紹介）→口腔清掃（衛生士）→唾液対策（薬剤師）', isCorrect: true },
      { id: 'c', text: '全て同時に各職種に依頼する', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '素晴らしい臨床判断です！疼痛は最優先（摂食自体を阻害）→口腔清掃（肺炎予防の緊急性）→唾液対策（修正可能な因子）の順番が理にかなっています。多職種連携でも優先順位をつけた「段階的アプローチ」が効果的です。舌の状態は口腔清掃と唾液改善に伴い改善する可能性があります。',
      incorrect: '複数の問題がある場合は優先順位が重要です。疼痛（摂食阻害の直接原因）→口腔清掃（誤嚥性肺炎リスク）→唾液（修正可能な因子）の順番が合理的です。全て同時に依頼すると各職種の対応が錯綜します。',
    },
    explanation: 'OHAT-Jで複数カテゴリが悪化している場合、疼痛→感染リスク→修正可能因子の優先順位で段階的に対応することが効果的な多職種連携につながります。',
  },
]
