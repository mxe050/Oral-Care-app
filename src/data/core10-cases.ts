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

/**
 * 設計方針：
 * 各症例で0/1/2をバランスよく混在させる。
 * 「全員ダメ」「全員完璧」ではなく、10項目それぞれで別の判定を迫る。
 *
 * Case 1（新人）: 0×4, 1×4, 2×2 — 基礎は習ったが細部が抜ける
 * Case 2（ベテラン）: 0×2, 1×4, 2×4 — 基本は盤石だが慣れによる盲点あり
 * Case 3（疲労中堅）: 0×2, 1×5, 2×3 — スキルはあるが疲労でムラ
 */
export const CORE10_CASES: Core10Case[] = [
  {
    id: 'core10-case1',
    title: '症例1：新人看護師 × 脳梗塞後の患者',
    scenarioSetup:
      '朝食介助の場面。ベッドを60度にギャッジアップしたまま、新人看護師Aさんが食事介助を始めます。',
    careStaffProfile: '新人看護師（入職6か月）、食事介助研修は最低限のみ',
    patientContext:
      '78歳男性、脳梗塞後の右片麻痺、軟菜食＋とろみ水分、発症3週間目',
    findings: {
      1: {
        itemId: 1,
        observation:
          'ギャッジアップ直後にクッションで麻痺側にサポートを入れたが、体幹がまだ麻痺側に5〜7度傾いており完全な正中位には至っていない。',
        expertScore: 1,
        expertRationale:
          '調整努力は見られるが対称性が不完全。スコア1（不十分）。完全な正中位には至っていないが、全く無調整ではない。',
        tip: 'クッションを入れた後に正面から3秒間、肩甲骨の左右差を確認するクセをつける。体幹5度の偏位でも咽頭流路は偏る。',
      },
      2: {
        itemId: 2,
        observation:
          'ベッド上のため足底は宙に浮いたまま。フットボードや足枕の工夫は一切行われていない。',
        expertScore: 0,
        expertRationale:
          '足底接地への配慮が完全に欠落している。スコア0（していない）。',
        tip:
          'ベッド上食事でも足底接地は必須。フットボードに足を当てる・足枕を入れるなど、姿勢安定と嚥下関連筋活性化の両方に効く。',
      },
      3: {
        itemId: 3,
        observation:
          '枕が低く、頸部がやや伸展位（あごが上がり気味）。食事を開始する前に頸部前屈位のセットアップを行っていない。',
        expertScore: 0,
        expertRationale:
          '頸部伸展は喉頭蓋が開き誤嚥の最大リスクとなる姿勢エラー。スコア0（していない）。',
        tip:
          'あご胸骨間＝握りこぶし1個分の前屈位を食前に必ず作る。タオルで後頭部を前方に押し出す（Shanahan 1993）。',
      },
      4: {
        itemId: 4,
        observation:
          '食前に「あーって言えますか？」と発声確認を実施。患者の「あー」は明瞭で湿性嗄声なし。',
        expertScore: 2,
        expertRationale:
          '発声確認を明確に実施し、声の質を評価できている。スコア2（している）。',
        tip: '（良好）研修で習った基本を忘れず実施できている。今後は発声量・持続時間まで観察できるとさらに質が上がる。',
      },
      5: {
        itemId: 5,
        observation:
          'スプーンを運ぶ際、介助者の腕が患者の視界をほぼ常時遮っている。食品の色や形は見えていない。',
        expertScore: 0,
        expertRationale:
          '食べ物が被介助者に見える位置になっておらず、先行期の視覚刺激が欠如。スコア0。',
        tip:
          'スプーンは患者の正面やや下から視界に入るように運ぶ。「これから○○をお持ちしますね」と声かけも併せる。',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は患者の左側（健側）に立ち、左手でスプーンを操作している。介助位置・利き手とも適切。',
        expertScore: 2,
        expertRationale:
          '健側からの介助で、利き手の使い方も正しい。スコア2（している）。',
        tip: '（良好）健側介助は麻痺側の誤嚥リスクを下げる基本。',
      },
      7: {
        itemId: 7,
        observation:
          '水平方向のつもりだが、スプーンの先端が若干上向き軌道になる場面がある。毎回ではなく、3〜4回に1回の頻度。',
        expertScore: 1,
        expertRationale:
          '水平を意識しているが軌道にブレがある。スコア1（不十分）。',
        tip:
          '下唇の高さから水平にまっすぐ入れるイメージを徹底。スプーンを持つ手首の角度を一定に保つ練習を。',
      },
      8: {
        itemId: 8,
        observation:
          '上唇閉鎖を2秒ほど待ってから引き抜くが、引き抜く方向がやや斜め上。完全な水平引きにはなっていない。',
        expertScore: 1,
        expertRationale:
          '待つ動作はあるが、引き抜き方向に改善余地がある。スコア1（不十分）。',
        tip:
          '上唇でこすり取らせるには水平に引き抜くのが必須。斜め上に引くと上唇の感覚訓練にならない。',
      },
      9: {
        itemId: 9,
        observation:
          '「お食事ですよ」と最初に1回声かけしたのみ。その後は無言で介助を続行。何を食べているか患者に伝えていない。',
        expertScore: 0,
        expertRationale:
          '先行期の認知活性化（視覚＋聴覚提示）が最初のみで継続していない。スコア0。',
        tip:
          '「次はお魚です」「お味噌汁が来ます」と一口ごとに声かけする。脳卒中患者は認知にも影響があり、継続的な手掛かり提示が有効。',
      },
      10: {
        itemId: 10,
        observation:
          '咀嚼中に次のスプーンを準備するが、次の口に運ぶタイミングは「嚥下音を聞く」意識が弱く、カチャカチャと急ぐ傾向。ただし口にまだ食塊がある状態で強引に突っ込むことはしない。',
        expertScore: 1,
        expertRationale:
          'ペース管理の意識はあるが「嚥下音確認」が習慣化していない。スコア1（不十分）。',
        tip:
          '嚥下音（ゴクン）を聞くか、視覚的に喉仏の動きを確認してから次の一口を。「待つ」が安全の最後の砦。',
      },
    },
    overallAssessment:
      '研修で習った基本（発声確認・健側介助）はできているが、姿勢セットアップ（足底・頸部）と細部の技術（スプーン運び・声かけ継続）に明確な弱点がある新人の典型。',
    keyLearnings: [
      '「0点だらけ」ではない。習ったことはできるが、習っていない細部で落とす',
      'ギャッジアップ食事は足底接地・頸部前屈が特に抜けやすい',
      'スプーン運びの軌道は1回1回の細部まで観察する必要がある',
      '声かけは「最初1回」で終わらず「一口ごと」に必要',
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
    careStaffProfile: '介護士（経験15年）、研修も複数回受講済み',
    patientContext:
      '85歳女性、アルツハイマー型認知症（HDS-R 14点）、常食、座位保持可能',
    findings: {
      1: {
        itemId: 1,
        observation:
          '椅子に深く座り体幹は正中位。座面とテーブルの位置関係が適切に調整されている。',
        expertScore: 2,
        expertRationale: '体幹対称性が保たれており正しい。スコア2。',
        tip: '（良好）椅子食は車椅子よりも姿勢を整えやすい。',
      },
      2: {
        itemId: 2,
        observation: '足底は床にしっかり接地しており、膝関節90度。',
        expertScore: 2,
        expertRationale:
          '足底接地は良好、膝・股関節の角度も適切。スコア2。',
        tip: '（良好）安定した下肢ポジションは体幹安定と咀嚼筋の活性化を助ける。',
      },
      3: {
        itemId: 3,
        observation:
          '食事開始時は前屈位だが、食事中盤で患者が少し後ろに寄りかかり頸部がやや伸展位になる。介助者は修正していない。',
        expertScore: 1,
        expertRationale:
          '開始時は正しいが、食事中の姿勢崩れへの再介入がない。スコア1（不十分）。',
        tip:
          '姿勢は「セットアップして終わり」ではない。食事中に崩れたら声かけや枕調整で再修正を。',
      },
      4: {
        itemId: 4,
        observation:
          '食前発声確認は「あー」と1回だけ実施。声量が小さく持続も短かったが、そのまま食事を開始している。',
        expertScore: 1,
        expertRationale:
          '実施してはいるが、異常の質（小声・短い持続）への評価反応がない。スコア1（不十分）。',
        tip:
          '「あー」が小さく短かったら「もう1回お願いします」と再確認。呼吸機能低下や痰貯留のサインの可能性を考える。',
      },
      5: {
        itemId: 5,
        observation:
          '介助者は患者の正面やや下に座り、スプーンを視界に入れてから運んでいる。',
        expertScore: 2,
        expertRationale:
          '被介助者の視野内での食品提示。先行期活性化の基本。スコア2。',
        tip: '（良好）視線の高さを合わせることで心理的安心感も与える。',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は患者の前方にやや斜めに位置している。スプーンを持つ手は患者から見て違和感のない位置。',
        expertScore: 2,
        expertRationale: '介助者の位置取りは適切。スコア2。',
        tip: '（良好）片麻痺がない症例では正面〜斜めからの介助が自然。',
      },
      7: {
        itemId: 7,
        observation:
          'スプーンの運びは概ね水平だが、速度にやや勢いがあり、一口分量もやや多めで安定しない。',
        expertScore: 1,
        expertRationale:
          '軌道は水平だが、速度・分量の制御に改善余地あり。スコア1（不十分）。',
        tip:
          '水平軌道だけでなく「ゆっくり」「少量（ティースプーン1杯）」も揃って初めて安全な運び。',
      },
      8: {
        itemId: 8,
        observation:
          '患者の上唇閉鎖をしっかり待ってから、スプーンを水平に引き抜いている。技術的に洗練されている。',
        expertScore: 2,
        expertRationale:
          '上唇閉鎖の待機と水平引き抜きが揃っている。スコア2。',
        tip: '（良好）口唇閉鎖の学習を支援する上質な介助。',
      },
      9: {
        itemId: 9,
        observation:
          'お盆を患者に見せて「今日はお魚とほうれん草のおひたしです」と最初に説明したが、その後は黙ったまま介助を続けている。認知症患者なのに短期記憶に頼りすぎ。',
        expertScore: 0,
        expertRationale:
          '認知症患者では短期記憶が保持できず、最初の説明だけでは継続的な先行期活性化にならない。スコア0。',
        tip:
          '認知症患者は「一口ごとに」短い声かけが必要。慣れた介助ほど省略しやすい盲点。',
      },
      10: {
        itemId: 10,
        observation:
          '患者が咀嚼中に次のスプーンを口元近くに待機させている。結果として食事ペースが患者のペースより速く、咀嚼が不十分なまま次を促す形に。',
        expertScore: 0,
        expertRationale:
          '口元待機は視覚的プレッシャーで本人のペースを乱す。嚥下完了確認もなし。スコア0。',
        tip:
          '次の一口はスプーン皿の上に置いて待つ。嚥下音/空嚥下を確認してから口元へ運ぶ。',
      },
    },
    overallAssessment:
      '基本姿勢・技術は優秀だが、「慣れによる省略（項目9）」「無意識の焦り（項目10）」「セットアップ後の再介入欠如（項目3）」など、ベテラン特有の盲点が複数存在する。',
    keyLearnings: [
      'ベテラン＝全項目満点ではない。むしろ慣れた手技の中に抜けるポイントがある',
      '認知症患者への声かけは「1回目に丁寧」ではなく「一口ごとに短く」が正解',
      '食事ペースは介助者の無意識的な焦りが出やすい。スプーン待機位置を意識',
      '姿勢は「セットアップして終わり」ではなく食事中も再介入が必要',
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
    title: '症例3：中堅看護師（夜勤入り）× フレイル高齢者',
    scenarioSetup:
      '急性期病棟での夕食介助。やや疲れ気味の中堅看護師Cさんが、フレイル高齢者の食事介助を行います。',
    careStaffProfile: '中堅看護師（経験7年）、本日夜勤入り・日中から長時間勤務',
    patientContext:
      '88歳女性、肺炎治療中、独居、フレイル、BMI 17.0、常食→軟菜食切り替え直後',
    findings: {
      1: {
        itemId: 1,
        observation:
          '電動ベッドを45度にギャッジアップ後、体幹がやや左に傾いているがそのまま食事開始。クッション調整なし。',
        expertScore: 1,
        expertRationale:
          'ギャッジアップ角度は適切範囲だが体幹の左右傾きが残存。スコア1。',
        tip:
          'ギャッジアップ後、肩甲骨の左右差を確認しクッションで調整を。食事介助の「着席3秒確認」を習慣化。',
      },
      2: {
        itemId: 2,
        observation:
          '足底はベッドのフットボードに軽く接している。膝の角度は適切。',
        expertScore: 2,
        expertRationale:
          'ベッド上でも足底接地の工夫ができている。スコア2。',
        tip: '（良好）角度だけでなく接地圧も意識できるとさらによい。',
      },
      3: {
        itemId: 3,
        observation:
          '頸部はほぼ中間位。最初は前屈位だが、食事中盤にあごが上がる場面が数回あった。介助者は軽く修正するが毎回ではない。',
        expertScore: 1,
        expertRationale:
          '修正意識はあるが徹底されていない。スコア1。',
        tip:
          '後頭部を薄いタオルで前方に押し出して「崩れにくい」セットアップを最初に。崩れた瞬間の即時修正を毎回徹底。',
      },
      4: {
        itemId: 4,
        observation:
          '食前発声確認をせずに食事を開始した。疲労のため手順が省略されている。',
        expertScore: 0,
        expertRationale:
          '発声確認が完全に抜けている。スコア0。',
        tip:
          '疲労時こそルーティンを守る。食前発声確認は10秒で終わる。肺炎治療中のフレイル患者では特に重要。',
      },
      5: {
        itemId: 5,
        observation:
          '介助者は患者の左側に立ち、スプーンは患者の正面に運んでいる。視界内提示ができている。',
        expertScore: 2,
        expertRationale: '被介助者の視野内に食品が入っている。スコア2。',
        tip: '（良好）',
      },
      6: {
        itemId: 6,
        observation:
          '介助者は左側から、右手でスプーンを持っている。右利きで利き手を優先しており、スプーンが患者の視界を横切る場面がある。',
        expertScore: 1,
        expertRationale:
          '位置は適切だが利き手の使い方で動線が最適でない。スコア1。',
        tip:
          'ベッドサイドの狭さで仕方ない場合もあるが、可能なら患者の利き手側寄りに位置取りを工夫。',
      },
      7: {
        itemId: 7,
        observation:
          'スプーンは水平方向に運ばれ、頸部姿勢を崩していない。',
        expertScore: 2,
        expertRationale: 'スプーンの運びは適切。スコア2。',
        tip: '（良好）',
      },
      8: {
        itemId: 8,
        observation:
          '患者の口唇閉鎖がやや遅いため、介助者は2〜3秒待ってからスプーンを抜くが、引き抜き方向が時々斜め上になる。',
        expertScore: 1,
        expertRationale:
          '待機はできているが、引き抜き方向が一貫しない。スコア1。',
        tip:
          '水平に引き抜くのを一度も崩さない。斜めになると上唇の感覚訓練にならない。',
      },
      9: {
        itemId: 9,
        observation:
          '食品は一口ごとに「これは大根の煮物です」「次はお魚です」と短く説明している。',
        expertScore: 2,
        expertRationale:
          '一口ごとの視覚＋聴覚刺激が実施されている。スコア2。',
        tip: '（良好）この症例のベスト実践。フレイル患者の先行期を活性化する理想的介入。',
      },
      10: {
        itemId: 10,
        observation:
          '夜勤入りで疲れており、患者の嚥下音を確認せず次の一口を運ぶ場面が複数回。途中2回、患者がわずかにむせる。',
        expertScore: 0,
        expertRationale:
          '嚥下音確認の欠落＋軽度誤嚥徴候を見逃している。スコア0。',
        tip:
          '疲労時こそ「待つ」を徹底。空嚥下を促す声かけ「もう一度ゴクンしてみましょうか」がペース管理の鍵。',
      },
    },
    overallAssessment:
      '7年目の中堅らしい基本の型はできているが、本人の疲労状態により「発声確認の省略（項目4）」「食事ペース管理の崩れ（項目10）」という安全上クリティカルな項目で失点。経験と疲労のトレードオフが表面化した症例。',
    keyLearnings: [
      '経験があっても疲労で安全項目が抜ける。「疲労時こそルーティンを守る」を肝に銘じる',
      'フレイル患者では発声の「声量・持続時間」も指標にする',
      '利き手と患者位置の関係を意識すると無駄な動作が減る',
      '「最後の砦（項目10：食事ペース）」を疲労で崩すと誤嚥直結のリスク',
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
      {
        id: 'ref-c10-3-2',
        authors: 'Rogers AE, et al.',
        title: 'The working hours of hospital staff nurses and patient safety',
        journal: 'Health Aff (Millwood)',
        year: 2004,
        keyFinding:
          '看護師の12時間超勤務でエラー発生率が3倍に増加。疲労は医療安全の核心的リスク',
      },
    ],
  },
]
