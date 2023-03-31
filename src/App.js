import { useEffect, useState } from "react";
import { data } from "./data";

import Layout from "./components/layouts/Layout";
import CardLayout from "./components/layouts/CardLayout";
import UserDetails from "./components/UserDetails";
import QuestionContainer from "./components/QuestionContainer";
import ResultContainer from "./components/AdviceContainer";
import ThankYouContainer from "./components/ThankYouContainer";
import ScoresTable from "./components/ScoresTable";

function App() {
	const allPages = Object.freeze({
		userDetails: 0,
		questions: 1,
		thankYou: 2,
		advice: 3,
		scores: 4,
	});

	const [content, setContent] = useState(null);
	const [finalScores, setFinalScores] = useState(null);
	const [currentPage, setCurrentPage] = useState(allPages.userDetails);

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function handleScores(score) {
		setFinalScores(score);
		if (score) handlePage(allPages.advice);
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.

	return (
		<Layout>
			{!content && <h1>Loading</h1>}

			{content && (
				<CardLayout>
					{currentPage === allPages.userDetails && (
						<UserDetails
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
				</CardLayout>
			)}
		</Layout>
	);
}

export default App;
