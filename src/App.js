import { useEffect, useState } from "react";
import { data } from "./data";

import QuestionContainer from "./components/QuestionContainer";
import ResultContainer from "./components/ResultContainer";
import ScoresTable from "./components/ScoresTable";
import NavBar from "./components/NavBar";
import InfoCard from "./components/InfoCard";

function App() {
	const [content, setContent] = useState(null);
	const [showQuestions, setShowQuestions] = useState(true); //change to true
	const [finalScores, setFinalScores] = useState(null);
	const [showThankYou, setShowThankYou] = useState(false);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [showResults, setShowResults] = useState(false); // change to false.

	const questions = content?.questions;

	function togglePrevButton(currentQuestionNumber) {
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.		

	function ThankYouContainer() {
		return (
			<>
				<h3>eASSIST finalScores</h3>
				<p>
					Thank you for completing the questions. Based on your answers, you are not at
					any risk of harms from Tobacco, Alcohol, Cannabis, Cocaine, Inhalants,
					Hallucinogens, Sedatives, Opioids, Other use at this time.
				</p>
			</>
		);
	}

	return (
		<>
			<NavBar />

			<div className="container pt-4 pb-5 app-container">
				{/* Question Container */}
				{content && (
					<div className="row">
						<div className="container-fluid col-lg-8 questions-container">
							<div className="card">
								<div className="card-body">
									{showQuestions && (
										<QuestionContainer
											questions={questions}

											showPrevButton={showPrevButton}
											setShowQuestions={setShowQuestions}
											setShowThankYou={setShowThankYou}
											setShowResults={setShowResults}
											setFinalScores={setFinalScores}
											togglePrevButton={togglePrevButton}
										/>
									)}

									{showResults && <ResultContainer />}

									{finalScores && (
										<ScoresTable
											scores={finalScores}
											substanceRiskLevels={content?.substanceRiskLevels}
										/>
									)}

									{showThankYou && <ThankYouContainer />}

								</div>
							</div>
						</div>

						<InfoCard />
					</div>
				)}
			</div>
		</>
	);
}

export default App;
