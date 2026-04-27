import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Wind,
  AlertCircle,
  Clock,
  Activity,
  Stethoscope,
  Layers,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { TextbookReferenceList } from '../../components/domain/TextbookReferenceList'

interface Section {
  id: string
  title: string
  icon: typeof Clock
  gradient: string
  intro: string
  reasonHeadline?: string
  items: { title: string; detail: string; reason: string; cite: string }[]
}

const SECTIONS: Section[] = [
  {
    id: 'rationale',
    title: 'A. 早期経口摂取が推奨される根拠',
    icon: Activity,
    gradient: 'from-rose-400 to-red-600',
    intro:
      '誤嚥性肺炎では「絶食して肺炎を治してから食事再開」というかつての常識から、「肺炎治療と並行して早期に経口摂取を再開する」へと潮流が変わっている。絶食の継続自体が予後を悪化させるためである。',
    items: [
      {
        title: '絶食による嚥下機能低下(廃用)',
        detail:
          '絶食期間が長くなるほど咀嚼・嚥下に関連する筋(咬筋・舌筋・咽頭収縮筋・舌骨上下筋群)が廃用性に萎縮する。さらに口腔感覚も鈍くなり、嚥下反射の閾値が上昇する。再開時に「飲み込めない・むせる」となり、再開困難となる悪循環。',
        reason:
          '嚥下は反復学習で維持される運動。「使わなければ衰える」という骨格筋の原則は嚥下関連筋にも当てはまる。1週間の絶食でも明らかな機能低下を生じることが報告されている。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.4-5',
      },
      {
        title: '絶食による低栄養と免疫低下',
        detail:
          '禁食中の栄養投与量は1日あたり0.8kcal/kg以下と低く、目標エネルギー量(25〜30kcal/kg/日)を達成できない例が多い。この負のエネルギーバランスが筋蛋白異化を進め、骨格筋・呼吸筋の萎縮(サルコペニア合併)・免疫機能低下を招く。',
        reason:
          '低栄養は感染防御・組織修復・嚥下機能のすべてを下げる。誤嚥性肺炎の治癒そのものを遅らせ、再発リスクを上げる「絶食の弊害」の中核。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.4-7',
      },
      {
        title: '絶食による全身廃用(HAD: Hospitalization-Associated Disability)',
        detail:
          'HADは高齢入院患者の約30%に発生し、身体機能・歩行能力・ADL低下、認知機能低下、合併症増加、在院日数増加、自宅復帰率減少、死亡率増加、QOL低下を引き起こす。一度HADを発症すると、70%の患者はもとの生活機能レベルにまでは回復しない(Covinsky KE et al. JAMA 2011)。',
        reason:
          '「食事を食べる」という行為自体が、起立・上肢使用・口腔運動・嚥下運動・覚醒の総合トレーニングになっている。絶食はこれらすべての機会を奪う。「無意味な安静と絶飲食を是正する!負の連鎖を断ち切る」が現代の標準。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』pp.084-091 / 近藤『誤嚥性肺炎に対する早期リハビリテーション』(若林編)p.128',
      },
      {
        title: '禁食中の栄養投与量は目標の1/3以下',
        detail:
          '本邦DPCデータ約66,000例の解析では、入院初日に食事提供されなかった患者のうち、入院3日目時点で約7割、7日目で約4割、14日目でも約4割が禁食を継続。禁食中の栄養投与量は入院7日目で平均約8 kcal/kg/日(必要量25〜30 kcal/kg/日の1/3以下)、アミノ酸も平均0.3 g/kg/日(必要量0.8〜1.2 g/kg/日)で大幅不足(Maeda K et al. Arch Geriatr Geront 2021)。',
        reason:
          'Permissive underfeedingの時期は約1週間で終わるべきだが、現実には大幅に下回っている。負のエネルギーバランスが筋蛋白異化と免疫低下を加速させる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』pp.087-089',
      },
      {
        title: '早期経口摂取と予後改善',
        detail:
          '本邦のリアルワールドデータ(DPCデータ)では、入院後3日以内に経口摂取を開始した例が約48%を占め、4〜6日(13%)、7〜14日(13%)、14日以上(10%)に比べて、早期再開群では死亡率の低下と退院時ADLの保持が報告されている。Maeda et al.(2017)らも同様の結果を示す。',
        reason:
          '早期経口摂取群では低栄養・廃用・サルコペニア進行を最小化できるため、肺炎治癒後のリハビリ立ち上がりが速い。経腸栄養より経口摂取の方が腸管粘膜免疫を維持しやすい点もメカニズムの一つ。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.6-7 図2・図3',
      },
    ],
  },
  {
    id: 'timing',
    title: 'B. 食事開始のタイミング',
    icon: Clock,
    gradient: 'from-amber-400 to-orange-600',
    intro:
      '「いつ再開するか」は施設や個別の判断に大きく影響を受けるが、現在のエビデンスは「バイタル・呼吸状態が安定すれば、抗菌薬投与中であっても可及的早期(目安:発症3日以内)」を支持する。',
    items: [
      {
        title: '入院後3日以内を目標とする',
        detail:
          '本邦のDPCデータベース解析では、誤嚥性肺炎入院患者の約半数(48%)が入院後3日以内に経口摂取を開始している。「3日以内」を一つの目標として、バイタル安定後ただちに嚥下評価とリスク管理に進む。',
        reason:
          '4日以上絶食が続くと嚥下機能の廃用・低栄養が顕在化し、再開そのものが困難になる悪循環に入る。逆に3日以内なら大半の患者で嚥下機能が保たれており、安全に再開できる可能性が高い。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.6-7',
      },
      {
        title: '開始可能な臨床基準(Kenzaka 2017 全国350施設調査)',
        detail:
          '医師が経口摂取再開の指標として重要視している項目(回答率): ① 意識レベル 89.7%、② SpO₂ 88.0%、③ 主治医の裁量 66.0%、④ 体温 63.4%、⑤ 嚥下機能評価実施 58.0%、⑥ 精神状態 55.4%、⑦ 呼吸数 51.1%(Kenzaka et al. Geriatr Gerontol Int 2017)。実用基準としては、SpO₂が酸素投与下で94%以上、体温38℃未満、呼吸数24/分以下、覚醒(JCS 1桁)が並ぶことを目安とする。',
        reason:
          '酸素飽和度を安定して高く保てるかどうかは、経口摂取再開の指標として最も妥当。一方、入院時点で意識レベルが食物認知を妨げるほど低下している患者は約3割のみで、「意識レベル低下を理由に3〜7日間止める」のは過剰。抗菌薬で炎症が制御されれば嚥下機能(咽頭感覚・反射)も同時に改善する。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』p.086 表1 / Kenzaka et al. 2017',
      },
      {
        title: '抗菌薬投与中でも開始する根拠',
        detail:
          '「抗菌薬中は絶食」という慣習に医学的根拠は乏しい。経口摂取と抗菌薬投与は両立する。重要なのは、嚥下機能評価で「現時点で安全に飲み込めるレベル」を判定し、それに見合った形態(嚥下調整食)で再開することである。',
        reason:
          '抗菌薬を完了するまで絶食すると、平均10〜14日の絶食期間となる。この間に廃用・低栄養が進み、抗菌薬完了時点では「治癒したのに食べられない」状態になる。早期再開は抗菌薬の効果と独立の介入価値を持つ。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.5-6',
      },
    ],
  },
  {
    id: 'assess',
    title: 'C. ベッドサイド嚥下評価の手順',
    icon: Stethoscope,
    gradient: 'from-cyan-400 to-blue-600',
    intro:
      '経口摂取再開には、安全性を担保するための嚥下評価が必須。VEやVFを待たず、ベッドサイドで実施可能なスクリーニングから入る。',
    items: [
      {
        title: '反復唾液嚥下テスト(RSST)',
        detail:
          '30秒間に何回唾液を嚥下できるかを数える。3回未満で誤嚥リスクあり。指で甲状軟骨に触れ、上下動を確認する。',
        reason:
          '簡便かつ侵襲ゼロで、嚥下反射の頻度・運動範囲を評価できる。最初のスクリーニングとして適切。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8 表2 / 学会標準',
      },
      {
        title: '改訂水飲みテスト(MWST)',
        detail:
          '冷水3mLをシリンジで口腔底に注ぎ、嚥下反射の有無、むせ、呼吸変化、湿性嗄声を観察する。5段階(1:嚥下なし→5:正常)で評価し、4以上で次の段階(FT)へ。',
        reason:
          '少量・冷却・口腔底注入で誤嚥リスクを最小化しつつ、咽頭期嚥下の安全性を確認できる。冷水は咽頭感覚を賦活する効果もある。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8 / 学会標準',
      },
      {
        title: 'フードテスト(FT)',
        detail:
          'ティースプーン1杯(約4g)のプリン状食品を口腔内に運び、嚥下動態と口腔残留を観察する。MWSTで4以上が確認できた症例で実施する。',
        reason:
          '実際の食物を用いるため、唾液・水とは異なる「食塊形成・口腔保持・送り込み」の能力を評価できる。経口摂取の再開段階では必須。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8',
      },
      {
        title: 'VE(嚥下内視鏡)・VF(嚥下造影)を追加する基準',
        detail:
          'ベッドサイド評価で不顕性誤嚥が疑われる、湿性嗄声・SpO₂低下が断続的にみられる、形態のステップアップで毎回むせが出るなどの場合は、VEまたはVFを追加する。VEはベッドサイドで実施可能で被曝なし、VFは食塊の通過全体を可視化できる。',
        reason:
          'ベッドサイド評価では不顕性誤嚥(silent aspiration)を見落とすリスクがある。客観的画像評価により安全な食形態・姿勢・代償手技を決定でき、再発予防につながる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.8-9',
      },
    ],
  },
  {
    id: 'progression',
    title: 'D. 段階的食上げ(嚥下調整食学会分類2021)',
    icon: Layers,
    gradient: 'from-emerald-400 to-teal-600',
    intro:
      '日本摂食嚥下リハビリテーション学会の嚥下調整食学会分類2021に基づき、コード0jから段階的にステップアップする。1日1〜3食の試行→食事のリスク管理→ステップアップ判断のサイクルを回す。',
    items: [
      {
        title: 'コード0j(嚥下訓練食:ゼリー)',
        detail:
          '均質で付着性・凝集性・かたさに配慮したゼリー。離水が少なく、スプーンですくった時の形状が保たれる。最初の経口摂取トライアル(1日1回・小スプーン1〜2杯)に用いる。',
        reason:
          '凝集性が高いゼリーは咽頭通過時に分散しにくく、誤嚥した場合でも肺へ流入する量が少ない。「最も安全」な食形態として開始食に位置付けられる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8 / 学会分類2021',
      },
      {
        title: 'コード1j・2-1・2-2(均質性のあるピューレ・ペースト)',
        detail:
          'コード1j:均質なゼリー・プリン・ムース状で「j」はゼリー状を示す。コード2:ピューレ・ペースト・ミキサー食で「均質でなめらか・離水なし(2-1)」「不均質でやや粒あり(2-2)」。',
        reason:
          '咀嚼能力低下例でも食塊形成が容易で、咽頭通過時の凝集性が保たれる。コード0jで安全に飲み込めることを確認後にステップアップする。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8 / 学会分類2021',
      },
      {
        title: 'コード3・4(舌で押しつぶせる・歯ぐきで噛める)',
        detail:
          'コード3:舌でつぶせるかたさで、口腔内で容易に食塊形成可能。コード4:歯ぐきで噛める〜ふつうの食事に近い。むせなく食べられること、口腔残留が少ないことを確認しながらステップアップ。',
        reason:
          '咀嚼を必要とする形態は、口腔・舌・頬の運動を賦活するリハビリ刺激でもある。安全に食べられる範囲では、より咀嚼の必要な形態を提供することが嚥下機能の維持・回復に繋がる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.8 / 学会分類2021',
      },
      {
        title: '経口摂取と補完的静脈栄養の併用',
        detail:
          '経口摂取単独では十分な栄養を確保できない時期(再開直後〜1週)は、経口摂取+補完的静脈栄養(末梢点滴または中心静脈栄養)で目標エネルギー量を確保する。経口で1日100〜200kcal摂取できれば、残りを点滴で補う方針。',
        reason:
          '「経口で食べられないから絶食+点滴」ではなく、「食べられる範囲で食べる+足りない分を点滴で補う」が現代の標準。経口摂取のリハビリ刺激を維持しながら栄養も確保できる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.8-9',
      },
      {
        title: '1日の摂取回数・量・観察',
        detail:
          '開始期は1日1〜2食(朝・昼)、各食100〜200mL程度の少量から。観察項目は ①バイタル(発熱・SpO₂)、②痰の量・性状、③胸部聴診、④むせ・湿性嗄声・口腔残留、⑤食事所要時間、⑥意欲。問題なければ翌日もう1食追加→量・形態のステップアップ。',
        reason:
          '少量から始める理由は、誤嚥が起こっても影響が最小限になるため。バイタルや痰の変化を毎食モニタリングすることで、再発兆候を早期に捉えられる。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 pp.8-9',
      },
    ],
  },
  {
    id: 'safety',
    title: 'E. 安全策(代償戦略)',
    icon: ShieldCheck,
    gradient: 'from-violet-400 to-purple-600',
    intro:
      '食上げ・量・回数だけでなく、姿勢・一口量・嚥下手技などの代償戦略を組み合わせることで、安全マージンを確保する。',
    items: [
      {
        title: 'リクライニング角度45度(エビデンス最強)',
        detail:
          'リクライニング座位90度と45度をPAS(Penetration Aspiration Scale)で比較したVF研究で、45度のリクライニング座位の方が有意に誤嚥率が減少することが報告されている(Park BH et al. Yonsei Med J 2013)。さらに、リクライニング45度+頭頸部回旋30度の組み合わせで誤嚥率が最も低くなる(太田勘久夫ほか. Jpn Compr Rehabil Sci 2011)。急性期は30度〜45度から開始し、座位耐久性が向上したら60〜90度へ漸増。',
        reason:
          'リクライニング45度では咽頭後壁に沿って重力が働くことで、気道と食道の解剖学的位置関係から誤嚥しにくくなる。嚥下反射遅延者にも有効。粘性の高い食塊と低い食塊では作用が異なるため、すべての条件で「45度が最適」とは言えないが、開始時のデフォルト角度として45度を選ぶのが安全。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』 / 内田『姿勢から介入する摂食嚥下』pp.76-77',
      },
      {
        title: '頚部前屈で誤嚥55%減 ・ 健側下',
        detail:
          '頚部屈曲位は舌根が咽頭後壁に近づくことで中下咽頭を狭くさせ、咽頭部の圧を高めて嚥下運動を助ける。脳卒中急性期・外傷性脳損傷患者で頚部屈曲位により誤嚥が55%減少と報告されている(Terre R et al. Neurogastroenterol Motil 2012)。Wallenberg症候群・球麻痺では麻痺側に90度回旋した方が嚥下しやすい(Logemann)。ただし著しい頚部屈曲は前頚部筋群の緊張で喉頭挙上を妨げるため過剰な屈曲は避ける。',
        reason:
          '頚部前屈は喉頭蓋・声門の閉鎖を促し、誤嚥防止の最も簡便で効果的な代償手技。頭頸部回旋は回旋側の梨状陥凹を潰すことで食塊移送を減少させ、障害側で起こる嚥下障害を非障害側で代償する。',
        cite: '内田『姿勢から介入する摂食嚥下』pp.78-79 / Terre R 2012, Logemann 1993',
      },
      {
        title: '一口量5〜10g(small bolus)とペーシング',
        detail:
          '一口量を多くしすぎると咽頭処理困難、少なすぎると嚥下反射惹起しにくい。目安は5〜10g(窒息に注意)。1口ごとに空嚥下→次の1口を意識する。「大スプーンで握って食べる、一口量が多い、摂食ペースが早い」は誤嚥性肺炎のトリガー。早食いを避け、1食20〜30分かけて食べる。',
        reason:
          '一口量を制限することで、誤嚥した場合の流入量を最小化できる。空嚥下(複数回嚥下)は咽頭残留を清掃し、次の食塊が誤嚥するリスクを下げる。覚醒度が低い患者では「次の一口で咀嚼を促す」追加嚥下手法も有効。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』 / 小山『口から食べる幸せをサポート』p.131',
      },
      {
        title: '交互嚥下・複数回嚥下・横向き嚥下',
        detail:
          '交互嚥下:固形食(ペースト)とゼリー・とろみ水を交互に嚥下し、咽頭残留を洗い流す。複数回嚥下:1口に対して2〜3回嚥下を繰り返す。横向き嚥下:頭部を一側に向けて嚥下し、健側梨状窩を通過させる。',
        reason:
          '咽頭残留は次の食塊の誤嚥源となる。代償手技で残留を清掃しながら食事を進めることで、累積誤嚥量を抑える。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.10',
      },
      {
        title: '食後30〜60分の上体挙上保持',
        detail:
          '食後すぐに横にせず、リクライニング30度以上を最低30分(可能なら60分)保つ。胃食道逆流による微小誤嚥(silent aspiration)を防ぐ目的。',
        reason:
          '食道下部括約筋の機能低下や胃排出遅延がある高齢者では、仰臥位で胃内容物の逆流が起こりやすい。逆流物の不顕性誤嚥は誤嚥性肺炎の重要な再発機序。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.10 表2',
      },
      {
        title: '口腔ケアの徹底(食前・食後)',
        detail:
          '食前は口腔感覚の覚醒(冷水含嗽・歯ブラシ刺激)、食後は食物残渣・痰の除去を目的に口腔ケアを行う。歯ブラシ・粘膜ブラシ・口腔保湿剤を組み合わせる。',
        reason:
          '誤嚥性肺炎の起因菌は口腔常在菌が中心。口腔内細菌量を減らせば、たとえ微量誤嚥が起きても肺炎発症リスクを下げられる。「口腔ケアで肺炎発症が4割減る」とのエビデンスもある。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.10 表2',
      },
    ],
  },
  {
    id: 'stop',
    title: 'F. 中止基準・再評価のタイミング',
    icon: AlertCircle,
    gradient: 'from-red-400 to-rose-600',
    intro:
      '経口摂取再開後にむせ・SpO₂低下・発熱再燃・湿性嗄声などのサインが出たら、無理に続けず一時中断し再評価する。',
    items: [
      {
        title: '中止すべきサイン',
        detail:
          '① 食事中・食後にSpO₂が3%以上低下しベースに戻らない、② 連続したむせ(同一食事内で3回以上)、③ 食後の湿性嗄声(咽頭残留示唆)、④ 食事再開後の発熱再燃(38℃以上)、⑤ 痰の急増・性状悪化、⑥ 胸部聴診で副雑音出現、⑦ 嗜眠・覚醒度低下。これらのいずれかで一時中断し、再評価する。',
        reason:
          '不顕性誤嚥は症状が乏しいことが多く、SpO₂・痰の性状・聴診音などの間接所見を組み合わせて検出する。「むせがない=安全」ではないことを徹底する。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.10 表2',
      },
      {
        title: '一時中断後の再開判断',
        detail:
          'バイタル(特にSpO₂・体温)・聴診・嚥下スクリーニング(RSST/MWST/FT)を再実施。改善があれば、前回より一段階下の食形態(例:コード2→1j)・少量(半量)・少回数(1日1食)から再開する。',
        reason:
          '中断後は嚥下機能が一段低下している可能性があり、同じ条件で再開すると再発リスクが高い。「下げてから安全に上げ直す」のが原則。',
        cite: '前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章 p.10',
      },
    ],
  },
]

export function AspirationPneumoniaPage() {
  const [openId, setOpenId] = useState<string | null>(SECTIONS[0].id)

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
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">誤嚥性肺炎</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            食事の開始時期 — 早期経口摂取の根拠と実践
          </p>
        </div>
      </div>

      {/* 概要 */}
      <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-4 dark:border-sky-900/40 dark:from-sky-950/40 dark:to-cyan-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Wind size={16} className="text-sky-600 dark:text-sky-300" />
          <h3 className="text-sm font-bold text-sky-700 dark:text-sky-200">食事の開始時期</h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          かつては「肺炎が治ってから食事再開」が常識でしたが、現在は{' '}
          <strong>「肺炎治療と並行して、可及的早期に経口摂取を再開する」</strong>{' '}
          が標準的な考え方です。本邦のリアルワールドデータ(DPC)では、誤嚥性肺炎入院患者の約{' '}
          <strong>48%が入院後3日以内に経口摂取を開始</strong>{' '}
          しています。バイタル安定後の嚥下評価と段階的食上げが、廃用・低栄養・サルコペニア進行を防ぎ、予後改善につながります。
        </p>
        <p className="mt-2 rounded-lg bg-white/60 p-2 text-[11px] leading-relaxed text-sky-900 dark:bg-sky-950/60 dark:text-sky-100">
          <strong>このページで学ぶこと:</strong> 早期経口摂取の根拠 → 開始タイミング → ベッドサイド評価 → 段階的食上げ → 安全策(姿勢・代償手技) → 中止基準
          までを、根拠と理由とともに解説します。
          <span className="ml-1 text-[10px] opacity-70">[出典: 前田・髙畠『誤嚥性肺炎の包括的アプローチ』第1章]</span>
        </p>
      </div>

      {/* セクション */}
      <div className="space-y-3">
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const isOpen = openId === s.id
          return (
            <div
              key={s.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className={`flex w-full items-center gap-3 bg-gradient-to-r ${s.gradient} p-3 text-left text-white transition-all`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold leading-tight">{s.title}</div>
                </div>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 p-4">
                  <p className="rounded-lg bg-gray-50 p-3 text-[11px] leading-relaxed text-gray-700 dark:bg-gray-800/50 dark:text-gray-200">
                    {s.intro}
                  </p>
                  {s.items.map((it, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <h4 className="mb-1 text-xs font-bold text-gray-900 dark:text-gray-100">
                        {i + 1}. {it.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                        {it.detail}
                      </p>
                      <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                        <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                          なぜそうするのか
                        </div>
                        <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                          {it.reason}
                        </p>
                      </div>
                      <p className="mt-1.5 text-[10px] italic text-gray-500 dark:text-gray-400">
                        [出典: {it.cite}]
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 注意 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• 「3日以内」「48%」などの数字は本邦DPCデータの平均値であり、個別の患者では基礎疾患・ADL・施設方針で大きく異なる。</li>
          <li>• 抗菌薬投与中の経口摂取は「禁忌」ではないが、再開判断は嚥下機能評価とバイタル安定をもとに主治医・摂食嚥下チームで合議すべき。</li>
          <li>• 不顕性誤嚥は症状が乏しい。SpO₂・痰・聴診を組み合わせた多角的モニタリングが必須。</li>
          <li>• 中止判断は「次の1食を控えてから再評価」を原則とし、絶食を長引かせないこと。</li>
          <li>• 口腔ケアは予防・治療の両面で必須。誤嚥性肺炎の再発予防に最も費用対効果が高い介入。</li>
        </ul>
      </div>

      <TextbookReferenceList
        citedIds={['takabatake_goen', 'uchida_shisei', 'uchida_shinkei', 'wakabayashi_koreisha', 'koyama_kuchi']}
      />

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページは学習補助を目的とした要約です。実際の臨床応用は患者個別の嚥下機能・全身状態・施設の医療資源に応じて、主治医・歯科医・摂食嚥下リハビリテーションチームの判断に従ってください。
        </p>
      </div>
    </div>
  )
}
