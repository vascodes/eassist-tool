import { useEffect, useState } from "react";
import { data } from "./data";

import Home from "./components/Home";
import QuestionContainer from "./components/QuestionContainer";
import ResultContainer from "./components/AdviceContainer";
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
	const [currentPage, setCurrentPage] = useState(allPages.home);

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function handleScores(score) {
		setFinalScores(score);
		if (score) handlePage(allPages.advice);
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.

	return (
		<>
			<NavBar />

			{/* TODO: Save input data in Home */}
			<div className="container pt-4 pb-5 app-container">
				{content && (
					<div className="row">
						<div className="container-fluid col-lg-8 mb-3">
							<div className="card">
								<div className="card-body">
									{currentPage === allPages.home && (
										<Home
											allPages={allPages}
											handlePage={handlePage}
										/>
									)}

									{currentPage === allPages.questions && (
										<QuestionContainer
											allPages={allPages}
											questions={content?.questions}
											handlePage={handlePage}
											handleScores={handleScores}
										/>
									)}

									{currentPage === allPages.advice && (
										<ResultContainer
											allPages={allPages}
											handlePage={handlePage}
										/>
									)}

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
