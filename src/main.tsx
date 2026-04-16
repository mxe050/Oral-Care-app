import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { ProloguePage } from './pages/prologue/ProloguePage'
import { OhatHubPage } from './pages/ohat/OhatHubPage'
import { OhatLearnPage } from './pages/ohat/OhatLearnPage'
import { OhatCategoryDetailPage } from './pages/ohat/OhatCategoryDetailPage'
import { OhatQuizPage } from './pages/ohat/OhatQuizPage'
import { OhatClinicalPage } from './pages/ohat/OhatClinicalPage'
import { OhatNextActionQuizPage } from './pages/ohat/OhatNextActionQuizPage'
import { FassHubPage } from './pages/fass/FassHubPage'
import { FassLearnPage } from './pages/fass/FassLearnPage'
import { FassItemDetailPage } from './pages/fass/FassItemDetailPage'
import { FassMistakeQuizPage } from './pages/fass/FassMistakeQuizPage'
import { FassSelfCheckPage } from './pages/fass/FassSelfCheckPage'
import { FassEvidencePage } from './pages/fass/FassEvidencePage'
import { SwallowHubPage } from './pages/swallow/SwallowHubPage'
import { SwallowPhasePage } from './pages/swallow/SwallowPhasePage'
import { SwallowQuizPage } from './pages/swallow/SwallowQuizPage'
import { MealRoundPage } from './pages/swallow/MealRoundPage'
import { BackgroundPage } from './pages/swallow/BackgroundPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/prologue" element={<ProloguePage />} />
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          {/* OHAT Module */}
          <Route path="ohat" element={<OhatHubPage />} />
          <Route path="ohat/learn" element={<OhatLearnPage />} />
          <Route path="ohat/learn/:categoryId" element={<OhatCategoryDetailPage />} />
          <Route path="ohat/quiz" element={<OhatQuizPage />} />
          <Route path="ohat/clinical" element={<OhatClinicalPage />} />
          <Route path="ohat/next-action" element={<OhatNextActionQuizPage />} />
          {/* FASS/CORE10 Module */}
          <Route path="fass" element={<FassHubPage />} />
          <Route path="fass/learn" element={<FassLearnPage />} />
          <Route path="fass/learn/:itemId" element={<FassItemDetailPage />} />
          <Route path="fass/mistake-quiz" element={<FassMistakeQuizPage />} />
          <Route path="fass/self-check" element={<FassSelfCheckPage />} />
          <Route path="fass/evidence" element={<FassEvidencePage />} />
          {/* Swallowing Module */}
          <Route path="swallow" element={<SwallowHubPage />} />
          <Route path="swallow/phases" element={<SwallowPhasePage />} />
          <Route path="swallow/quiz" element={<SwallowQuizPage />} />
          <Route path="swallow/meal-round" element={<MealRoundPage />} />
          <Route path="swallow/background" element={<BackgroundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
