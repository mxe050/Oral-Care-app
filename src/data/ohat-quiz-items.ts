import type { QuizQuestion } from '../types/quiz'

export const OHAT_QUIZ_ITEMS: QuizQuestion[] = [
  // === 初級：典型例 ===
  {
    id: 'ohat-b-lips-1',
    type: 'ohat_photo',
    difficulty: 'beginner',
    categoryId: 'lips',
    prompt: '口唇が乾燥してひび割れが見られます。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: true },
      { id: 'c', text: '2（病的）', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: 'その通りです。乾燥やひび割れはスコア1です。この気づきが口唇ケアの早期介入につながります。',
      incorrect: '乾燥やひび割れはスコア1（やや不良）に該当します。腫脹・潰瘍・出血がある場合がスコア2です。',
    },
    explanation: 'OHAT-Jの口唇カテゴリでは、滑らかで湿潤＝0、乾燥・ひび割れ＝1、腫脹・潰瘍・出血＝2と判定します。',
  },
  {
    id: 'ohat-b-tongue-1',
    type: 'ohat_photo',
    difficulty: 'beginner',
    categoryId: 'tongue',
    prompt: '舌が正常なピンク色で湿潤しており、乳頭が確認できます。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: true },
      { id: 'b', text: '1（やや不良）', isCorrect: false },
      { id: 'c', text: '2（病的）', isCorrect: false },
    ],
    correctAnswerIds: ['a'],
    narrativeFeedback: {
      correct: '正解です。正常な舌の状態を正しく判定できています。',
      incorrect: 'ピンク色で湿潤、乳頭ありは正常所見です。スコア0（健全）が正解です。',
    },
    explanation: '正常な舌はピンク色で湿潤しており、舌乳頭が確認できます。舌苔や赤みが強い場合はスコア1です。',
  },
  {
    id: 'ohat-b-saliva-1',
    type: 'ohat_photo',
    difficulty: 'beginner',
    categoryId: 'saliva',
    prompt: '口腔内が赤く乾燥しており、唾液がほぼ確認できません。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: false },
      { id: 'c', text: '2（病的）', isCorrect: true },
    ],
    correctAnswerIds: ['c'],
    narrativeFeedback: {
      correct: '正解です。重度の口腔乾燥は嚥下機能に直結します。薬剤の影響も確認しましょう。',
      incorrect: '赤く乾燥し唾液がほぼない状態はスコア2（病的）です。薬剤性の口腔乾燥も疑いましょう。',
    },
    explanation: '唾液がほぼなく口腔粘膜が赤く乾燥している場合はスコア2です。口腔乾燥を引き起こす薬剤（抗精神病薬・抗不安薬等）の確認も重要です。',
  },
  {
    id: 'ohat-b-cleanliness-1',
    type: 'ohat_photo',
    difficulty: 'beginner',
    categoryId: 'oral_cleanliness',
    prompt: '口腔内・義歯の大部分に食物残渣と歯石があり、口臭も感じられます。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: false },
      { id: 'c', text: '2（病的）', isCorrect: true },
    ],
    correctAnswerIds: ['c'],
    narrativeFeedback: {
      correct: '正解です。この状態は誤嚥性肺炎の高リスクです。早急な口腔ケア介入が必要です。',
      incorrect: '大部分の食物残渣・歯石＋口臭はスコア2です。口腔内細菌の増殖→誤嚥性肺炎リスクに直結します。',
    },
    explanation: '口腔清掃カテゴリでは、清潔＝0、一部に残渣＝1、大部分に残渣＋口臭＝2と判定します。',
  },
  // === 中級：境界例 ===
  {
    id: 'ohat-i-gums-1',
    type: 'ohat_photo',
    difficulty: 'intermediate',
    categoryId: 'gums_mucosa',
    prompt: '義歯の下の粘膜に赤みが見られますが、出血や潰瘍はありません。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: true },
      { id: 'c', text: '2（病的）', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: 'よく判断できました。義歯下のレッドスポットはスコア1です。義歯の適合確認を歯科医師に依頼しましょう。',
      incorrect: '義歯下のレッドスポット（赤み）は出血がなくてもスコア1です。義歯の不適合が原因の可能性があります。',
    },
    explanation: 'レッドスポット（義歯下の赤み）は、浮腫を伴う発赤に分類されスコア1です。出血・腫脹・潰瘍がある場合はスコア2になります。',
  },
  {
    id: 'ohat-i-teeth-1',
    type: 'ohat_photo',
    difficulty: 'intermediate',
    categoryId: 'natural_teeth',
    prompt: '残存歯に2本のう蝕と1本の破折が確認できます。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: true },
      { id: 'c', text: '2（病的）', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '正解です。3本以下のう蝕・破折はスコア1です。数の基準を覚えておきましょう。',
      incorrect: '3本以下のう蝕・破折・欠損はスコア1（やや不良）です。4本以上になるとスコア2になります。',
    },
    explanation: '残存歯カテゴリのポイント：3本以下＝スコア1、4本以上＝スコア2という数的基準があります。',
  },
  {
    id: 'ohat-i-dentures-1',
    type: 'ohat_photo',
    difficulty: 'intermediate',
    categoryId: 'dentures',
    prompt: '患者さんは義歯を持っていますが、1日に1〜2時間しか使用しておらず、少しゆるいとのことです。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: true },
      { id: 'c', text: '2（病的）', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '正解です。使用時間が短い・ゆるい義歯はスコア1です。義歯の不適合は咀嚼効率を低下させます。',
      incorrect: '1日1〜2時間の使用またはゆるい義歯はスコア1です。完全に未使用がスコア2になります。',
    },
    explanation: '義歯カテゴリ：日常的使用・適合良好＝0、短時間使用・ゆるい＝1、未使用・適合不良＝2です。',
  },
  // === 上級：複合所見 ===
  {
    id: 'ohat-a-pain-1',
    type: 'ohat_photo',
    difficulty: 'advanced',
    categoryId: 'dental_pain',
    prompt: '認知症の患者さんが食事中に顔をしかめ、手で口元を押さえる仕草を繰り返しています。言語でのコミュニケーションは困難です。このスコアは？',
    options: [
      { id: 'a', text: '0（健全）', isCorrect: false },
      { id: 'b', text: '1（やや不良）', isCorrect: false },
      { id: 'c', text: '2（病的）', isCorrect: true },
    ],
    correctAnswerIds: ['c'],
    narrativeFeedback: {
      correct: '素晴らしい判断です。非言語的な疼痛徴候（顔しかめ・口元を押さえる）は「身体的徴候あり」としてスコア2です。',
      incorrect: '認知症で言語表現が困難な場合、非言語的徴候で判断します。顔しかめ・口元を押さえる仕草は身体的徴候＝スコア2です。',
    },
    explanation: '歯痛カテゴリでは、疼痛の「言動」はスコア1、「身体的徴候」はスコア2です。認知症患者では非言語的サインの観察が特に重要です。',
  },
  {
    id: 'ohat-a-complex-1',
    type: 'ohat_photo',
    difficulty: 'advanced',
    categoryId: 'saliva',
    prompt: '抗精神病薬を服用中の患者さんの口腔内がべたつき、唾液がやや少ない状態です。このスコアは？そして次に確認すべきことは？',
    options: [
      { id: 'a', text: '0（健全）—問題なし', isCorrect: false },
      { id: 'b', text: '1（やや不良）—薬剤師に薬剤性口腔乾燥の確認を依頼', isCorrect: true },
      { id: 'c', text: '2（病的）—歯科医師に緊急紹介', isCorrect: false },
    ],
    correctAnswerIds: ['b'],
    narrativeFeedback: {
      correct: '正解です。べたつき・唾液減少はスコア1で、抗精神病薬の服用歴から薬剤性口腔乾燥を疑い、薬剤師への確認が適切な次のアクションです。',
      incorrect: 'べたつきと唾液減少はスコア1です。さらに抗精神病薬の服用歴があるため、薬剤性の口腔乾燥を疑い薬剤師に確認を依頼するのが適切です。',
    },
    explanation: '唾液カテゴリの評価では、薬剤（抗精神病薬・抗不安薬等）の影響も同時に考慮します。発症は投与開始1週間以内、中止後約2週間で回復します。',
  },
]
