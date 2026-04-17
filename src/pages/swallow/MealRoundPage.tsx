import { useState } from 'react'
import {
  Eye,
  Compass,
  CheckSquare,
  Play,
  ArrowRight,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Lightbulb,
} from 'lucide-react'
import { MEAL_ROUND_CHALLENGES } from '../../data/meal-round-challenges'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type {
  MealRoundChallenge,
  MealRoundStepQuestion,
} from '../../types/swallowing'

type StepKey = 'orient' | 'decide' | 'act'

const STEP_CONFIG: Record<
  'observe' | StepKey,
  { icon: typeof Eye; label: string; color: string; bg: string; text: string }
> = {
  observe: {
    icon: Eye,
    label: '観察 (Observe)',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
  },
  orient: {
    icon: Compass,
    label: '状況判断 (Orient)',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
  },
  decide: {
    icon: CheckSquare,
    label: '意思決定 (Decide)',
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
  },
  act: {
    icon: Play,
    label: '実行 (Act)',
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
  },
}

interface StepAnswer {
  selectedId: string | null
  submitted: boolean
}

function blankAnswers(): Record<StepKey, StepAnswer> {
  return {
    orient: { selectedId: null, submitted: false },
    decide: { selectedId: null, submitted: false },
    act: { selectedId: null, submitted: false },
  }
}

export function MealRoundPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<StepKey, StepAnswer>>(
    blankAnswers(),
  )
  const [allDone, setAllDone] = useState(false)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const scenario: MealRoundChallenge | undefined = MEAL_ROUND_CHALLENGES[scenarioIndex]

  if (!scenario && !allDone) {
    setAllDone(true)
  }

  if (allDone) {
    markCompleted('swallow-meal-round')
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-center text-white shadow-lg">
          <Trophy size={48} className="mx-auto mb-3" />
          <h2 className="text-2xl font-bold">全シナリオ完了！</h2>
          <p className="mt-2 text-sm text-purple-50">
            OODAループを回して食事観察を行う思考が身についてきました。
          </p>
        </div>
        <button
          onClick={() => {
            setScenarioIndex(0)
            setAnswers(blankAnswers())
            setAllDone(false)
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-purple-500 bg-white py-3 font-bold text-purple-600 transition-all hover:bg-purple-50 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <RotateCcw size={18} />
          もう一度挑戦
        </button>
      </div>
    )
  }

  if (!scenario) return null

  const isOrientSubmitted = answers.orient.submitted
  const isDecideSubmitted = answers.decide.submitted
  const isActSubmitted = answers.act.submitted
  const showDecide = isOrientSubmitted
  const showAct = isDecideSubmitted
  const isFinished = isActSubmitted

  const handleSelect = (step: StepKey, id: string) => {
    if (answers[step].submitted) return
    setAnswers((prev) => ({
      ...prev,
      [step]: { ...prev[step], selectedId: id },
    }))
  }

  const handleSubmit = (step: StepKey) => {
    if (!answers[step].selectedId) return
    setAnswers((prev) => ({
      ...prev,
      [step]: { ...prev[step], submitted: true },
    }))
    // 正答判定
    const question: MealRoundStepQuestion =
      step === 'orient'
        ? scenario.orient
        : step === 'decide'
          ? scenario.decide
          : scenario.act
    const selected = question.options.find((o) => o.id === answers[step].selectedId)
    if (selected?.isCorrect) {
      addXp(XP_ACTIONS.quizCorrect)
    } else {
      addXp(5) // 不正解でも考えた分のXP
    }
  }

  const handleNextScenario = () => {
    if (scenarioIndex + 1 >= MEAL_ROUND_CHALLENGES.length) {
      setAllDone(true)
      addXp(XP_ACTIONS.completeCategory)
    } else {
      setScenarioIndex((i) => i + 1)
      setAnswers(blankAnswers())
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            シナリオ {scenarioIndex + 1} / {MEAL_ROUND_CHALLENGES.length}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          食事ラウンド：考える OODA
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          観察結果から自分で判断 → 意思決定 → 実行してみよう
        </p>
      </div>

      {/* OODA Cycle Visual */}
      <div className="flex items-center justify-center gap-2 py-1">
        {(['observe', 'orient', 'decide', 'act'] as const).map((step, i) => {
          const config = STEP_CONFIG[step]
          // Compute active based on progress
          const isActive =
            step === 'observe' ||
            (step === 'orient') ||
            (step === 'decide' && showDecide) ||
            (step === 'act' && showAct)
          const done =
            (step === 'observe') ||
            (step === 'orient' && isOrientSubmitted) ||
            (step === 'decide' && isDecideSubmitted) ||
            (step === 'act' && isActSubmitted)
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 ${
                  isActive
                    ? `bg-gradient-to-br ${config.color} text-white shadow-md ${done ? 'scale-100' : 'scale-110 animate-pulse'}`
                    : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                }`}
              >
                <config.icon size={16} />
              </div>
              {i < 3 && (
                <ArrowRight
                  size={12}
                  className={
                    isActive
                      ? 'text-gray-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Patient + Observation panel (combined) */}
      <div className="overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 dark:border-blue-800 dark:from-blue-950 dark:to-sky-950">
        <div className="p-4">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <Eye size={12} /> 観察結果（Observe 済み）
          </div>
          <div className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-100">
            {scenario.title}
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {scenario.patientProfile}
          </p>
          <div className="mt-3 rounded-lg bg-white/70 p-3 dark:bg-gray-900/40">
            <div className="mb-1 text-xs font-bold text-gray-600 dark:text-gray-400">
              OHAT所見
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {scenario.ohatFindings}
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-white/70 p-3 dark:bg-gray-900/40">
            <div className="mb-1 text-xs font-bold text-gray-600 dark:text-gray-400">
              食事場面での観察
            </div>
            <ul className="space-y-1">
              {scenario.observations.map((o, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-0.5 text-blue-500">&#x2022;</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Step: Orient */}
      <StepQuestionCard
        stepKey="orient"
        question={scenario.orient}
        answer={answers.orient}
        onSelect={(id) => handleSelect('orient', id)}
        onSubmit={() => handleSubmit('orient')}
      />

      {/* Step: Decide (appears after orient submitted) */}
      {showDecide && (
        <StepQuestionCard
          stepKey="decide"
          question={scenario.decide}
          answer={answers.decide}
          onSelect={(id) => handleSelect('decide', id)}
          onSubmit={() => handleSubmit('decide')}
        />
      )}

      {/* Step: Act (appears after decide submitted) */}
      {showAct && (
        <StepQuestionCard
          stepKey="act"
          question={scenario.act}
          answer={answers.act}
          onSelect={(id) => handleSelect('act', id)}
          onSubmit={() => handleSubmit('act')}
        />
      )}

      {/* After all 3 steps completed: summary + next */}
      {isFinished && (
        <>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-indigo-800 dark:text-indigo-200">
              <Lightbulb size={16} /> まとめ
            </div>
            <p className="text-xs text-indigo-900 dark:text-indigo-100">
              {scenario.summary}
            </p>
          </div>

          <ReferenceList references={scenario.references} />

          <button
            onClick={handleNextScenario}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-bold text-white transition-all hover:bg-purple-700 active:scale-[0.98]"
          >
            {scenarioIndex + 1 >= MEAL_ROUND_CHALLENGES.length
              ? '結果を見る'
              : '次のシナリオへ'}
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  )
}

/**
 * OODA の 1 ステップを表示するカード
 * 選択 → 回答 → 解説の 3 段構成
 */
interface StepCardProps {
  stepKey: StepKey
  question: MealRoundStepQuestion
  answer: StepAnswer
  onSelect: (id: string) => void
  onSubmit: () => void
}

function StepQuestionCard({
  stepKey,
  question,
  answer,
  onSelect,
  onSubmit,
}: StepCardProps) {
  const config = STEP_CONFIG[stepKey]
  const Icon = config.icon

  return (
    <div
      className={`overflow-hidden rounded-xl border ${config.bg} transition-all duration-500`}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Icon size={16} className={config.text} />
          <span className={`text-sm font-bold ${config.text}`}>
            {config.label}
          </span>
        </div>
        <p className="mb-3 text-sm text-gray-900 dark:text-gray-100">
          {question.prompt}
        </p>

        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = answer.selectedId === opt.id
            const submitted = answer.submitted

            let cls =
              'border-gray-200 bg-white hover:border-purple-300 dark:border-gray-700 dark:bg-gray-900'
            if (!submitted && isSelected) {
              cls =
                'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950'
            } else if (submitted) {
              if (opt.isCorrect) {
                cls =
                  'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
              } else if (isSelected) {
                cls =
                  'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950'
              } else {
                cls =
                  'border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={submitted}
                onClick={() => onSelect(opt.id)}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all ${cls} ${submitted ? 'cursor-default' : 'active:scale-[0.98]'}`}
              >
                <div className="flex items-start gap-2">
                  {submitted ? (
                    opt.isCorrect ? (
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                    ) : isSelected ? (
                      <XCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                    ) : (
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )
                  ) : (
                    <span
                      className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 dark:text-gray-100">
                      {opt.text}
                    </p>
                    {submitted && (
                      <p
                        className={`mt-1.5 text-[11px] ${opt.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}
                      >
                        {opt.rationale}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {!answer.submitted && (
          <button
            onClick={onSubmit}
            disabled={!answer.selectedId}
            className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white transition-all ${
              answer.selectedId
                ? 'bg-purple-600 hover:bg-purple-700 active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            回答する
            <ArrowRight size={14} />
          </button>
        )}

        {answer.submitted && (
          <div className="mt-3 rounded-lg border border-indigo-200 bg-white p-3 dark:border-indigo-800 dark:bg-gray-900">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              <Lightbulb size={12} /> 解説
            </div>
            <p className="text-xs text-gray-800 dark:text-gray-200">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
