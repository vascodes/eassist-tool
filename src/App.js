import { useEffect, useState } from "react";
import { data } from "./data";

import QuestionContainer from "./components/QuestionContainer";
import ResultContainer from "./components/ResultContainer";
import ThankYouContainer from "./components/ThankYouContainer";
import ScoresTable from "./components/ScoresTable";
import NavBar from "./components/NavBar";
import InfoCard from "./components/InfoCard";

function App() {
	const allPages = Object.freeze({
		home: 0,
		questions: 1,
		thankYou: 2,
		advice: 3,
		scores: 4,
	});
	
	const [content, setContent] = useState(null);	
	const [finalScores, setFinalScores] = useState(null);
	const [currentPage, setCurrentPage] = useState(allPages.questions);	

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);				
	}	

	useEffect(() => setContent(data), []); // Fetch data on app load.

	function handleScores(score) {
		setFinalScores(score);
		if (score)
			handlePage(allPages.scores);
	}

	return (
		<>
			<NavBar />

			<div className="container pt-4 pb-5 app-container">
				{content && (
					<div className="row">
						<div className="container-fluid col-lg-8 questions-container">
							<div className="card">
								<div className="card-body">
									{currentPage === allPages.home && <h1>HOME PAGE</h1>}
									
									{currentPage === allPages.questions && (
										<QuestionContainer
											allPages={allPages}
											questions={content?.questions}
											handlePage={handlePage}
											handleScores={handleScores}											
										/>
									)}

									{currentPage === allPages.advice && <ResultContainer />}

									{currentPage === allPages.scores && (
										<ScoresTable
											scores={finalScores}
											substanceRiskLevels={content?.substanceRiskLevels}
										/>
									)}

									{currentPage === allPages.thankYou && <ThankYouContainer />}
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
