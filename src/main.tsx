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
import { OhatConversationPage } from './pages/ohat/OhatConversationPage'
import { FassHubPage } from './pages/fass/FassHubPage'
import { FassLearnPage } from './pages/fass/FassLearnPage'
import { FassItemDetailPage } from './pages/fass/FassItemDetailPage'
import { FassMistakeQuizPage } from './pages/fass/FassMistakeQuizPage'
import { FassNgQuizPage } from './pages/fass/FassNgQuizPage'
import { FassSelfCheckPage } from './pages/fass/FassSelfCheckPage'
import { FassEvidencePage } from './pages/fass/FassEvidencePage'
import { FassVideoTrainingPage } from './pages/fass/FassVideoTrainingPage'
import { FassConversationPage } from './pages/fass/FassConversationPage'
import { OralCareHubPage } from './pages/oral-care/OralCareHubPage'
import { OralCareQuizPage } from './pages/oral-care/OralCareQuizPage'
import { SwallowHubPage } from './pages/swallow/SwallowHubPage'
import { SwallowPhasePage } from './pages/swallow/SwallowPhasePage'
import { SwallowQuizPage } from './pages/swallow/SwallowQuizPage'
import { MealRoundPage } from './pages/swallow/MealRoundPage'
import { BackgroundPage } from './pages/swallow/BackgroundPage'
import { DiseasesHubPage } from './pages/diseases/DiseasesHubPage'
import { DementiaHubPage } from './pages/diseases/DementiaHubPage'
import { HumanitudePage } from './pages/diseases/HumanitudePage'
import { StrokePage } from './pages/diseases/StrokePage'
import { AspirationPneumoniaPage } from './pages/diseases/AspirationPneumoniaPage'
import { HigherBrainDisorderPage } from './pages/diseases/HigherBrainDisorderPage'
import { AppetiteLossPage } from './pages/diseases/AppetiteLossPage'
import { AppetiteLossQaIndexPage } from './pages/diseases/AppetiteLossQaIndexPage'
import { AppetiteLossQaDetailPage } from './pages/diseases/AppetiteLossQaDetailPage'
import { AppetiteLossAlgorithmPage } from './pages/diseases/AppetiteLossAlgorithmPage'
import { PreEntryCarePage } from './pages/diseases/PreEntryCarePage'
import { DementiaSwallowingPage } from './pages/diseases/DementiaSwallowingPage'
import { DementiaAppetiteLossQaPage } from './pages/diseases/DementiaAppetiteLossQaPage'
import { NewsHubPage } from './pages/news/NewsHubPage'
import { NutritionInterventionPage } from './pages/news/NutritionInterventionPage'
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
          <Route path="ohat/conversation" element={<OhatConversationPage />} />
          <Route path="ohat/clinical" element={<OhatClinicalPage />} />
          <Route path="ohat/next-action" element={<OhatNextActionQuizPage />} />
          {/* FASS/CORE10 Module */}
          <Route path="fass" element={<FassHubPage />} />
          <Route path="fass/learn" element={<FassLearnPage />} />
          <Route path="fass/learn/:itemId" element={<FassItemDetailPage />} />
          <Route path="fass/mistake-quiz" element={<FassMistakeQuizPage />} />
          <Route path="fass/ng-quiz" element={<FassNgQuizPage />} />
          <Route path="fass/conversation" element={<FassConversationPage />} />
          <Route path="fass/self-check" element={<FassSelfCheckPage />} />
          <Route path="fass/evidence" element={<FassEvidencePage />} />
          <Route path="fass/video-training" element={<FassVideoTrainingPage />} />
          {/* Oral Care Module */}
          <Route path="oral-care" element={<OralCareHubPage />} />
          <Route path="oral-care/quiz" element={<OralCareQuizPage />} />
          {/* Swallowing Module */}
          <Route path="swallow" element={<SwallowHubPage />} />
          <Route path="swallow/phases" element={<SwallowPhasePage />} />
          <Route path="swallow/quiz" element={<SwallowQuizPage />} />
          <Route path="swallow/meal-round" element={<MealRoundPage />} />
          <Route path="swallow/background" element={<BackgroundPage />} />
          {/* Diseases Module */}
          <Route path="diseases" element={<DiseasesHubPage />} />
          <Route path="diseases/dementia" element={<DementiaHubPage />} />
          <Route path="diseases/dementia/humanitude" element={<HumanitudePage />} />
          <Route path="diseases/dementia/swallowing" element={<DementiaSwallowingPage />} />
          <Route path="diseases/dementia/appetite-loss-qa" element={<DementiaAppetiteLossQaPage />} />
          <Route path="diseases/stroke" element={<StrokePage />} />
          <Route path="diseases/aspiration-pneumonia" element={<AspirationPneumoniaPage />} />
          <Route path="diseases/higher-brain" element={<HigherBrainDisorderPage />} />
          <Route path="diseases/appetite-loss" element={<AppetiteLossPage />} />
          <Route path="diseases/appetite-loss/qa" element={<AppetiteLossQaIndexPage />} />
          <Route path="diseases/appetite-loss/qa/:questionId" element={<AppetiteLossQaDetailPage />} />
          <Route path="diseases/appetite-loss/algorithm" element={<AppetiteLossAlgorithmPage />} />
          <Route path="diseases/pre-entry" element={<PreEntryCarePage />} />
          {/* News Module */}
          <Route path="news" element={<NewsHubPage />} />
          <Route path="news/nutrition-intervention-2026" element={<NutritionInterventionPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
