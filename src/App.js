import { useEffect, useState } from "react";
import { data } from "./data";

import QuestionContainer from "./components/QuestionContainer";
import ResultContainer from "./components/ResultContainer";
import ThankYouContainer from "./components/ThankYouContainer";
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
	
	function togglePrevButton(currentQuestionNumber) {
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function handleScores(score) {		
		setFinalScores(score);
	}
	
	useEffect(() => setContent(data), []); // Fetch data on app load.

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
											questions={content?.questions}

											showPrevButton={showPrevButton}
											setShowQuestions={setShowQuestions}
											setShowThankYou={setShowThankYou}
											setShowResults={setShowResults}
											setFinalScores={setFinalScores}											
											togglePrevButton={togglePrevButton}
											handleScores = {handleScores}
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
