import guideRaw from './appetite-loss-guide.txt?raw'

export type GuideQuestion = {
  id: string
  number: number
  title: string
  answer: string
  partNumber: number
  partTitle: string
  sectionTitle?: string
}

export type GuidePart = {
  id: string
  number: number
  title: string
  questions: GuideQuestion[]
}

export type GuideSupplement = {
  id: string
  title: string
  body: string
}

const normalize = (value: string) => value.replace(/\r\n?/g, '\n')

const medicalQuestionTitles: Partial<Record<number, string>> = {
  57: '環境調整は何から試しますか',
  59: '食事姿勢はどう整えますか',
  151: '車椅子のフットサポートはどう調整しますか',
  152: '車椅子の座面が高く、足が床に届かない場合は',
  153: '座面が低い・沈む場合はどうしますか',
  157: '頸部の角度はどう決めますか',
  158: 'リクライニングやギャッチアップの角度はどう決めますか',
}

const medicalPartTitles: Partial<Record<number, string>> = {
  3: '第3部　環境調整——本人に合う条件を探す',
}

const medicalAnswerOverrides: Partial<Record<number, string>> = {
  22: `全介助へ切り替える判断を、**摂取割合だけで決めることはできません。**食具を持つ、すくう、口へ運ぶ、咀嚼・嚥下する各段階の能力、疲労、覚醒、安全性、本人の希望を確認します。

まずは本人が困っている部分だけを補います。見守り、短い声かけ、食具の準備、部分介助などから選び、本人が受け入れる最小限の支援にします。hand over hand も全員に行う標準手技ではなく、本人が嫌がる、腕に力が入る、手を引く場合は直ちに中止します。

摂取不足が続くときは、割合だけでなく体重変化、脱水、病気、薬、嚥下、食事環境を含めて医師・管理栄養士・言語聴覚士などと再評価します。自力摂取を保つ練習が役立つ人もいますが、方法と期間は個別に決めます。`,
  26: `拒否ではなく、口から喉へ送り込む段階の障害、口腔乾燥、疲労、注意のそれ、覚醒不良などが考えられます。まず食事を急がず、口腔内の残留、覚醒、呼吸、姿勢を確認します。

**残っている食べ物を水分や次の一口で流し込まないでください。**喉への接触、冷水・冷たいスプーンなどの刺激、下顎の支持は全員に安全な手技ではありません。繰り返す場合は食事を中断し、医師・歯科医師・言語聴覚士などへ嚥下評価を依頼します。

食後も口腔内を確認します。むせ、湿った声、息苦しさ、発熱、反復する肺炎があるときは、意欲の問題と決めつけず早めに医療者へ相談してください。食形態やとろみは評価に基づいて個別に決めます。`,
  57: `**全員に最も効く一つの環境調整は分かっていません。**環境・行動介入の研究は小規模で、効果の確実性も限定的です。

見えにくさが疑われる人では、食べ物・食器・テーブルの色や明るさの差をつける工夫を試せます。赤い食器で摂取量が増えた研究は対象9名の小規模研究で、後続研究の結果も一貫していません。「赤い皿なら一定割合増える」とは一般化できません。模様が幻視や混乱につながる人では、無地の食器を選びます。

テレビや騒音を減らす、照明、席、同席者、食器を一度に一つだけ変え、本人の表情・摂取量・疲労を記録します。静かな環境が不安を強める人もいるため、その人の反応で続けるか判断します。`,
  59: `**安全な姿勢は、嚥下機能、覚醒、呼吸、麻痺、拘縮、円背、痛み、使用する椅子によって異なります。**全員に同じ角度や顎引きを指示しません。

基本は、骨盤と体幹が安定し、足部が安全に支持され、食物を見て無理なく手を使える状態です。頸部を強く曲げたり反らしたりせず、本人が呼吸しやすい位置を確認します。むせ、湿った声、口腔内残留、疲労がある場合は、医師・言語聴覚士・理学療法士・作業療法士などの評価を受けます。

顎引き姿勢やリクライニングは万人向けではありません。食事中に姿勢が崩れる場合は介助を続けず、安全を確認して座り直すか中断します。`,
  60: `居室か食堂か、独りか共食かに一律の正解はありません。会話や同席で食べやすくなる人もいれば、刺激が多いと注意がそれたり不安が強くなったりする人もいます。時間帯、席、同席者を一つずつ変え、その人の反応で選びます。

一品ずつの提示も選択肢ですが、全員に必要な方法ではありません。少ない量に見せることで安心する人、次々に出されることで不安になる人の両方がいます。

Protected Mealtimes は、検査・処置・回診を食事時間に重ねない運用です。単独で栄養状態を改善するという根拠の確実性は非常に低いため、導入する場合も、必要な介助者が食事場面で本人に合わせて関われるかを併せて評価します。`,
  150: `車椅子で食べること自体が悪いわけではありません。転倒の危険、姿勢保持能力、疲労を踏まえ、**本人に合うよう調整された安全な座位**を選びます。普通の椅子へ無理に移す必要はありません。

車椅子では、骨盤・体幹・足部が安定し、左右への傾きや前ずれがないかを確認します。最大舌圧の研究結果だけで誤嚥の安全性を判断することはできません。むせや疲労がある人、姿勢が崩れやすい人は、理学療法士・作業療法士・言語聴覚士などと座位と嚥下を一緒に評価します。

同じ姿勢を長時間続ける負担にも配慮し、食事時間と除圧、座り直しの必要性を個別に決めます。`,
  151: `**フットサポートを一律に外す必要はありません。**車椅子の種類、座面高、下肢の長さ、麻痺・拘縮、移乗方法に合わせて、足部が安定して支持される位置を選びます。適切に調整されたフットサポートが安全な場合もあります。

食事中だけ外す場合でも、外した部品や足台が転倒・つまずき・移乗事故の原因になり得ます。本人や介助者だけで変更せず、看護師、理学療法士、作業療法士などと確認し、毎回同じ安全な設定を再現できるよう記録します。

膝・足関節を必ず90度にする、足底全面を必ず床につける、といった固定基準ではなく、骨盤と体幹の安定、痛み、皮膚への圧、呼吸、食べやすさを総合して決めます。`,
  152: `足が床に届かない場合は、**荷重しても動かず、滑らず、転倒や移乗を妨げない足部支持**を検討します。専用の調整可能な足台や、適合するフットサポートが基本です。

木箱や重ねたタオルなどの即席物品は、ずれ・沈み込み・つまずきの原因になるため、安定性を確認できない状態では使いません。車椅子の座面高そのものが合っていない場合もあるので、理学療法士・作業療法士や福祉用具担当者へ調整を依頼します。

調整後は骨盤の傾き、足部の圧、痛み、ずれ、食事中の疲労を確認します。`,
  153: `座面が沈む、膝が上がる、骨盤が後ろへ倒れる場合は、車椅子とクッションの適合を見直します。**折りたたんだタオルを何枚も重ねる方法は、ずれや圧の偏りを起こすため標準的な代用にはしません。**

体圧分散、座面の奥行きと高さ、骨盤・大腿の支持を理学療法士・作業療法士や福祉用具担当者と評価し、用途に合うクッションを選びます。褥瘡リスクや感覚障害がある人は特に自己流の調整を避けます。

座面を変えると足部支持やテーブル高も変わるため、椅子・足・机を一体として再確認します。`,
  154: `前ずれは、座面の不適合、骨盤後傾、筋力低下、痛み、疲労などで起こります。まず食事を止め、安全に座り直せる人員と方法を確保します。**膝を押さえて身体を動かすなど、訓練を受けていない介助は本人と介助者双方のけがにつながります。**

車椅子・クッション・フットサポート・テーブル高を見直し、必要に応じて理学療法士・作業療法士へ依頼します。滑り止め素材やタオルロールも、皮膚への圧や身体拘束につながらないかを確認して選びます。

短い時間で姿勢が崩れる場合は、食事時間を調整し、むせや呼吸状態も含めて嚥下評価を行います。`,
  157: `**頸部角度に全員共通の「基本形」や指何本分という基準はありません。**顎引きは一部の嚥下障害で役立つことがありますが、別の病態では飲み込みにくさを増す場合があります。

まず頭頸部が無理なく支持され、呼吸しやすく、食物を見られる位置にします。介助者が高い位置から食物を運んで顎を上げさせないよう、本人と視線の高さを合わせます。

むせ、湿った声、口腔内残留、反復する肺炎がある場合は、言語聴覚士などの評価でその人に適した姿勢を決め、写真や短い指示で共有します。`,
  158: `**固定の角度はなく、リクライニングを深くすれば必ず誤嚥が減るわけでもありません。**姿勢保持、覚醒、呼吸、食物の認識、自力摂取、嚥下の状態を合わせて判断します。

角度を変えるときは、骨盤のずれ、頭頸部の支持、足部、テーブルと食物の見え方も調整します。変更後にむせ、湿った声、口腔内残留、疲労、摂取量がどう変わったかを記録します。

嚥下障害が疑われる場合は、医師・言語聴覚士・理学療法士・作業療法士などが評価し、本人ごとの安全な角度と介助方法を共有します。`,
}

const applyMedicalSafetyEdits = (number: number, answer: string) => {
  let revised = medicalAnswerOverrides[number] ?? answer

  if (number === 3) {
    revised = revised.replace(
      /薬剤性は\*\*中止すれば数日〜2週で改善する\*\*、最も費用対効果の高い介入です。/,
      '薬剤が原因のこともありますが、改善時期は薬剤・病態で異なります。処方を自己判断で中止せず、処方医・薬剤師と見直します。',
    )
  }

  if (number === 11) {
    revised = revised.replace(
      /再挑戦の回数は、1食につき2回までを目安にし、それ以上は次の食事・間食に回します。/,
      '再提示の回数は固定せず、本人の負担、安全性、覚醒、全身状態に応じて決めます。拒否や疲労が続く場合はその食事で繰り返さず、原因を再評価します。',
    )
  }

  return revised
}


const trimAnswer = (lines: string[]) => {
  const result = [...lines]

  while (result.length && result[0].trim() === '') result.shift()
  while (
    result.length &&
    (result[result.length - 1].trim() === '' ||
      result[result.length - 1].trim() === '---')
  ) {
    result.pop()
  }

  return result.join('\n')
}

const parseGuide = () => {
  const lines = normalize(guideRaw).split('\n')
  const partMap = new Map<number, GuidePart>()
  const questions: GuideQuestion[] = []
  let currentPart: GuidePart | undefined
  let currentSection: string | undefined
  let currentQuestion:
    | {
        number: number
        title: string
        answerLines: string[]
        part: GuidePart
        sectionTitle?: string
      }
    | undefined

  const finishQuestion = () => {
    if (!currentQuestion) return

    const question: GuideQuestion = {
      id: `q${currentQuestion.number}`,
      number: currentQuestion.number,
      title:
        medicalQuestionTitles[currentQuestion.number] ?? currentQuestion.title,
      answer: applyMedicalSafetyEdits(
        currentQuestion.number,
        trimAnswer(currentQuestion.answerLines),
      ),
      partNumber: currentQuestion.part.number,
      partTitle: currentQuestion.part.title,
      sectionTitle: currentQuestion.sectionTitle,
    }

    currentQuestion.part.questions.push(question)
    questions.push(question)
    currentQuestion = undefined
  }

  for (const line of lines) {
    const partMatch = line.match(/^#{1,2}\s+第(\d+)部[\u3000\s]*(.+)$/)
    if (partMatch) {
      finishQuestion()
      const number = Number(partMatch[1])
      currentPart = {
        id: `part-${number}`,
        number,
        title: medicalPartTitles[number] ?? `第${number}部\u3000${partMatch[2].trim()}`,
        questions: [],
      }
      partMap.set(number, currentPart)
      currentSection = undefined
      continue
    }

    const questionMatch = line.match(/^#{3,4}\s+Q(\d+)[.\uFF0E\u3000\s]+(.+)$/)
    if (questionMatch && currentPart) {
      finishQuestion()
      currentQuestion = {
        number: Number(questionMatch[1]),
        title: questionMatch[2].trim(),
        answerLines: [],
        part: currentPart,
        sectionTitle: currentSection,
      }
      continue
    }

    const sectionMatch = line.match(
      /^#{2,3}\s+((?:2-[A-J]|6-[0-5]|10-(?:0|[A-G]))[\u3000\s]+.+)$/,
    )
    if (sectionMatch) {
      finishQuestion()
      currentSection = sectionMatch[1].trim()
      continue
    }

    if (currentQuestion) currentQuestion.answerLines.push(line)
  }

  finishQuestion()

  return {
    parts: [...partMap.values()]
      .filter((part) => part.number >= 1 && part.number <= 10)
      .sort((a, b) => a.number - b.number),
    questions: questions.sort((a, b) => a.number - b.number),
  }
}

const extractSupplement = (
  id: string,
  headingPattern: RegExp,
  endPattern: RegExp | undefined,
): GuideSupplement | undefined => {
  const source = normalize(guideRaw)
  const heading = headingPattern.exec(source)
  if (!heading || heading.index === undefined) return undefined

  const bodyStart = heading.index + heading[0].length
  const remaining = source.slice(bodyStart)
  const end = endPattern?.exec(remaining)
  const body = (end ? remaining.slice(0, end.index) : remaining).trim()

  return {
    id,
    title: heading[1]?.trim() ?? '',
    body,
  }
}

const parsed = parseGuide()

export const appetiteLossGuideParts = parsed.parts
export const appetiteLossGuideQuestions = parsed.questions
export const appetiteLossGuideQuestionCount = parsed.questions.length

export const appetiteLossGuideSupplements = [
  extractSupplement(
    'zero-cost',
    /^##\s+(付録\u3000費用ゼロ・今日からできる10項目)$/m,
    /^##\s+第11部/m,
  ),
  extractSupplement(
    'implementation',
    /^##\s+(第11部\u3000実行順序)$/m,
    /^##\s+実践上の最重要原則/m,
  ),
  extractSupplement(
    'principles',
    /^##\s+(実践上の最重要原則（8つ）)$/m,
    /^##\s+主要文献リスト/m,
  ),
  extractSupplement(
    'references',
    /^##\s+(主要文献リスト)$/m,
    undefined,
  ),
].filter((item): item is GuideSupplement => Boolean(item))

export const getAppetiteLossGuideQuestion = (questionId?: string) => {
  if (!questionId) return undefined
  const normalizedId = questionId.toLowerCase().replace(/^q?/, 'q')
  return appetiteLossGuideQuestions.find(
    (question) => question.id === normalizedId,
  )
}

const includesAny = (number: number, values: number[]) =>
  values.includes(number)

export const getQuestionSafetyNote = (number: number) => {
  if (number === 2) {
    return '呼吸できない・話せない、顔色が青い、反応がない、突然の片麻痺やろれつ不良などは119番の対象です。窒息や意識障害が疑われる間は、口から飲食物や薬を入れないでください。'
  }

  if (
    (number >= 67 && number <= 70) ||
    number === 95 ||
    (number >= 150 && number <= 159)
  ) {
    return '食形態・とろみ・姿勢は万人に共通する方法ではありません。むせ、湿った声、口腔内残留、疲労がある場合は食事を急がず、医師・歯科医師・言語聴覚士などの評価に基づいて個別に決めてください。'
  }

  if (
    includesAny(number, [50, 82, 96]) ||
    (number >= 98 && number <= 102)
  ) {
    return '薬の開始・中止・増減・粉砕・食物への混和は、自己判断で行わず、処方医・薬剤師に確認してください。改善時期や副作用は薬剤と病態で異なります。'
  }

  if (number >= 103 && number <= 109) {
    return '人工栄養・輸液・Comfort feedingは、本人の意思、病状、予後、負担と利益を確認し、家族と多職種チームで共有して決めます。Comfort feedingは「何もしない」という意味ではありません。'
  }

  if (
    includesAny(number, [10, 11, 22, 23]) ||
    (number >= 57 && number <= 60) ||
    (number >= 121 && number <= 128)
  ) {
    return 'ここに示す時間・回数・介助法・環境調整は試行の例であり、効果を保証する一律の基準ではありません。本人が受け入れるかを確認し、一度に一つ変えて記録します。'
  }

  return undefined
}
