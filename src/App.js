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
	const [showQuestions, setShowQuestions] = useState(true);
	const [showThankYou, setShowThankYou] = useState(false);
	const [showScores, setShowScores] = useState(false);
	const [finalScores, setFinalScores] = useState(null);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [showResults, setShowResults] = useState(false);

	const allPages = Object.freeze({
		home: 0,
		questions: 1,
		thankYou: 2,
		advice: 3,
		scores: 4
	});

	useEffect(() => setContent(data), []); // Fetch data on app load.

	function togglePrevButton(currentQuestionNumber) {
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function resetPages(){
		setShowQuestions(false);
		setShowResults(false);
		setShowScores(false);
		setShowThankYou(false);		
	}	
	
	function handlePage(selectedPage) {
		resetPages();
		
		switch (selectedPage) {
			case allPages.home:
				console.log("home page");
				break;

			case allPages.questions:				
				setShowQuestions(true);
				break;

			case allPages.thankYou:				
				setShowThankYou(true);
				break;

			case allPages.advice:
				console.log("advice page");
				break;

			case allPages.scores:
				setShowScores(true);				
				break;

			default:
				console.log("error page.");
				break;
		}		
	}	

	function handleScores(score) {
		setFinalScores(score);
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
											allPages={allPages}
											questions={content?.questions}
											handlePage={handlePage}
											showPrevButton={showPrevButton}
											setShowQuestions={setShowQuestions}
											setShowThankYou={setShowThankYou}
											setShowResults={setShowResults}
											setFinalScores={setFinalScores}
											togglePrevButton={togglePrevButton}
											handleScores={handleScores}
										/>
									)}

									{showResults && <ResultContainer />}

									{showScores && (
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
