import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Apple,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FlaskConical,
  Users,
  Target,
  BookOpen,
  Sparkles,
} from 'lucide-react'

const PAPER_URL =
  'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD015468.pub2/full'

const INTERVENTIONS = [
  '栄養補助(Nutritional Supplementation)',
  '栄養強化食(Fortified food)',
  '栄養教育(Nutrition education)',
  '支持的ケア(Supportive care)',
  '環境調整(Environmental Adaptation)',
  '栄養サポート(Nutritional Support)',
  '栄養カウンセリング(Nutrition counseling)',
  '食事介助(Mealtime Assistance)',
  'フィンガーフード(Finger Food)',
  '間食(Snack)',
]

export function NutritionInterventionPage() {
  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-2">
        <Link
          to="/news"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="最新情報一覧へ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            栄養リスクのある入院高齢者を対象とした経口栄養介入:2026
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Cochrane Systematic Review・個別参加者データのネットワークメタ解析
          </p>
        </div>
      </div>

      {/* 論文引用 */}
      <a
        href={PAPER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 transition-all hover:border-emerald-500 hover:shadow-md active:scale-[0.99] dark:border-emerald-700 dark:from-emerald-950/40 dark:to-teal-950/40"
      >
        <div className="mb-2 flex items-center gap-2">
          <BookOpen size={16} className="text-emerald-600 dark:text-emerald-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            原著論文(クリックで全文へ)
          </span>
          <ExternalLink size={12} className="ml-auto text-emerald-600 dark:text-emerald-300" />
        </div>
        <p className="text-[11px] leading-relaxed text-gray-800 dark:text-gray-100">
          Kiesswetter E, Schwarzer G, Stadelmaier J, Lohner S, Grummich K, Dagnelie PC,
          Beck AM, Beelen J, Botella-Carretero JI, Faxén-Irving G, Hickson M, Iff S,
          Johansen A, Sharma Y, Sorensen JM, Kaegi-Braun N, Wunderle C, Bongaerts B,
          Meerpohl JJ, Norman K, Schuetz P, Torbahn G, Visser M, Volkert D,
          Schwingshackl L.{' '}
          <strong>
            Oral nutritional interventions in hospitalised older people at nutritional
            risk: a network meta-analysis of individual participant data.
          </strong>{' '}
          Cochrane Database Syst Rev. 2026 Mar 26;3(3):CD015468.
          <br />
          doi: 10.1002/14651858.CD015468.pub2.
          <br />
          PMID: 41886673; PMCID: PMC13021146.
        </p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white">
          全文を読む(Cochrane Library)
          <ExternalLink size={10} />
        </div>
      </a>

      {/* 一文要約 */}
      <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 dark:border-amber-700 dark:from-amber-950/40 dark:to-yellow-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-amber-600 dark:text-amber-300" />
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200">
            一文で言うと
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          低栄養リスクのある入院高齢者(65歳以上)に対して、{' '}
          <strong>経口栄養補助食品(ONS:Oral Nutritional Supplements)</strong>{' '}
          を提供することで、{' '}
          <strong>30日以内の全死亡率と重篤有害事象(SAE)が低下する可能性</strong>{' '}
          が、21件のRCT(3,309名、うち12件は個別参加者データ=IPDあり)を統合したネットワークメタ解析で示された(エビデンスの確実性は「低」)。「包括的個別化栄養ケア」「追加タンパク質」「エネルギー補助」など他の介入については、効果が控えめか不確かなままである。
        </p>
      </div>

      {/* 背景 */}
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-rose-800 dark:text-rose-200">
          <AlertCircle size={14} />
          なぜ重要か(背景)
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-rose-900 dark:text-rose-100">
          <li>
            • 入院高齢者の <strong>35〜64%</strong>{' '}
            が低栄養を呈し、感染・創傷治癒遅延・再入院・死亡など多彩な有害アウトカムと関連する。
          </li>
          <li>
            •
            低栄養は嚥下機能の低下・誤嚥性肺炎リスクの上昇・サルコペニア進行と連鎖的に結びつくため、{' '}
            <strong>口腔ケア・食事介助の現場と直接つながる課題</strong>。
          </li>
          <li>
            • どの栄養介入が最も有効かを直接比較した研究は限られており、{' '}
            <strong>ネットワークメタ解析(NMA)</strong>{' '}
            で複数介入を一括ランキングする本研究の意義は大きい。
          </li>
        </ul>
      </div>

      {/* 研究方法 */}
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/40 dark:bg-sky-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-sky-800 dark:text-sky-200">
          <FlaskConical size={14} />
          研究の方法
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-sky-900 dark:text-sky-100">
          <li>
            • <strong>対象:</strong>{' '}
            65歳以上で急性疾患により入院し、低栄養リスクまたは低栄養と診断された高齢者。
          </li>
          <li>
            • <strong>研究デザイン:</strong>{' '}
            21件のRCT(72報告・参加者3,309名、平均年齢75〜85歳)を統合。うち12件(1,863名)は{' '}
            <strong>個別参加者データ(IPD)</strong>{' '}
            を著者に依頼して入手し、残りは集約データを使用。
          </li>
          <li>
            • <strong>解析手法:</strong>{' '}
            頻度論ベースのランダム効果ネットワークメタ解析(NMA)。各介入をP-scoreで順位付け。エビデンスの確実性は{' '}
            <strong>GRADE</strong>、バイアスは <strong>RoB 2</strong> ツールで評価。
          </li>
          <li>
            • <strong>主要評価時点:</strong> 退院時または無作為化後30日。
          </li>
          <li>
            • <strong>主要アウトカム:</strong>{' '}
            全死亡率、重篤有害事象(SAE)、機能状態(ADL)。重要アウトカム:HRQoL(健康関連QOL)、入院期間(LOS)、体重、除脂肪量。
          </li>
        </ul>
      </div>

      {/* 介入の種類 */}
      <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-violet-800 dark:text-violet-200">
          <Target size={14} />
          検討された10種類の経口栄養介入
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {INTERVENTIONS.map((it, i) => (
            <div
              key={i}
              className="rounded-lg border border-violet-200 bg-white px-2 py-1.5 text-[10px] font-medium leading-tight text-violet-900 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-100"
            >
              {it}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-violet-800 dark:text-violet-200">
          実際にRCTで検証されたのは主に「追加タンパク質」「エネルギー補助」「ONS」「個別化食事支援」「包括的個別化栄養ケア」の5カテゴリ。比較対照は標準ケアまたはプラセボ。
        </p>
      </div>

      {/* 主な結果 */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <TrendingUp size={16} className="text-emerald-600" />
          主な結果(GRADE評価付き)
        </h3>
        <div className="space-y-3">
          {/* 死亡率 */}
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-4 shadow-sm dark:border-emerald-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                ① 全死亡率(30日)
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              <strong>ONSは対照群と比べて死亡を減少させる可能性</strong>:
              <br />
              リスク比 RR 0.46(95%CI 0.25〜0.84)、絶対差で1,000人あたり57人の死亡減少(95%CI 17〜79人減少)。
              <br />
              <span className="text-amber-700 dark:text-amber-300">
                エビデンスの確実性:<strong>低</strong>。
              </span>
              一方「包括的個別化栄養ケア」は対照群とほぼ差がない(RR 0.98)。
            </p>
          </div>

          {/* SAE */}
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-4 shadow-sm dark:border-emerald-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                ② 重篤有害事象(SAE)
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              <strong>ONSは対照群と比べてSAEを減少させる可能性</strong>:
              <br />
              RR 0.56(95%CI 0.32〜0.95)、1,000人あたり84件のSAE減少(95%CI 10〜131件減少)。
              <br />
              <span className="text-amber-700 dark:text-amber-300">
                エビデンスの確実性:<strong>低</strong>。
              </span>
              他の介入比較については不確実性が極めて高い。
            </p>
          </div>

          {/* ADL */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={14} className="text-gray-500" />
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                ③ 機能状態(ADL)
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              「包括的個別化栄養ケア」と対照群でほぼ差なし(SMD 0.06)。ONSとエネルギー補助の比較でもほぼ差なし(SMD −0.15)。{' '}
              <span className="text-amber-700 dark:text-amber-300">
                エビデンスの確実性:<strong>低</strong>。
              </span>
            </p>
          </div>

          {/* HRQoL */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={14} className="text-gray-500" />
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                ④ HRQoL(健康関連QOL)
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              エネルギー補助とONSはほぼ同等の効果(MD 0.01){' '}
              <span className="text-sky-700 dark:text-sky-300">
                ─ <strong>中等度の確実性</strong>。
              </span>
              他の介入間でもHRQoLに大きな差は出なかった。
            </p>
          </div>

          {/* LOS */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={14} className="text-gray-500" />
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                ⑤ 入院期間(LOS)
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              追加タンパク質・エネルギー補助・ONS・包括的個別化栄養ケアのいずれも、対照群と比べて入院期間にほぼ差なし(18件のRCT・3,013名)。
            </p>
          </div>

          {/* 体重 */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={14} className="text-gray-500" />
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                ⑥ 体重
              </h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
              ONSは対照群と比べて体重が増加する可能性(MD +0.9 kg、95%CI 0.37〜1.42)。包括的個別化栄養ケアと比べても増加(+1.00 kg)。ただし不確実性は高い。エネルギー補助とONSは同等(MD 0.11 kg{' '}
              <span className="text-sky-700 dark:text-sky-300">
                ─ <strong>中等度の確実性</strong>
              </span>
              )。
            </p>
          </div>
        </div>
      </div>

      {/* 著者の結論 */}
      <div className="rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 dark:border-emerald-700 dark:from-emerald-950/40 dark:to-teal-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 size={14} />
          著者の結論
        </h3>
        <p className="text-[11px] leading-relaxed text-gray-800 dark:text-gray-100">
          低栄養リスクのある/低栄養の入院高齢者では、{' '}
          <strong>
            経口栄養補助食品(ONS)が無作為化後30日における死亡と重篤有害事象を減らす可能性がある
          </strong>
          。その他のアウトカムでは介入間にほぼ差はない。全体としてエビデンスの確実性は{' '}
          <strong>低〜非常に低</strong>{' '}
          で、その主因は比較あたりの研究数・参加者数の少なさ。介入間比較も研究のネットワーク構造のばらつきにより制約された。結果の解釈には{' '}
          <strong>急性・慢性疾患の異質性を考慮</strong>{' '}
          する必要がある。今後は十分な検出力をもち、対照だけでなく{' '}
          <strong>介入同士を直接比較</strong>{' '}
          する頑健な方法論の研究が望まれる。
        </p>
      </div>

      {/* 臨床への示唆 */}
      <div className="rounded-xl border border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 p-4 dark:border-rose-700 dark:from-rose-950/40 dark:to-pink-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-rose-800 dark:text-rose-200">
          <Users size={14} />
          口腔ケア・食事介助の現場への示唆
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-rose-900 dark:text-rose-100">
          <li>
            • 入院高齢者の <strong>3〜6割</strong>{' '}
            が低栄養。栄養スクリーニングはOHATなどの口腔評価と並んで日常業務に組み込むべき。
          </li>
          <li>
            • 低栄養リスク患者には <strong>ONSの追加</strong>{' '}
            が、死亡・重篤有害事象を減らす可能性あり(エビデンスは限定的だが効果方向は一貫)。{' '}
            <strong>食事介助の場で「ONSを最後まで飲み切る」工夫</strong>(温度・味・タイミング・声かけ)は重要な看護介入。
          </li>
          <li>
            • ONS単独で <strong>体重を約0.9kg増加</strong>{' '}
            させ得る。一方、入院期間やADL自立度には大きな差は出ていない。{' '}
            <strong>「飲ませる」だけでなく咀嚼・嚥下機能の維持</strong>{' '}
            と組み合わせる必要がある。
          </li>
          <li>
            • 介助の現場で <strong>食事環境(姿勢・照明・声かけ・道具)</strong>{' '}
            を整える「環境調整」も介入の選択肢に含まれているが、単独効果は不明。{' '}
            <strong>口腔ケア・声のトーン・ノックといった非言語ケア</strong>{' '}
            と組み合わせることで、ONS摂取アドヒアランスが向上する可能性が高い。
          </li>
          <li>
            • <strong>「包括的個別化栄養ケア」単独では死亡を減らさなかった</strong>{' '}
            点は重要。栄養サポートチーム(NST)介入はONSの確実な提供と組み合わせて初めて効果が出る可能性が示唆される。
          </li>
        </ul>
      </div>

      {/* 限界 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          研究の限界
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>
            • エビデンスの確実性は <strong>低〜非常に低</strong>{' '}
            にとどまる(GRADE評価)。研究数・参加者数の少なさが主因。
          </li>
          <li>
            • 16.1%のアウトカム評価がバイアスリスク低、16.8%が高リスク(RoB 2)。
          </li>
          <li>
            •
            対象は急性疾患で入院した高齢者で、急性・慢性疾患の組み合わせが研究ごとに異なるため、母集団の異質性が大きい。
          </li>
          <li>
            • 介入のランキングはアウトカムによって一致せず、{' '}
            <strong>「すべてのアウトカムで最良」と言える介入はなかった</strong>。
          </li>
          <li>
            • 30日というアウトカム評価時点は短期。{' '}
            <strong>退院後の長期予後・再入院</strong>{' '}
            への影響は本研究の範囲外。
          </li>
        </ul>
      </div>

      {/* 用語解説 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
          <BookOpen size={14} />
          用語ミニ解説
        </h3>
        <dl className="space-y-2 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              ONS(Oral Nutritional Supplements)
            </dt>
            <dd>
              経口栄養補助食品。少量で高エネルギー・高タンパクの飲料/ゼリー/ペーストなど。日本ではメイバランス・エンシュア・テルミールなどが代表例。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              IPD(Individual Participant Data)
            </dt>
            <dd>
              個別参加者データ。論文に集約された数値ではなく、各参加者のもとデータを著者から取り寄せて統合解析する方法。サブグループ解析や交絡調整に強い。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              NMA(Network Meta-Analysis)
            </dt>
            <dd>
              ネットワークメタ解析。直接比較されていない介入同士を、共通の対照を介して間接比較する手法。複数介入のランキングが可能。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              GRADE
            </dt>
            <dd>
              エビデンスの確実性を「高/中/低/非常に低」の4段階で評価する国際標準の枠組み。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              RR(Risk Ratio)・SMD・MD
            </dt>
            <dd>
              RR=リスク比(イベント発生率の比)、SMD=標準化平均差、MD=平均差。95%CIが1(RR)・0(SMD/MD)をまたぐと統計学的に有意とは言えない。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-gray-900 dark:text-gray-100">
              SAE(Serious Adverse Event)
            </dt>
            <dd>
              重篤有害事象。死亡・入院延長・生命を脅かすイベント・永続的障害につながる事象など。
            </dd>
          </div>
        </dl>
      </div>

      {/* 資金・登録 */}
      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
        <p>
          <strong>資金:</strong>{' '}
          ドイツ連邦教育研究省(Bundesministerium für Bildung und Forschung; 助成番号 01KG2102)。
        </p>
        <p className="mt-1">
          <strong>プロトコル登録:</strong>{' '}
          2022年(Cochrane Database Syst Rev. doi:10.1002/14651858.CD015468)。
        </p>
        <p className="mt-2">
          本ページはCochrane Library公開アブストラクトの要約・日本語解説です。臨床応用にあたっては必ず原文を確認し、施設の方針・主治医の判断に従ってください。
        </p>
      </div>

      {/* 原著へのリンク(最後にもう一度) */}
      <a
        href={PAPER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-400 bg-emerald-50 p-4 text-sm font-bold text-emerald-800 transition-all hover:bg-emerald-100 hover:shadow-md active:scale-[0.99] dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
      >
        <Apple size={16} />
        Cochrane Libraryで全文を読む
        <ExternalLink size={14} />
      </a>
    </div>
  )
}
