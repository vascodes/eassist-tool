import { useEffect, useState } from "react";
import { data } from "./data";

import Layout from "./components/layouts/Layout";
import CardLayout from "./components/layouts/CardLayout";
import UserDetails from "./components/UserDetails";
import QuestionContainer from "./components/QuestionContainer";
import Advice from "./components/Advice";
import ThankYou from "./components/ThankYou";
import ScoresTable from "./components/ScoresTable";
import Home from "./components/Home";

function App() {
	const allPages = Object.freeze({
		home: 0,
		userDetails: 1,
		questions: 2,
		thankYou: 3,
		advice: 4,
		scores: 5,
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

			{content &&
				(currentPage === allPages.home ? (
					<Home />
				) : (
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
							<Advice
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

						{currentPage === allPages.thankYou && <ThankYou />}
					</CardLayout>
				))}
		</Layout>
	);
}

export default App;
