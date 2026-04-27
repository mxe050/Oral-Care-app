import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  Activity,
  AlertCircle,
  Brain,
  ChevronDown,
  CheckCircle2,
  Zap,
  Target,
  Eye,
  Wind,
  Layers,
  Sparkles,
} from 'lucide-react'
import { TextbookReferenceList } from '../../components/domain/TextbookReferenceList'

interface RegionSection {
  id: string
  title: string
  subtitle: string
  icon: typeof Brain
  gradient: string
  // 6 sections
  brainEvent: { detail: string; cite: string }
  systemicImpairment: { detail: string; cite: string }
  swallowImpairment: { detail: string; cite: string }
  posturePoints: { detail: string; reason: string; cite: string }
  swallowPoints: { detail: string; reason: string; cite: string }
  otherCautions: { detail: string; cite: string }
}

const REGIONS: RegionSection[] = [
  {
    id: 'cortex-mca',
    title: '大脳皮質(中大脳動脈領域)',
    subtitle: 'MCA infarct — 片麻痺・失語・USN・仮性球麻痺',
    icon: Brain,
    gradient: 'from-red-400 to-rose-600',
    brainEvent: {
      detail:
        '中大脳動脈(MCA)は前頭葉外側・側頭葉外側・頭頂葉・島・大脳基底核外側を灌流する。MCAの近位閉塞では広範な皮質・皮質下梗塞となり、優位半球(多くは左)では運動性失語(Broca)・感覚性失語(Wernicke)・失行、非優位半球(多くは右)では半側空間無視(USN)・着衣失行などを生じる。両側の皮質または内包のラクナ梗塞・多発梗塞が累積すると、上位運動ニューロン障害として仮性球麻痺(pseudobulbar palsy)に進展する。',
      cite:
        '内田『姿勢を意識した神経疾患患者の摂食嚥下』第2章 / 内田『姿勢から介入する摂食嚥下』pp.21-35',
    },
    systemicImpairment: {
      detail:
        '対側の片麻痺(上肢優位 — Brunnstrom stage上肢I〜III、手指I〜III、下肢II〜III程度が多い)、対側の感覚障害、対側の同名半盲、片側の認知障害(USN・失語・失行)、嚥下に関連する咽頭・口腔の上位運動ニューロン障害(仮性球麻痺)。優位半球障害では摂食動作の意味理解が損なわれ、非優位半球障害では空間処理障害が食卓配置に影響する。',
      cite:
        '内田『姿勢を意識した神経疾患患者の摂食嚥下』第2章 (80歳代女性 右MCA梗塞 25日経過例)',
    },
    swallowImpairment: {
      detail:
        '①口腔期障害:口腔への取り込みが患側で乏しい(口角からの食物こぼれ)、舌の偏位による食塊形成困難、患側の食物残留(buccal pocketing)。②咽頭期障害:仮性球麻痺による嚥下反射の遅延、軟口蓋挙上不全による鼻咽腔閉鎖不全(鼻からの食物逆流)、患側咽頭収縮筋の収縮不全による梨状陥凹残留と誤嚥。③不顕性誤嚥(silent aspiration)が起こりやすく、咳反射が乏しいため誤嚥に気づきにくい。',
      cite:
        '内田『姿勢を意識した神経疾患患者の摂食嚥下』第2章 / 内田『姿勢から介入する摂食嚥下』pp.36-37',
    },
    posturePoints: {
      detail:
        '①リクライニング座位30〜45度+頭部前屈(頚部屈曲位)を基本とする。45度+頭頸部回旋30度の組み合わせで誤嚥率が最も低くなることが報告されている(太田 2011)。②患側の体幹回旋を補正:バスタオルを患側の体幹側面〜腋窩部に挟み、麻痺側の傾倒を防ぐ。③足底接地を確保(足台でも可)。下肢の支持性低下があれば、両大腿のたれの下にもバスタオル等を挟み骨盤後傾を防ぐ。④麻痺側上肢はテーブル上に置き、肩関節亜脱臼を防ぐ。',
      reason:
        '麻痺側の体幹支持性が極端に低下しているため、自由座位では麻痺側へ崩れて頸部が前屈→過屈曲となり、咽頭通過が阻害される。バスタオルで体幹を支持することで、頸部前屈が「適切な範囲(嚥下に有利)」に収まる。リクライニング45度はPAS研究で90度より誤嚥率が有意に低いことがエビデンスで示されている(Park 2013)。',
      cite:
        '内田『姿勢を意識した神経疾患患者の摂食嚥下』第2章 pp.10-15 / 内田『姿勢から介入する摂食嚥下』pp.76-79',
    },
    swallowPoints: {
      detail:
        '①食形態:学会分類2021でコード0j(嚥下訓練ゼリー)から開始、咽頭通過が確認できればコード1j・2-1へステップアップ。粘性は中等度(蜂蜜状〜ヨーグルト状)が安全。②頭頸部回旋:健側に頭部を回旋することで患側梨状陥凹を潰し、健側に食塊を流す。Logemannは麻痺側に90度回旋する方法を推奨(Wallenberg・球麻痺で有効)。③一口量5〜10g、空嚥下・複数回嚥下を併用。④交互嚥下(固形+ゼリー)で咽頭残留を清掃。⑤食事終了時はお茶ゼリーで終わる。',
      reason:
        '頭頸部回旋により健側咽頭の食塊通過を優先させ、麻痺側咽頭の機能不全を代償する。一口量を制限することで、誤嚥が起きた場合の流入量を最小化できる。空嚥下・交互嚥下は咽頭残留を清掃し、次の食塊の誤嚥源を取り除く。',
      cite:
        '内田『姿勢から介入する摂食嚥下』pp.78-79 / 小山『口から食べる幸せをサポート』pp.111, 131',
    },
    otherCautions: {
      detail:
        '①不顕性誤嚥のスクリーニングを必ず実施(VE・VFが望ましい)。②食事前後にSpO₂・聴診で評価。③向精神薬・抗ヒスタミン薬・抗コリン薬は嚥下反射を低下させるため減薬を検討。④夜間の頭部挙上(30度以上)で胃食道逆流による微小誤嚥を予防。⑤口腔ケアを食前(感覚刺激)・食後(残渣除去)に必ず実施。誤嚥性肺炎の起因菌は口腔内常在菌であり、口腔内の細菌量を減らすことが最も費用対効果の高い予防策。',
      cite:
        '内田『姿勢から介入する摂食嚥下』 / 前田・髙畠『誤嚥性肺炎の包括的アプローチ』',
    },
  },
  {
    id: 'basal-ganglia',
    title: '大脳基底核(被殻・尾状核)',
    subtitle: '不顕性誤嚥のhighリスク',
    icon: Zap,
    gradient: 'from-purple-400 to-fuchsia-600',
    brainEvent: {
      detail:
        '大脳基底核(被殻・尾状核・淡蒼球)はレンズ核線条体動脈の灌流を受け、ラクナ梗塞・被殻出血の好発部位。基底核は嚥下反射のドパミン作動性回路に関与し、咽頭の感覚閾値・嚥下反射の閾値を調整している。基底核領域の梗塞では、皮質と異なる「症状の見えにくい」障害が起こる。',
      cite:
        '内田『姿勢から介入する摂食嚥下』p.37 / Nakagawa T et al. Arch Intern Med 1997',
    },
    systemicImpairment: {
      detail:
        '対側のラクナ症候群(純粋運動性片麻痺・構音障害-不器用手症候群・dysarthria-clumsy hand syndrome)。錐体外路症状(パーキンソニズム — 動作緩慢・筋強剛・小刻み歩行)を呈することがある。被殻出血では出血量により片麻痺・意識障害・共同偏視(健側を向く)を伴う。',
      cite: '内田『姿勢から介入する摂食嚥下』p.37',
    },
    swallowImpairment: {
      detail:
        '①嚥下反射の閾値上昇による嚥下反射の遅延(食塊が下咽頭に到達してから嚥下反射が起こるまでの時間が延長)。②咳反射の閾値上昇により、誤嚥しても咳が出ない不顕性誤嚥(silent aspiration)が高頻度で起こる。Nakagawaら(1997)の研究では、大脳基底核領域の梗塞では夜間の不顕性誤嚥が増加し、誤嚥性肺炎発症率が有意に高い。③パーキンソニズム合併例では舌・咽頭の運動緩慢が加わる。',
      cite:
        '内田『姿勢から介入する摂食嚥下』p.37 / Nakagawa T et al. Arch Intern Med 10:321-324, 1997',
    },
    posturePoints: {
      detail:
        '①リクライニング座位30〜45度+頭部前屈で開始。②パーキンソニズムを伴う場合は、屈曲姿勢が強くなりやすいため、後頸部・後頭部を支持して頚部の過屈曲を防ぐ。③体幹は前傾15〜20度・骨盤後傾を防ぐ。④可能な限り日中の覚醒時間を確保し、夜間就寝時はベッド頭側を30度以上挙上(胃食道逆流予防)。',
      reason:
        '不顕性誤嚥が中心の障害のため、「むせがないから安全」とはならない。重力で食塊・唾液・胃内容物を肺へ流さないことが最重要。日中覚醒の確保は嚥下反射閾値を下げる(覚醒度が下がると嚥下反射閾値はさらに上昇する)。',
      cite:
        '内田『姿勢から介入する摂食嚥下』 / 前田・髙畠『誤嚥性肺炎の包括的アプローチ』',
    },
    swallowPoints: {
      detail:
        '①冷却刺激(K-pointなど咽頭部冷却)で嚥下反射を促通する。②食前にレモン水・酸味のあるゼリーで唾液分泌・咽頭感覚を賦活。③食形態は粘性のあるゼリー(コード1j・2-1)から開始し、薄い液体は避ける。とろみ水は咽頭通過速度が遅く嚥下反射の準備時間を稼げる。④嚥下後の空嚥下を声かけで促す(「もう1回ゴックンしましょう」)。⑤食事は1日1〜2食の少量から開始。',
      reason:
        '嚥下反射の閾値が高いため、感覚入力(冷却・酸味・触覚)を意図的に増やす必要がある。とろみ付き食品は咽頭通過時間を延ばし、嚥下反射が遅延しても気道閉鎖が間に合うように調整できる。',
      cite:
        '内田『姿勢から介入する摂食嚥下』 / 小山『口から食べる幸せをサポート』',
    },
    otherCautions: {
      detail:
        '①夜間の不顕性誤嚥が誤嚥性肺炎の主因となるため、ベッド30度以上挙上を継続。②ACE阻害薬は咳反射を増強し誤嚥性肺炎予防効果が報告されている(高血圧合併例で適応を検討)。③口腔ケアは特に夜間就寝前を念入りに(就寝中の唾液誤嚥対策)。④パーキンソニズムを伴う場合は、抗パーキンソン病薬のon時に食事を合わせる。',
      cite:
        '内田『姿勢から介入する摂食嚥下』 / Nakagawa 1997',
    },
  },
  {
    id: 'thalamus',
    title: '視床',
    subtitle: '視床出血・視床梗塞 — 意識・覚醒・感覚',
    icon: Sparkles,
    gradient: 'from-indigo-400 to-blue-600',
    brainEvent: {
      detail:
        '視床は感覚・運動の中継核であり、視床下部・脳幹網様体との連絡で覚醒度を維持する。視床出血(被殻出血と並ぶ高血圧性脳出血の好発部位)、視床梗塞では意識レベル低下・覚醒度低下が前面に出る。両側視床障害では遷延する意識障害(無動性無言症・運動失調性緘黙)を生じうる。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第7章 pp.144-145 / 一般神経学',
    },
    systemicImpairment: {
      detail:
        '対側半身の感覚障害(視床痛 — 灼熱感のある異常感覚)、軽度の片麻痺、視床性失調、認知機能低下、覚醒度低下、注意障害。視床は姿勢制御の感覚入力統合にも関与するため、立ち直り反応・体平衡反応が低下する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第7章 pp.144-147',
    },
    swallowImpairment: {
      detail:
        '①覚醒度低下により食物認知が困難で、口腔への取り込みが進まない。②口腔・咽頭の感覚障害により、食塊の位置・量を感知できず、咀嚼・送り込みが拙劣に。③嚥下反射の遅延・閾値上昇による誤嚥リスク。④姿勢制御不全による頸部・体幹のアライメント不良が嚥下に直接影響する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第7章 pp.144-149',
    },
    posturePoints: {
      detail:
        '①リクライニング30〜45度+頭部前屈で開始するが、覚醒度が不十分な時間帯(午前早く・夕方以降)は食事を行わず、覚醒時間帯に集中する。②姿勢の崩れを補正:後頭部・頚部・体幹側面を支持し、頸部の過屈曲・回旋を防ぐ。③足底接地を確保。④覚醒を高めるため食事前に離床(車椅子座位)・声かけ・冷タオルでの清拭を行う。',
      reason:
        '視床障害では覚醒度自体が嚥下反射閾値を上下させる。覚醒度を上げる介入(離床・感覚刺激)は鎮静薬の中止・調整と並行して、嚥下機能を直接改善する。立ち直り反応・体軸立ち直り反応の障害により、自由座位では頸部が垂れやすいため、外的支持で頭頸部位置を保つ。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第7章 pp.144-149',
    },
    swallowPoints: {
      detail:
        '①食前に冷水含嗽・歯ブラシ刺激で口腔・咽頭感覚を賦活。②食形態はコード0j・1jから開始し、感覚低下に配慮して付着性が低いゼリーを選ぶ。③一口量は3〜5gと少なめ。④嚥下後の咽頭残留感を本人が感じにくいため、湿性嗄声・SpO₂低下を介助者が観察。⑤食事は1日1〜2食、覚醒時間帯に集中。',
      reason:
        '視床は感覚情報の中継核であり、その障害により本人は「食塊が口にある」「咽頭に残留している」を感じにくい。介助者が客観所見(咳・湿性嗄声・SpO₂)で代替モニタリングする必要がある。少量・低粘性で、感覚入力が乏しくても安全に嚥下できる条件を整える。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第7章',
    },
    otherCautions: {
      detail:
        '①視床痛がある場合、食事姿勢で疼痛が増悪し食欲を奪うことがある。鎮痛薬の食前投与を検討。②覚醒度を低下させる薬剤(ベンゾジアゼピン・抗コリン薬・抗ヒスタミン薬)は減薬・中止を検討。③栄養が確保できない期間は、経口+補完的静脈栄養で目標エネルギー量を担保する(経口摂取単独に固執しない)。',
      cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』 / 内田『姿勢を意識した神経疾患患者の摂食嚥下』',
    },
  },
  {
    id: 'putamen-hemorrhage',
    title: '被殻出血・皮質下出血',
    subtitle: '高血圧性脳出血 — 急性期管理が決定的',
    icon: AlertCircle,
    gradient: 'from-rose-500 to-pink-700',
    brainEvent: {
      detail:
        '被殻出血:レンズ核線条体動脈外側枝からの出血。出血量により小型(<30 mL)・中型(30〜60 mL)・大型(>60 mL)に分類。中型以上では内包・視床・側脳室を圧迫し、片麻痺・意識障害・共同偏視(出血側を向く・健側を向くの2パターン)を生じる。皮質下出血:皮質直下の白質出血で、後頭葉なら同名半盲、頭頂葉ならUSN・失認、側頭葉なら失語などが加わる。',
      cite: '内田『姿勢から介入する摂食嚥下』 / 一般脳神経学',
    },
    systemicImpairment: {
      detail:
        '対側片麻痺・対側感覚障害・意識障害・共同偏視・対側半盲。大型出血では脳ヘルニアにより呼吸・循環不全・嚥下中枢の二次性障害を生じる。発症急性期(48〜72時間)は脳浮腫がピークで、症状が悪化することがある。',
      cite: '一般脳神経学',
    },
    swallowImpairment: {
      detail:
        '①意識障害により口腔期(食物認知・取り込み・咀嚼・送り込み)がほぼ機能しない。②咽頭期では嚥下反射の遅延・喉頭挙上不全・咽頭収縮不全が複合する。③急性期の脳浮腫進行中は、唾液誤嚥のリスクが高いため、頭部挙上と頻回吸引が必要。④回復期に入ると、皮質性麻痺の特徴(仮性球麻痺)が顕在化する。',
      cite: '内田『姿勢から介入する摂食嚥下』',
    },
    posturePoints: {
      detail:
        '①急性期(発症48〜72時間):脳浮腫管理優先。ベッド頭側30度挙上で頭蓋内圧を下げる。経口摂取は禁忌で、経管(経鼻胃管または経口胃管)で栄養を確保。②脳浮腫が落ち着き(発症3〜7日)バイタルが安定したら、ベッド上リクライニング30度+頚部前屈で嚥下評価を開始。③車椅子座位移行後はリクライニング45度を基本とする。④共同偏視がある場合、視野の中心に食事を配置する工夫が必要。',
      reason:
        '急性期は脳浮腫が悪化する仰臥位を避け、ベッド頭側30度挙上で頭蓋内圧コントロールと誤嚥予防を両立させる。回復期早期にリクライニング+頚部前屈を導入することで、廃用性嚥下機能低下を最小化する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』 / 脳卒中ガイドライン',
    },
    swallowPoints: {
      detail:
        '①意識レベルJCS 1桁(覚醒・指示理解可能)になったら嚥下評価を開始。RSST・MWST・FTで段階的に評価。②嚥下調整食コード0jから開始し、1日1食×3〜5g程度の少量で。③共同偏視・USN合併例では、患者の視野内(健側)から食事を提示。④口腔ケアは入院翌日から開始(意識レベルに関係なく)。',
      reason:
        '急性期から回復期への移行期で、安全な食形態と量を選択することで、廃用と誤嚥のバランスを取る。口腔ケアは意識障害があっても誤嚥性肺炎予防の最重要介入。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』 / 前田・髙畠『誤嚥性肺炎の包括的アプローチ』',
    },
    otherCautions: {
      detail:
        '①急性期は再出血予防のため血圧管理(収縮期140〜160mmHg目標)。激しい体動・くしゃみ・咳・努責は再出血誘因。②抗血栓薬は基本中止。③発症2週以内は離床のリスクと利益を主治医と慎重に検討。④回復期に入ったら早期からリハビリテーション(嚥下・口腔・上肢・歩行)を多職種で開始する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』 / 脳卒中ガイドライン',
    },
  },
  {
    id: 'cerebellum',
    title: '小脳・脊髄小脳変性症(SCA)',
    subtitle: '失調 — 食べ始められない・運ばれない',
    icon: Target,
    gradient: 'from-emerald-400 to-teal-600',
    brainEvent: {
      detail:
        '小脳は運動の協調・タイミング・力の調節を担う。後下小脳動脈(PICA)・前下小脳動脈(AICA)・上小脳動脈(SCA血管)の梗塞、または小脳出血、変性疾患(脊髄小脳変性症 SCA — マシャドジョセフ病など)で障害される。小脳虫部障害では体幹失調、半球障害では同側肢失調(dysmetria・dysdiadochokinesia)が起こる。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章 pp.86-89 (40歳代女性 SCA 16年経過例)',
    },
    systemicImpairment: {
      detail:
        '①体幹失調・座位保持困難・歩行失調。②四肢の運動失調(リーチング動作の精度低下・dysmetria)。③構音障害(scanning speech・断綴性発話)。④眼球運動障害(企図性振戦・断綴性追視)。⑤SCAでは緩徐進行性で、長期罹患により全身廃用が進む。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章',
    },
    swallowImpairment: {
      detail:
        '①口腔への取り込みが運動失調により困難(スプーン操作の精度低下)。②食塊形成・送り込みの順序が乱れ、咽頭に食塊が早期に流入(early spillage)。③嚥下のタイミング不良により、嚥下反射前に食塊が下咽頭に到達して誤嚥する。④口腔内残留・咽頭残留が多い。⑤声帯機能不全による咳嗽力低下で誤嚥物の喀出が困難。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章 pp.86-89',
    },
    posturePoints: {
      detail:
        '①ベッド上リクライニング30度+頭部前屈、または頚部後方支持。②頚部後方の過伸展が起こりやすいため、枕用バスタオルでフットボード側にずれ落ちないよう枕の下にバスタオルを置く(uchida-shinkei p.88 図示)。③体幹の左右動揺を防ぐため、腋窩〜体側面にバスタオルを充填。④四肢失調がある場合は、上肢を体幹のすぐ前(テーブル上)に置き、可動範囲を制限。⑤足底接地を確保し、下肢を内外旋しないよう支持。',
      reason:
        '体幹失調で自由座位では姿勢が定まらず、頸部・体幹の不要な動揺が嚥下のタイミングを乱す。外的支持で姿勢を「定位」することで、患者は嚥下に集中できる。リクライニング30度は重力で食塊を咽頭後壁沿いに送り、嚥下反射が遅延しても気道侵入を防ぐ。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章 pp.86-89',
    },
    swallowPoints: {
      detail:
        '①食形態は粘度の高いゼリー・ペースト(コード1j・2-1)で開始。粘性が低い液体は失調により口腔から咽頭への流入速度が制御できない。②一口量を厳格に制限(3〜5g)し、介助者がペースを管理。③嚥下指示(「ゴックンしましょう」)で嚥下反射を意図的に誘発する。④嚥下後の空嚥下で咽頭残留を清掃。⑤交互嚥下(固形+ゼリー)を併用。',
      reason:
        '失調による「予測できないタイミング」の食塊移送を、外的に制御する。粘性の高い食形態は流入速度を遅らせ、嚥下のタイミングを取る余裕を作る。一口量制限は誤嚥時の流入量最小化に直結する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章 / 小山『口から食べる幸せをサポート』',
    },
    otherCautions: {
      detail:
        '①SCAは進行性疾患のため、定期的(3〜6か月ごと)に嚥下機能の再評価が必要。②呼吸機能低下(横隔膜・呼吸筋の失調)を併発するため、胸郭可動域訓練・腹式呼吸訓練を併用。③発声・構音障害がある場合、本人の訴えが伝わりにくい。介助者は表情・手指のサインで食事中の苦痛を察知する。',
      cite: '内田『姿勢を意識した神経疾患患者の摂食嚥下』第4章',
    },
  },
  {
    id: 'brainstem',
    title: '脳幹・延髄外側症候群(Wallenberg)',
    subtitle: '球麻痺 — 嚥下中枢そのものの障害',
    icon: Wind,
    gradient: 'from-amber-400 to-orange-600',
    brainEvent: {
      detail:
        '延髄外側梗塞(Wallenberg症候群)は後下小脳動脈(PICA)または椎骨動脈の閉塞で起こる。延髄外側には疑核(Nucleus ambiguus — 嚥下・発声・咳の運動核)、孤束核(Nucleus tractus solitarius — 咽頭感覚求心性核)、三叉神経脊髄路核、前庭神経核、交感神経下行路、外側脊髄視床路が走行する。これらの障害により、嚥下中枢そのものの機能不全(球麻痺 bulbar palsy)が起こる。',
      cite: '内田『姿勢から介入する摂食嚥下』pp.36-37 / 内田『姿勢を意識した神経疾患患者の摂食嚥下』',
    },
    systemicImpairment: {
      detail:
        '①同側顔面の温痛覚低下、対側半身の温痛覚低下(交叉性感覚障害)。②同側の小脳失調・運動失調。③同側のHorner症候群(縮瞳・眼瞼下垂・無汗)。④回転性めまい・嘔気(前庭核障害)。⑤嗄声(声帯麻痺)・誤嚥・カーテン徴候(片側軟口蓋麻痺)。',
      cite: '内田『姿勢から介入する摂食嚥下』pp.36-37',
    },
    swallowImpairment: {
      detail:
        '①咽頭の感覚低下(食塊が咽頭にあっても感じない)、嚥下反射が起こらない・遅延する(孤束核障害)。②咽頭収縮筋の麻痺により、食塊が咽頭に残留(梨状陥凹残留)。③声帯麻痺により声門閉鎖が困難で、誤嚥が直接起こる(疑核障害)。④咳反射が低下し、エアスタックが困難で誤嚥物の喀出ができない。⑤片側性麻痺のため、健側咽頭は機能している。',
      cite: '内田『姿勢から介入する摂食嚥下』pp.36-37',
    },
    posturePoints: {
      detail:
        '①リクライニング座位30〜45度+頭部前屈。②頭頸部回旋:麻痺側に90度回旋する(Logemann)。これにより麻痺側梨状陥凹を物理的に潰し、食塊が健側梨状陥凹を通過するように誘導する。③または健側下の側臥位(健側を下にすると、重力で食塊が健側咽頭を通過)。④いずれも組み合わせ可能で、リクライニング45度+頭頸部回旋30度は誤嚥率が最も低い組み合わせ(太田 2011)。',
      reason:
        'Wallenberg症候群は「片側性の咽頭麻痺」が中核。健側咽頭は完全に機能しているため、食塊の通過経路を物理的に健側へ寄せる代償戦略が極めて有効。Logemannの研究では麻痺側回旋で口腔咽頭通過時間(OPTT)が有意に短縮することが示されている。',
      cite: '内田『姿勢から介入する摂食嚥下』pp.78-79 / Logemann JA. Clin Commun Disord 1993 / 太田勘久夫ほか. Jpn Compr Rehabil Sci 2011',
    },
    swallowPoints: {
      detail:
        '①食形態:咽頭感覚低下があるため、付着性の少ないゼリー(コード0j・1j)から開始。粘度の高すぎるペーストは咽頭残留を増やす。②冷却刺激(冷水・冷却ゼリー)で咽頭感覚を賦活。レモン・酸味で唾液分泌・嚥下反射を促通。③Mendelsohn手技(嚥下時に喉頭挙上を意識的に保持)・努力嚥下(effortful swallow)で咽頭収縮を強める。④Shaker法(頭部挙上訓練)で舌骨上筋群を強化。⑤食事終了時はお茶ゼリーで咽頭を清掃。',
      reason:
        '球麻痺では嚥下中枢そのものが障害されているため、感覚入力を増やし、随意的な代償手技で残存機能を最大化する戦略が必要。Mendelsohn手技は喉頭挙上を保持することで上食道括約筋の開大時間を延長し、咽頭残留を減らす。',
      cite: '内田『姿勢から介入する摂食嚥下』pp.78-79 / 小山『口から食べる幸せをサポート』pp.111, 131',
    },
    otherCautions: {
      detail:
        '①声帯麻痺・咳反射低下があるため誤嚥に気づきにくい。SpO₂・湿性嗄声を毎食観察。②不顕性誤嚥のVEモニタリング(可能な限り週1回程度)。③回復期早期からのShaker法・Mendelsohn手技の訓練が予後を左右する。④嚥下機能の予後は数か月〜数年で部分回復することが多く、悲観しすぎず継続的訓練を行う。⑤呼吸理学療法(咳介助・呼吸筋トレ)を必ず併用。',
      cite: '内田『姿勢から介入する摂食嚥下』 / 小山『口から食べる幸せをサポート』',
    },
  },
  {
    id: 'pseudobulbar',
    title: '両側半球障害(仮性球麻痺)',
    subtitle: '多発脳梗塞・両側皮質障害',
    icon: Layers,
    gradient: 'from-violet-400 to-purple-600',
    brainEvent: {
      detail:
        '両側の皮質または内包を通る皮質球路(corticobulbar tract)の障害により、上位運動ニューロン障害として球機能不全が起こる。多発ラクナ梗塞・両側皮質下白質病変(白質脳症)の累積でも生じる。下位運動ニューロン(脳幹核)は保たれているため、反射機能は残存する。',
      cite: '内田『姿勢から介入する摂食嚥下』 / 一般脳神経学',
    },
    systemicImpairment: {
      detail:
        '①両側性の上位運動ニューロン徴候(両側深部腱反射亢進・両側Babinski)。②強制泣き笑い(pseudobulbar affect)。③構音障害(舌・口唇のぎこちない運動)。④認知機能低下(多発梗塞による血管性認知症の合併)。⑤歩行障害(マルシュ・パ・プチ・歩行)。',
      cite: '一般脳神経学',
    },
    swallowImpairment: {
      detail:
        '①舌・口唇・軟口蓋・咽頭の自発運動の精度低下(意識的に動かそうとすると拙劣)。②反射的嚥下は保たれるため、自動的に出される嚥下反射は機能。③口腔への取り込み・咀嚼・送り込みの随意運動が遅く、ぎこちない。④嚥下反射開始のタイミングが遅延。⑤液体での誤嚥が顕著。',
      cite: '内田『姿勢から介入する摂食嚥下』',
    },
    posturePoints: {
      detail:
        '①リクライニング座位30〜45度+頚部前屈を基本とする。②認知機能低下があるため、声かけ(「お食事です」)・視覚提示(食器を視野中央に)で食事認知を促す。③体幹支持を確実にし、自由座位での頸部後屈を防ぐ。④強制泣き笑いがあっても食事に集中できるよう、刺激的な会話・テレビなどは避ける。',
      reason:
        '上位運動ニューロン障害では、随意運動はぎこちなくても反射運動は保たれる。リクライニング+頚部前屈で「反射的嚥下」が起こりやすい姿勢を整え、随意運動の不全を代償する。環境刺激を減らすと注意の分配障害による誤嚥を減らせる。',
      cite: '内田『姿勢から介入する摂食嚥下』 / 小山『口から食べる幸せをサポート』',
    },
    swallowPoints: {
      detail:
        '①食形態:粘度の高いゼリー・ペースト(コード1j・2-1)。液体はとろみを必ず付ける(中間〜濃いとろみ)。②一口量5〜10g、ペースをゆっくり。③嚥下指示(「ゴックン」)で意識的な嚥下を促す。④反射的嚥下を引き出すため、冷却ゼリー・酸味のあるゼリーを開始時に用いる。⑤口腔残留・咽頭残留が多いので、空嚥下と交互嚥下を併用。',
      reason:
        '随意運動はぎこちないが反射運動は保たれているため、感覚刺激(冷却・酸味)で反射的嚥下を引き出す戦略が有効。とろみは咽頭通過速度を遅らせ、遅延した嚥下反射が間に合うように調整する。',
      cite: '内田『姿勢から介入する摂食嚥下』 / 小山『口から食べる幸せをサポート』pp.111, 131',
    },
    otherCautions: {
      detail:
        '①血管性認知症を合併することが多く、食事認知・指示理解・服薬管理に支障。介助者の見守りと声かけが必須。②強制泣き笑いを「精神症状」と誤解せず、神経症状として受容する。③脳血管リスク管理(降圧・抗血栓・脂質・糖尿病)で再発予防が重要。④口腔ケアの徹底(口腔機能低下の進行予防)。',
      cite: '内田『姿勢から介入する摂食嚥下』',
    },
  },
]

interface VisibleSection {
  key: 'brainEvent' | 'systemicImpairment' | 'swallowImpairment' | 'posturePoints' | 'swallowPoints' | 'otherCautions'
  number: number
  label: string
}

const SECTION_DEFS: VisibleSection[] = [
  { key: 'brainEvent', number: 1, label: '脳内で起こっていること' },
  { key: 'systemicImpairment', number: 2, label: 'それによる全身的な障害' },
  { key: 'swallowImpairment', number: 3, label: 'それによる咀嚼・嚥下の障害' },
  { key: 'posturePoints', number: 4, label: '全身的な姿勢のポイント' },
  { key: 'swallowPoints', number: 5, label: '咀嚼・嚥下のポイント' },
  { key: 'otherCautions', number: 6, label: 'その他の注意事項' },
]

export function StrokePage() {
  const [openId, setOpenId] = useState<string | null>(REGIONS[0].id)

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-2">
        <Link
          to="/diseases"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="疾患一覧へ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">脳卒中</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            障害部位別の摂食嚥下障害と、姿勢・食形態・介助のポイント
          </p>
        </div>
      </div>

      {/* 概要 */}
      <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-4 dark:border-red-900/40 dark:from-red-950/40 dark:to-rose-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Activity size={16} className="text-red-600 dark:text-red-300" />
          <h3 className="text-sm font-bold text-red-700 dark:text-red-200">障害部位を「ボタン」で選んで学ぶ</h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          脳卒中の摂食嚥下障害は、{' '}
          <strong>「障害部位」と「責任血管」によって障害パターンが大きく異なります</strong>。
          下のボタンから関心のある部位を選ぶと、6つの観点で詳細を確認できます: ① 脳内で起こっていること → ② 全身的な障害 → ③ 咀嚼・嚥下の障害 → ④ 姿勢のポイント → ⑤ 咀嚼・嚥下のポイント → ⑥ その他の注意事項。
          すべての記載に「なぜそうするのか(根拠)」と参考文献を付けています。
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] leading-relaxed">
          {[
            ['🧠', '皮質性麻痺(MCA)→片麻痺・USN・失語'],
            ['⚡', '基底核 → 不顕性誤嚥が中心'],
            ['💫', '視床 → 覚醒・感覚障害'],
            ['🩸', '被殻/皮質下出血 → 急性期管理'],
            ['🎯', '小脳/SCA → 運動失調による嚥下'],
            ['💨', '延髄外側 → Wallenberg(球麻痺)'],
            ['🔄', '両側半球 → 仮性球麻痺'],
          ].map(([emoji, text]) => (
            <div
              key={text}
              className="flex items-center gap-1 rounded-lg bg-white/60 px-2 py-1 dark:bg-red-950/60"
            >
              <span>{emoji}</span>
              <span className="text-red-900 dark:text-red-100">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 全身の状況から障害部位を想定する一覧 */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <AlertCircle size={16} className="text-amber-500" />
          全身の状況から、障害部位を想定する
        </h3>
        <div className="mb-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[10px] leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <strong>注意:</strong>{' '}
          以下は症候から障害部位を「想定する」ためのおおよその対応表です。{' '}
          <strong>正確な障害部位は、必ず医師の画像所見・診断記載を参照してください。</strong>{' '}
          ベッドサイドでの観察と診断記録を突き合わせて学習するための一覧です。
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <table className="w-full text-[11px]">
            <thead className="bg-gradient-to-r from-rose-100 to-red-100 dark:from-rose-900/40 dark:to-red-900/40">
              <tr>
                <th className="px-2 py-2 text-left font-bold text-gray-900 dark:text-gray-100">
                  全身の状況・症候
                </th>
                <th className="px-2 py-2 text-left font-bold text-gray-900 dark:text-gray-100">
                  想定される部位
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                {
                  signs:
                    '対側片麻痺(上肢優位)+ 失語(優位半球)or 半側空間無視(劣位半球)+ 同名半盲、口角からの食物こぼれ、軟口蓋挙上不全',
                  region: '大脳皮質(中大脳動脈領域)',
                  badge: 'cortex-mca',
                },
                {
                  signs:
                    '純粋運動性片麻痺・dysarthria-clumsy hand症候群・パーキンソニズム合併、夜間の不顕性誤嚥が主、咳反射閾値上昇',
                  region: '大脳基底核(被殻・尾状核)',
                  badge: 'basal-ganglia',
                },
                {
                  signs:
                    '対側半身の感覚障害(視床痛)+ 軽度片麻痺、覚醒度低下、注意障害、立ち直り反応の低下',
                  region: '視床',
                  badge: 'thalamus',
                },
                {
                  signs:
                    '急性発症の片麻痺・意識障害・共同偏視、急性期の頭蓋内圧亢進、回復期に仮性球麻痺へ移行',
                  region: '被殻出血・皮質下出血',
                  badge: 'putamen-hemorrhage',
                },
                {
                  signs:
                    '体幹失調・四肢の運動失調(dysmetria)・scanning speech・眼振、座位保持困難、リーチング動作の精度低下',
                  region: '小脳・脊髄小脳変性症(SCA)',
                  badge: 'cerebellum',
                },
                {
                  signs:
                    '同側顔面の温痛覚低下 + 対側半身の温痛覚低下(交叉性感覚障害)+ 同側Horner症候群 + 嗄声 + カーテン徴候、回転性めまい・嘔気',
                  region: '脳幹・延髄外側症候群(Wallenberg)',
                  badge: 'brainstem',
                },
                {
                  signs:
                    '両側痙性麻痺・強制泣き笑い・構音障害(三徴)、舌の運動制限、丸呑み・かき込み、認知機能低下を併発',
                  region: '両側半球障害(仮性球麻痺)',
                  badge: 'pseudobulbar',
                },
              ].map((row) => (
                <tr key={row.badge} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-2 py-2 align-top leading-relaxed text-gray-700 dark:text-gray-300">
                    {row.signs}
                  </td>
                  <td className="px-2 py-2 align-top text-[10px] font-bold leading-relaxed text-rose-700 dark:text-rose-300">
                    → {row.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
          症候は単独ではなく複数併発することが多く、また病巣サイズ・既往により症状の重みが異なります。下のボタンから各部位の詳細(6項目)を確認してください。
        </p>
      </div>

      {/* 障害部位ボタン群 */}
      <div className="space-y-3">
        {REGIONS.map((r) => {
          const Icon = r.icon
          const isOpen = openId === r.id
          return (
            <div
              key={r.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : r.id)}
                className={`flex w-full items-center gap-3 bg-gradient-to-r ${r.gradient} p-3 text-left text-white transition-all`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold leading-tight">{r.title}</div>
                  <div className="text-[10px] italic opacity-90">{r.subtitle}</div>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 p-4">
                  {SECTION_DEFS.map(({ key, number, label }) => {
                    const sec = r[key]
                    return (
                      <div
                        key={key}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/40"
                      >
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 text-[11px] font-black text-white">
                            {number}
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                            {label}
                          </h4>
                        </div>
                        <p className="pl-7 text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
                          {sec.detail}
                        </p>
                        {'reason' in sec && (
                          <div className="ml-7 mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                            <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              なぜそうするのか
                            </div>
                            <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                              {(sec as { reason: string }).reason}
                            </p>
                          </div>
                        )}
                        <p className="ml-7 mt-1.5 text-[10px] italic text-gray-500 dark:text-gray-400">
                          [出典: {sec.cite}]
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 共通エビデンス */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 size={14} />
          共通する代償戦略のエビデンス
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-100">
          <li>
            • <strong>リクライニング座位45°</strong> は90°より誤嚥率が有意に低い(Park BH et al. <em>Yonsei Med J</em> 54:1137, 2013)
          </li>
          <li>
            • <strong>頚部屈曲位</strong> で誤嚥が <strong>55%減少</strong>(Terre R et al. <em>Neurogastroenterol Motil</em> 24:414, 2012)
          </li>
          <li>
            • <strong>リクライニング45° + 頭頸部回旋30°</strong> の組み合わせで誤嚥率が最も低い(太田勘久夫ほか. <em>Jpn Compr Rehabil Sci</em> 2:36, 2011)
          </li>
          <li>
            • Wallenberg症候群では <strong>麻痺側に90°回旋</strong> で口腔咽頭通過時間が短縮(Logemann JA. <em>Clin Commun Disord</em> 3:110, 1993)
          </li>
          <li>
            • 大脳基底核領域梗塞では夜間の <strong>不顕性誤嚥が増加</strong>(Nakagawa T et al. <em>Arch Intern Med</em> 10:321, 1997)
          </li>
        </ul>
      </div>

      {/* 視野障害への配慮 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-blue-800 dark:text-blue-200">
          <Eye size={14} />
          視野障害(同名半盲・USN)への食事配置
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-blue-900 dark:text-blue-100">
          <li>• 食器は <strong>健側</strong> に配置(まず確実に食べてもらう)</li>
          <li>• 慢性期のリハビリ目的では患側にも配置し、視野探索の訓練にする</li>
          <li>• 介助者は健側ではなく <strong>患側</strong> から声かけして患側への注意を促す</li>
          <li>• 食器の色のコントラストを明確に(白い皿+色のある料理)</li>
        </ul>
      </div>

      {/* 注意 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• 部位別解説は教科書の主要記載をまとめたものですが、実臨床では病巣サイズ・既往・全身状態で大きく異なります。</li>
          <li>• 不顕性誤嚥はどの部位の脳卒中でも起こり得る。「むせがない=安全」と判断しない。</li>
          <li>• リクライニング角度・頭頸部回旋の選択は、VE/VFで個別に検証することが望ましい。</li>
          <li>• 急性期は脳浮腫・再出血リスク管理が最優先。経口摂取再開は主治医・摂食嚥下チームの合議で。</li>
          <li>• 口腔ケアは入院翌日から実施(意識レベルに関係なく、誤嚥性肺炎予防の最重要介入)。</li>
        </ul>
      </div>

      <TextbookReferenceList
        citedIds={[
          'uchida_shinkei',
          'uchida_shisei',
          'koyama_kuchi',
          'koyama_jissen1',
          'koyama_jissen2',
          'wakabayashi_koreisha',
          'takabatake_goen',
        ]}
      />

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページは内田学(編著)『姿勢を意識した神経疾患患者の食べられるポジショニング』(メジカルビュー社, 2019)、内田学(編著)『姿勢から介入する摂食嚥下』、小山珠美ほか各書を主参考文献としてまとめた学習補助です。実際の臨床応用は患者個別の病巣・全身状態・施設方針に従い、主治医・摂食嚥下リハビリテーションチームの判断のもとに行ってください。
        </p>
      </div>
    </div>
  )
}
