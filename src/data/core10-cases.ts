import type { Core10ItemId, Core10Score } from '../types/core10'
import type { Reference } from '../types/common'

export interface Core10ItemFinding {
  itemId: Core10ItemId
  observation: string // 介助場面で観察された行動
  expertScore: Core10Score
  expertRationale: string // 専門家の判定根拠
  tip: string // 改善のヒント
}

export interface Core10Case {
  id: string
  title: string
  scenarioSetup: string // 場面設定
  careStaffProfile: string // 介助者の属性（経験年数など）
  patientContext: string // 患者背景
  findings: Record<Core10ItemId, Core10ItemFinding>
  overallAssessment: string
  keyLearnings: string[]
  references: Reference[]
}

export const CORE10_CASES: Core10Case[] = [
  {
    id: 'core10-case1',
    title: '症例1：新人看護師 × 脳梗塞後の患者',
    scenarioSetup:
      '朝食介助の場面。ベッドを60度にギャッジアップしたまま、新人看護師Aさんが食事介助を始めます。',
    careStaffProfile: '新人看護師（入職6か月）、食事介助研修未受講',
    patientContext:
      '78歳男性、脳梗塞後の右片麻痺、軟菜食＋とろみ水分、発症3週間目',
    findings: {
      1: {
        itemId: 1,
        observation:
          'ベッド上で体幹が右（麻痺側）に10度傾いている。クッションによる体位調整はされていない。',
        expertScore: 0,
        expertRationale:
          '体幹の左右傾きが明らかに存在し、咽頭内食塊流路が左右非対称になっている。スコア0（していない）。',
        tip: 'クッションを麻痺側に挟み、体幹が左右均等になるよう確認する。体幹5度の傾きでも咽頭での流路偏位が起きる。',
      },
      2: {
        itemId: 2,
        observation:
          'ベッド上のため足底は接地していない。フットレストや足底接地の工夫なし。',
        expertScore: 0,
        expertRationale:
          '足底非接地の状態。ベッド上での食事では特に意識しないと抜けやすい項目。スコア0。',
        tip:
          'ベッド上でもフットボードや足枕で足底が接する工夫をする。足底接地は体幹安定と嚥下関連筋群の活性化に寄与。',
      },
      3: {
        itemId: 3,
        observation:
          '頸部がやや伸展位（あごが上がっている）。枕の高さ調整がされていない。',
        expertScore: 0,
        expertRationale:
          '頸部伸展は喉頭蓋が開いて誤嚥の直接的原因となる最も危険な姿勢エラー。スコア0。',
        tip:
          '枕やタオルで後頭部を前方に押し出し、あご胸骨間＝握りこぶし1個分の前屈位を作る（Shanahan 1993）。',
      },
      4: {
        itemId: 4,
        observation:
          '介助者は発声確認をせずにすぐに食事を開始した。患者の声の質は不明。',
        expertScore: 0,
        expertRationale:
          '食前の発声確認（唾液・痰の有無チェック）を行っていない。スコア0。',
        tip:
          '「あー」と発声してもらい、湿性嗄声の有無を確認。喉頭内の唾液・痰貯留を食事前にチェック。',
      },
      5: {
        itemId: 5,
        observation:
          '介助者は患者の視野外（真横〜後方）からスプーンを運んでいる。',
        expertScore: 0,
        expertRationale:
          '食べ物が被介助者に見えない位置からの介助は先行期を活性化できない。スコア0。',
        tip:
          'スプーンは患者の正面やや下から、視界に入るように運ぶ。「これから○○をお持ちしますね」と声かけも併せる。',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は患者の左側（健側）に立ち、左手でスプーンを持っている。',
        expertScore: 2,
        expertRationale:
          '健側（左）からの介助でスプーンを持つ手も介助側に正しく位置している。スコア2。',
        tip: '（正しくできています）健側介助は麻痺側の誤嚥リスクを下げる基本。',
      },
      7: {
        itemId: 7,
        observation:
          'スプーンを患者の口に運ぶ際、下から上へ（あごが上がる方向）に持ち上げている。',
        expertScore: 0,
        expertRationale:
          'スプーンの運び方によって頸部伸展を誘発している。スコア0。',
        tip:
          'スプーンは下唇から水平方向にまっすぐ運ぶ。上下動でなく水平動を意識。',
      },
      8: {
        itemId: 8,
        observation:
          'スプーンを上唇でこすり取らせず、介助者がスプーンを引きながら抜いている。',
        expertScore: 0,
        expertRationale:
          '上唇でこすり取る動作がないため口唇閉鎖・食塊形成の学習が起きない。スコア0。',
        tip:
          'スプーンを水平に入れ、上唇が閉じるのを待ってからまっすぐ水平に引き抜く。これで上唇の感覚と運動が活性化。',
      },
      9: {
        itemId: 9,
        observation:
          '器に何が残っているかを患者に見せていない。何を食べているか分からない状態。',
        expertScore: 0,
        expertRationale:
          '先行期の認知活性化が欠如。スコア0。',
        tip:
          '「今日はお魚です」「次はお味噌汁です」と食品を見せ、声かけする。視覚・嗅覚・聴覚の先行期刺激を総動員。',
      },
      10: {
        itemId: 10,
        observation:
          '患者がまだ口の中に食塊がある状態で、次の一口を運ぼうとしている。',
        expertScore: 0,
        expertRationale:
          '咽頭期の完了を待たずに次の摂取を始めるのは誤嚥の直接的原因。スコア0。',
        tip:
          '嚥下音（ゴクン）を聞くか、空嚥下を促してから次の一口を運ぶ。「急がない」がプロの基本。',
      },
    },
    overallAssessment:
      '新人が犯しやすい「姿勢・環境・技術の同時多発エラー」の典型例。個別項目でなく全体を見直す必要がある。',
    keyLearnings: [
      '「ベッド上ギャッジアップ食事」は特に足底接地と頸部前屈が抜けやすい',
      '健側からの介助（項目6）はできていても、スプーン運び（項目7・8）で頸部伸展を誘発することがある',
      '先行期（項目5・9）は声かけ＋視覚提示で必ず活性化する',
      '「食事ペース」（項目10）は安全の最後の砦',
    ],
    references: [
      {
        id: 'ref-c10-1',
        authors: 'Nagano A, Maeda K',
        title:
          'Development and validation of Feeding Assistance Skill Score (FASS)',
        journal: 'European Geriatric Medicine',
        year: 2024,
        doi: '10.1007/s41999-024-01024-w',
        keyFinding:
          '経験年数とスキルには相関がないが、スキルと食事摂取量には R²=0.318 の相関',
      },
      {
        id: 'ref-c10-2',
        authors: 'Shanahan TK, Logemann JA, et al.',
        title: 'Chin-down posture effect on aspiration in dysphagic patients',
        journal: 'Arch Phys Med Rehabil',
        year: 1993,
        keyFinding: '頸部前屈位は誤嚥を有意に減少させる',
      },
    ],
  },
  {
    id: 'core10-case2',
    title: '症例2：ベテラン介護士 × 認知症患者',
    scenarioSetup:
      'デイサービスでの昼食場面。経験豊富な介護士Bさんが、認知症の利用者の介助を行っています。',
    careStaffProfile: '介護士（経験15年）',
    patientContext:
      '85歳女性、アルツハイマー型認知症（HDS-R 14点）、常食、座位保持可能',
    findings: {
      1: {
        itemId: 1,
        observation:
          '椅子に深く座り体幹は正中位。座面とテーブルの位置関係が適切に調整されている。',
        expertScore: 2,
        expertRationale: '体幹対称性が保たれており正しい。スコア2。',
        tip: '（正しい）椅子食は車椅子よりも姿勢を整えやすい。',
      },
      2: {
        itemId: 2,
        observation: '足底は床にしっかり接地しており、膝関節90度。',
        expertScore: 2,
        expertRationale:
          '足底接地は良好、膝・股関節の角度も適切。スコア2。',
        tip: '（正しい）安定した下肢ポジションは体幹安定と咀嚼筋の活性化を助ける。',
      },
      3: {
        itemId: 3,
        observation: '頸部はやや前屈位。あごが引けている。',
        expertScore: 2,
        expertRationale: '適切な頸部前屈位。誤嚥予防の基本姿勢。スコア2。',
        tip: '（正しい）あご引き位は咽頭蓋の気管入口部への被覆を助ける。',
      },
      4: {
        itemId: 4,
        observation:
          '食事前に「あーと言ってみてください」と発声確認を行い、声の質が普段通りであることを確認した。',
        expertScore: 2,
        expertRationale: '食前発声確認を実施。湿性嗄声の有無を評価。スコア2。',
        tip: '（正しい）食前のルーティンとして定着させる良い実践。',
      },
      5: {
        itemId: 5,
        observation:
          '介助者は患者の正面やや下に座り、スプーンを視界に入れてから運んでいる。',
        expertScore: 2,
        expertRationale:
          '被介助者の視野内での食品提示。先行期活性化の基本。スコア2。',
        tip: '（正しい）視線の高さを合わせることで心理的な安心感も与える。',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は患者の前方にやや斜めに位置している。スプーンを持つ手は患者から見て違和感のない位置。',
        expertScore: 2,
        expertRationale: '介助者の位置取りは適切。スコア2。',
        tip: '（正しい）片麻痺がない症例では正面〜斜めからの介助が自然。',
      },
      7: {
        itemId: 7,
        observation:
          'スプーンは水平方向に運ばれ、患者の頸部は前屈位を保ったまま。',
        expertScore: 2,
        expertRationale:
          'スプーンの運びが水平で頸部姿勢を崩していない。スコア2。',
        tip: '（正しい）スプーン運びと姿勢保持の整合性が取れている。',
      },
      8: {
        itemId: 8,
        observation:
          '患者の上唇が自然に閉じるのを待ってからスプーンを水平に引き抜いている。',
        expertScore: 2,
        expertRationale:
          '上唇こすり取りの基本動作ができている。スコア2。',
        tip: '（正しい）口唇閉鎖の学習を支援する上質な介助。',
      },
      9: {
        itemId: 9,
        observation:
          'お盆を患者に見せて「今日はお魚とほうれん草のおひたしです」と説明したが、途中から説明なしに運んでいる。',
        expertScore: 1,
        expertRationale:
          '最初は視覚提示＋声かけをしているが、途中から省略されている。スコア1。',
        tip:
          '認知症患者は短期記憶が弱い。一口ごとに「次はお味噌汁です」と声かけすると先行期活性化が持続する。',
      },
      10: {
        itemId: 10,
        observation:
          '患者が咀嚼中に次のスプーンを口元近くに待機させている。結果として食事ペースが患者のペースより速い。',
        expertScore: 1,
        expertRationale:
          '口元での待機は患者のペースを乱す。ただし完全に無視しているわけではない。スコア1。',
        tip:
          '次の一口はスプーン皿の上に置いて待つ。嚥下音/空嚥下を確認してから口元へ運ぶ。「待つ」が最高の技。',
      },
    },
    overallAssessment:
      '基本姿勢・技術は優秀だが、「認知症への配慮（項目9）」「食事ペース（項目10）」に改善余地あり。経験年数と FASS 相関がないことの典型例。',
    keyLearnings: [
      'ベテラン＝全項目満点ではない。慣れた手技の中に抜けるポイントがある',
      '認知症患者への声かけは「1回目に丁寧」ではなく「一口ごとに短く」が基本',
      '食事ペースは介助者の無意識的な焦りが出やすい。スプーン待機位置を意識する',
    ],
    references: [
      {
        id: 'ref-c10-2-1',
        authors: 'Nagano A, Maeda K',
        title:
          'Development and validation of Feeding Assistance Skill Score (FASS)',
        journal: 'European Geriatric Medicine',
        year: 2024,
        doi: '10.1007/s41999-024-01024-w',
        keyFinding:
          '経験年数と FASS スコアに相関なし（p=n.s.）。実技訓練でしかスキルは身につかない',
      },
    ],
  },
  {
    id: 'core10-case3',
    title: '症例3：ナーススタッフ × 高齢独居フレイル',
    scenarioSetup:
      '急性期病棟での夕食介助。やや疲れ気味の中堅看護師Cさんが、フレイル高齢者の食事介助を行います。',
    careStaffProfile: '中堅看護師（経験7年）、本日夜勤入り',
    patientContext:
      '88歳女性、肺炎治療中、独居、フレイル、BMI 17.0、常食→軟菜食切り替え直後',
    findings: {
      1: {
        itemId: 1,
        observation:
          '電動ベッドを45度にギャッジアップ。体幹は左に傾いているが位置調整はされていない。',
        expertScore: 1,
        expertRationale:
          'ギャッジアップ角度は適切範囲だが体幹の左右傾きが残っている。スコア1。',
        tip:
          'ギャッジアップ後、肩甲骨の左右差を確認しクッションで調整する。食事介助の「着席3秒確認」を習慣化。',
      },
      2: {
        itemId: 2,
        observation:
          '足底はベッドのフットボードに軽く接している。膝の角度は問題なし。',
        expertScore: 2,
        expertRationale:
          'ベッド上でも足底接地の工夫ができている。スコア2。',
        tip: '（正しい）角度だけでなく接地圧も意識できるとさらによい。',
      },
      3: {
        itemId: 3,
        observation:
          '頸部はほぼ中間位。あごが軽く上がっている場面がある。',
        expertScore: 1,
        expertRationale:
          '明確な伸展はないが前屈が不十分な瞬間がある。スコア1。',
        tip:
          '後頭部を薄いタオルで前方に押し出す。あご胸骨間＝握りこぶし1個分を最初にセットする。',
      },
      4: {
        itemId: 4,
        observation:
          '「食前にあーって言えますか？」と1回確認。患者の返答は「あー」と短く小さい。',
        expertScore: 1,
        expertRationale:
          '発声確認は行ったが「小さく短い」声に対して追加評価していない。スコア1。',
        tip:
          '声量・持続時間も観察指標。フレイル患者は呼吸機能低下があり、発声時間短縮は要注意サイン。',
      },
      5: {
        itemId: 5,
        observation:
          '介助者は患者の左側に立ち、スプーンは患者の正面に運んでいる。',
        expertScore: 2,
        expertRationale: '被介助者の視野内に食品が入っている。スコア2。',
        tip: '（正しい）',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は左側から、右手でスプーンを持っている。',
        expertScore: 1,
        expertRationale:
          '位置は左側でよいが、右利きの介助者が右手を使う場合、スプーンが患者の視界を横切る。スコア1。',
        tip:
          'ベッドサイドの狭さで仕方ない場合もあるが、可能なら介助者の利き手側に患者が来るよう位置取りを工夫。',
      },
      7: {
        itemId: 7,
        observation:
          'スプーンは水平方向に運ばれ、頸部姿勢を崩していない。',
        expertScore: 2,
        expertRationale: 'スプーンの運びは適切。スコア2。',
        tip: '（正しい）',
      },
      8: {
        itemId: 8,
        observation:
          '患者の口唇閉鎖がやや遅いため、介助者は2〜3秒待ってからスプーンを抜いている。',
        expertScore: 2,
        expertRationale:
          '上唇閉鎖を「待つ」動作ができている。スコア2。',
        tip:
          '（正しい）フレイル患者の遅い反応を待つ忍耐は重要。',
      },
      9: {
        itemId: 9,
        observation:
          '食品は一口ごとに「これは大根の煮物です」と短く説明している。',
        expertScore: 2,
        expertRationale:
          '一口ごとの視覚＋聴覚刺激が実施されている。スコア2。',
        tip: '（正しい）この症例のベスト実践。',
      },
      10: {
        itemId: 10,
        observation:
          '夜勤入りで疲れているのか、患者の嚥下音を確認せず次の一口を運ぶ場面が2回あった。',
        expertScore: 1,
        expertRationale:
          '嚥下音確認が一部欠落。スコア1。',
        tip:
          '空嚥下を促す声かけ「もう一度ゴクンしてみましょうか」がペース管理に有効。',
      },
    },
    overallAssessment:
      '中堅らしい基本の型はできているが、本人の疲労状態や患者のフレイル特有のサインに対する感度が低下している場面がある。',
    keyLearnings: [
      '中堅でも「疲労時にペース配分が乱れる」ことを自覚する',
      'フレイル患者では発声の「量・持続」も指標にする',
      '利き手と患者位置の関係を意識すると無駄な動作が減る',
    ],
    references: [
      {
        id: 'ref-c10-3-1',
        authors: 'Fried LP, et al.',
        title: 'Frailty in older adults: evidence for a phenotype',
        journal: 'J Gerontol A Biol Sci Med Sci',
        year: 2001,
        keyFinding: 'フレイル診断基準（体重減少・疲労感・筋力低下など）',
      },
    ],
  },
]
