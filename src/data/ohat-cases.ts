import type { OhatCategoryId, OhatScore } from '../types/ohat'
import type { Reference } from '../types/common'

export interface OhatCaseFinding {
  categoryId: OhatCategoryId
  observation: string // 看護師が観察した所見（日本語）
  expertScore: OhatScore
  expertRationale: string // なぜこのスコアか
  clinicalImplication: string // 臨床的意味
}

export interface OhatCase {
  id: string
  title: string
  patientProfile: string // 年齢・性別・主病・生活背景
  clinicalContext: string // 入院経過・ADL・食形態など
  findings: Record<OhatCategoryId, OhatCaseFinding>
  overallInterpretation: string // 全体像の解釈
  priorityActions: string[] // 優先して取るべきアクション
  references: Reference[]
}

export const OHAT_CASES: OhatCase[] = [
  {
    id: 'case1',
    title: '症例1：脳梗塞後の82歳男性',
    patientProfile: '82歳男性。右中大脳動脈領域の脳梗塞発症から10日目。右片麻痺・構音障害あり。発症前はADL自立。',
    clinicalContext:
      '入院後絶食7日 → 経鼻経管栄養開始 → 本日から嚥下訓練食開始予定。義歯は右上下の部分床義歯を使用していたが入院後は未装着。',
    findings: {
      lips: {
        categoryId: 'lips',
        observation:
          '上下口唇とも乾燥し皮がむけている。右口角に白い苔状付着あり、わずかに亀裂。出血・腫脹なし。',
        expertScore: 1,
        expertRationale:
          '乾燥・皮むけ・口角炎が見られるがびらん・水疱・出血はない。口角炎（カンジダ疑い）があるためスコア1。',
        clinicalImplication:
          '絶食+経管栄養で口唇閉鎖機会が激減→乾燥→口角炎進展のリスク。保湿＋口角観察強化。',
      },
      tongue: {
        categoryId: 'tongue',
        observation:
          '舌背中央に厚い白色〜黄色の舌苔付着、舌縁に軽度の発赤。潰瘍・腫瘤は触知せず。',
        expertScore: 1,
        expertRationale:
          '舌苔付着はあるが明らかな潰瘍や腫瘤はなく、色調変化も限定的。スコア1（歯ブラシや舌ブラシでの機械的清掃で改善可）。',
        clinicalImplication:
          '舌苔は細菌の温床。嚥下訓練食開始前に舌清掃で誤嚥性肺炎リスクを下げる。',
      },
      gums_mucosa: {
        categoryId: 'gums_mucosa',
        observation:
          '歯肉は全体にやや発赤・腫脹。ブラッシング時に点状出血あり。上顎粘膜に著変なし。',
        expertScore: 1,
        expertRationale:
          '歯肉炎症+点状出血はあるが、自然出血・膿瘍・広範な潰瘍はなくスコア1。',
        clinicalImplication:
          '歯肉炎は歯周病の入り口。日々のブラッシングと歯科衛生士介入で進行を止める。',
      },
      saliva: {
        categoryId: 'saliva',
        observation:
          '口腔内は乾燥し、粘膜がざらつく。唾液は粘稠で糸を引く。舌背に乾燥粘液が張り付いている。',
        expertScore: 2,
        expertRationale:
          '粘膜の赤み/乾燥、粘稠唾液、乾燥粘液の付着があり病的乾燥を示唆。スコア2。',
        clinicalImplication:
          '嚥下訓練開始前に保湿ジェルで口腔環境を整備。抗精神病薬・利尿薬の有無を薬剤師と確認。',
      },
      natural_teeth: {
        categoryId: 'natural_teeth',
        observation:
          '前歯部に比較的大きなう蝕（歯冠崩壊）1本、残根1本を認める。他は概ね健全。',
        expertScore: 2,
        expertRationale:
          '破折/残根を含むため臨床的に問題のある歯が存在し、感染源となる可能性が高い。スコア2。',
        clinicalImplication: '残根は痛みがなくても感染巣。歯科医師の緊急評価が必要。',
      },
      dentures: {
        categoryId: 'dentures',
        observation:
          '部分床義歯は家族が持参。プラスチック部分に歯石・食渣が付着し、ひび割れあり。現在未装着。',
        expertScore: 2,
        expertRationale:
          '義歯に明らかな破損とプラーク付着。未使用状態で咀嚼機能低下につながる。スコア2。',
        clinicalImplication:
          '嚥下訓練食に合わせて義歯の適合確認・修理が必須。歯科衛生士の専門的清掃も。',
      },
      oral_cleanliness: {
        categoryId: 'oral_cleanliness',
        observation:
          '歯頸部・臼歯部に厚いプラーク付着。歯間部に食渣。舌苔と合わせて口臭あり。',
        expertScore: 2,
        expertRationale:
          '複数領域に厚い歯垢・食渣付着があり、自浄作用低下が顕著。スコア2。',
        clinicalImplication:
          '誤嚥性肺炎の独立リスク因子。歯科衛生士による専門的口腔ケアが誤嚥性肺炎予防のコア（Yoneyama 2002）。',
      },
      dental_pain: {
        categoryId: 'dental_pain',
        observation:
          '本人は構音障害で「いたい」とは言わないが、ケア中に右前歯部を触れると顔をしかめ手を払う。',
        expertScore: 2,
        expertRationale:
          '言語化できないが非言語疼痛サインが明確。残根+う蝕が疼痛源の可能性大。スコア2。',
        clinicalImplication:
          '非言語的な疼痛サインを見逃さない。認知症・構音障害患者では特に重要（Delwel 2017）。',
      },
    },
    overallInterpretation:
      '入院と絶食による口腔環境悪化に加え、既存のう蝕/残根/義歯不適合が嚥下訓練の障害となっている典型例。合計スコアが高く、多職種介入が急務。',
    priorityActions: [
      '歯科医師に残根・う蝕の緊急評価を依頼',
      '歯科衛生士による専門的口腔ケア開始',
      '義歯の修理・調整を依頼し嚥下訓練に合わせて装着',
      '薬剤師に抗コリン作用薬の評価を相談',
      '非言語疼痛サインを看護計画に記録',
    ],
    references: [
      {
        id: 'yoneyama2002',
        authors: 'Yoneyama T, Yoshida M, Ohrui T, et al.',
        title: 'Oral care reduces pneumonia in older patients in nursing homes',
        journal: 'J Am Geriatr Soc',
        year: 2002,
        keyFinding: '専門的口腔ケアで誤嚥性肺炎発症率約40%減',
      },
      {
        id: 'matsunaga2025',
        authors: 'Matsunaga Y, et al.',
        title: 'Impact of OHAT-J on timing of dental intervention in stroke patients',
        journal: 'J Dent Sci (Japan)',
        year: 2025,
        keyFinding: 'OHAT導入で歯科介入までの日数が8日→2日に短縮',
      },
      {
        id: 'delwel2017',
        authors: 'Delwel S, et al.',
        title: 'Oral hygiene and oral health in older people with dementia',
        journal: 'J Oral Rehabil',
        year: 2017,
        keyFinding: '認知症患者の47%に未治療の歯科疼痛',
      },
    ],
  },
  {
    id: 'case2',
    title: '症例2：認知症（FAST 6）の78歳女性',
    patientProfile:
      '78歳女性。アルツハイマー型認知症 FAST 6。グループホーム入所中。常食だが食べこぼしが増えていると家族から報告。',
    clinicalContext:
      '口腔ケア介助を嫌がり逃げる日が増えている。本人は痛みの訴えなし。上下総義歯を使用していたが最近は装着拒否。体重が1ヶ月で2kg減少。',
    findings: {
      lips: {
        categoryId: 'lips',
        observation:
          '口唇はピンク色で湿潤。軽度の乾燥はあるが亀裂・びらんなし。',
        expertScore: 0,
        expertRationale:
          '色調・湿潤とも健全範囲。病的所見なし。スコア0。',
        clinicalImplication:
          '全身状態の比較的良い指標。ただし嚥下機能評価は別途必要。',
      },
      tongue: {
        categoryId: 'tongue',
        observation:
          '舌背は全体にピンク色だが、中央にやや白い舌苔。潰瘍・腫瘤・発赤なし。',
        expertScore: 0,
        expertRationale:
          '軽度の舌苔は生理的範囲。色調・形態に明らかな異常なし。スコア0。',
        clinicalImplication:
          '日常の清掃で十分維持可能。認知症患者では本人の協力度を見ながら。',
      },
      gums_mucosa: {
        categoryId: 'gums_mucosa',
        observation:
          '上顎歯肉に限局した発赤と軽度腫脹。ブラッシング時の出血あり。頬粘膜に著変なし。',
        expertScore: 1,
        expertRationale:
          '歯肉炎症+接触出血あるが自然出血・膿瘍なし。スコア1。',
        clinicalImplication: '義歯不装着期間の歯肉沈着増加が影響している可能性。',
      },
      saliva: {
        categoryId: 'saliva',
        observation:
          '口腔内は潤っているが唾液がやや粘稠。抗精神病薬（リスペリドン）服用中。',
        expertScore: 1,
        expertRationale:
          '粘稠性は上昇しているが粘膜の赤みや乾燥粘液付着は見られない。スコア1。',
        clinicalImplication:
          'リスペリドンの抗コリン作用が寄与している可能性。薬剤師と相談。',
      },
      natural_teeth: {
        categoryId: 'natural_teeth',
        observation: '上顎無歯顎（総義歯使用者）。下顎は6本の残存歯で動揺歯2本。',
        expertScore: 1,
        expertRationale:
          '動揺歯はあるが破折・残根・大きなう蝕はなくスコア1。',
        clinicalImplication: '動揺歯は誤嚥・脱落リスクのため歯科医師評価を。',
      },
      dentures: {
        categoryId: 'dentures',
        observation:
          '上下総義歯は家族が持参。義歯内面に歯石/食渣付着、ひび割れ1箇所。本人は「合わない」と言って拒否。',
        expertScore: 2,
        expertRationale:
          '義歯に破損+汚染+明らかな不適合（装着拒否）。スコア2。',
        clinicalImplication:
          '義歯不適合は咀嚼効率60%以上低下→低栄養。体重減少の一因の可能性大。歯科医師に義歯調整を依頼。',
      },
      oral_cleanliness: {
        categoryId: 'oral_cleanliness',
        observation:
          '残存歯の歯頸部・舌側に厚いプラーク付着。ケア拒否の日があり十分に清掃できていない。',
        expertScore: 2,
        expertRationale:
          '複数領域のプラーク付着が明らかで、ケア拒否による清掃不足。スコア2。',
        clinicalImplication:
          '認知症患者の口腔ケア拒否は誤嚥性肺炎リスク増大。短時間・柔軟な声かけと歯科衛生士介入が鍵。',
      },
      dental_pain: {
        categoryId: 'dental_pain',
        observation:
          '本人は痛みの訴えなし。しかしケア中に顔をしかめる・食事拒否あり・左側で噛まない。',
        expertScore: 2,
        expertRationale:
          '非言語サイン（表情・食事拒否・咀嚼側偏位）が複数。認知症では病的疼痛として扱う。スコア2。',
        clinicalImplication:
          '動揺歯や義歯不適合に由来する疼痛の可能性。歯科評価＋鎮痛薬の検討。',
      },
    },
    overallInterpretation:
      '「痛みを訴えない」は「痛みがない」ではない典型例。義歯不適合→咀嚼低下→体重減少→ケア拒否の悪循環。',
    priorityActions: [
      '歯科医師に義歯調整と動揺歯評価を緊急依頼',
      '薬剤師にリスペリドンの必要性と代替薬検討を相談',
      '管理栄養士に食形態一時変更（軟菜等）を依頼',
      '短時間・高頻度の口腔ケア戦略に切り替え',
      'BPSDとしての拒否か疼痛由来かを多職種で鑑別',
    ],
    references: [
      {
        id: 'delwel2017',
        authors: 'Delwel S, et al.',
        title: 'Oral hygiene and oral health in older people with dementia',
        journal: 'J Oral Rehabil',
        year: 2017,
        keyFinding: '認知症患者の47%に未治療の歯科疼痛',
      },
      {
        id: 'watanabe2017',
        authors: 'Watanabe Y, et al.',
        title: 'Association between oral health and frailty in elderly Japanese',
        journal: 'Gerodontology',
        year: 2017,
        keyFinding: '残存歯20本未満でフレイル発症リスク2.4倍',
      },
    ],
  },
  {
    id: 'case3',
    title: '症例3：健常に近い65歳女性（回復期）',
    patientProfile:
      '65歳女性。変形性膝関節症で人工膝関節置換術後7日目。ADL概ね自立、常食摂取、全身状態良好。',
    clinicalContext:
      '術後合併症なし。退院前の口腔スクリーニングを実施中。本人は歯磨きを毎食後と就寝前の計4回行っている。',
    findings: {
      lips: {
        categoryId: 'lips',
        observation: '滑らかでピンク色、湿潤。亀裂・びらん・出血なし。',
        expertScore: 0,
        expertRationale: '健全そのもの。スコア0。',
        clinicalImplication: '全身状態の良さを反映。変化があれば早期に察知。',
      },
      tongue: {
        categoryId: 'tongue',
        observation: '舌背ピンク色、薄い舌苔、舌縁に歯圧痕なし、潰瘍なし。',
        expertScore: 0,
        expertRationale: '健全範囲。スコア0。',
        clinicalImplication: '現状維持。',
      },
      gums_mucosa: {
        categoryId: 'gums_mucosa',
        observation:
          'プロービング時に軽度出血あり。歯肉の色調は概ね健全で腫脹目立たず。',
        expertScore: 1,
        expertRationale:
          '接触出血あり歯肉炎症の徴候。腫脹・自然出血はない。スコア1。',
        clinicalImplication:
          '歯周病予備軍。定期歯科受診と歯間清掃の強化指導を退院前に。',
      },
      saliva: {
        categoryId: 'saliva',
        observation: '湿潤、水様性唾液。口腔乾燥なし。',
        expertScore: 0,
        expertRationale: '健全。スコア0。',
        clinicalImplication: '現状維持。',
      },
      natural_teeth: {
        categoryId: 'natural_teeth',
        observation:
          '28本残存、う蝕1本（小さなもの）、破折・残根なし、動揺歯なし。',
        expertScore: 1,
        expertRationale: '小さなう蝕1本。破折/残根はなくスコア1。',
        clinicalImplication: '退院後に歯科で充填治療を受けるよう退院指導。',
      },
      dentures: {
        categoryId: 'dentures',
        observation: '義歯未使用（残存歯多数）。',
        expertScore: 0,
        expertRationale: '義歯使用なしでありスコア0。',
        clinicalImplication: '該当なし。',
      },
      oral_cleanliness: {
        categoryId: 'oral_cleanliness',
        observation: '歯頸部に軽度のプラーク付着。食渣は認めず。',
        expertScore: 1,
        expertRationale: '軽度のプラーク付着あり。スコア1。',
        clinicalImplication:
          '歯間ブラシ/フロスの併用指導で改善可能。歯科衛生士とのセルフケア強化。',
      },
      dental_pain: {
        categoryId: 'dental_pain',
        observation: '本人の自発的訴えなし。視診・触診で疼痛サインなし。',
        expertScore: 0,
        expertRationale: '疼痛サインなし。スコア0。',
        clinicalImplication: '現状維持。',
      },
    },
    overallInterpretation:
      '全身状態良好な症例でもOHATで「ゼロ」にはならないのが現実。小さなう蝕・軽度歯肉炎・軽度プラークは退院指導で改善できる余地。',
    priorityActions: [
      'う蝕に対して退院後の歯科受診を指導',
      '歯間ブラシ/フロスのセルフケア指導',
      '定期歯科健診の重要性を説明',
      '高血圧/糖尿病など全身疾患出現時の口腔影響を予告',
    ],
    references: [
      {
        id: 'chalmers2005',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FA, Carter KD',
        title: 'The Oral Health Assessment Tool - validity and reliability',
        journal: 'Aust Dent J',
        year: 2005,
        keyFinding: 'OHAT-Jの妥当性・信頼性検証の原典',
      },
    ],
  },
]
