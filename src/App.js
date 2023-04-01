import { useEffect, useState } from "react";
import { data } from "./data";

import Layout from "./components/layouts/Layout";
import CardLayout from "./components/layouts/CardLayout";
import UserDetails from "./components/UserDetails";
import QuestionContainer from "./components/QuestionContainer";
import AdviceContainer from "./components/AdviceContainer";
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
	const [moderateSubstances, setModerateSubstances] = useState([]);
	const [referralSubstances, setReferralSubstances] = useState([]);
	const [currentPage, setCurrentPage] = useState(allPages.userDetails);

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function handleScores(scores) {
		setFinalScores(scores);

		/*
			find substances with moderate risk and put them in moderateList
			find substances with high risk and put them in referralList
			pass both lists as props to AdviceContainer.
			show advice for substances in respective lists.
			pass these lists as props to ScoresTable.
			If score > 0 for any substance in scores, then check if substance is in moderate or referral List
				and display each row accordingly else display score as 0 and risk as low.
		*/
		const substancesWithModerateRisk = [];
		const substancesWithHighRisk = [];

		for (let substance in scores) {
			let substanceScore = scores[substance];
			const substanceRisk = content?.substanceRiskLevels[substance];

			const riskLowMax = substanceRisk?.lower.max;
			const riskModerateMax = substanceRisk?.moderate.max;

			if (substanceScore <= riskLowMax) {
			} else if (substanceScore <= riskModerateMax) {
				substancesWithModerateRisk.push(substanceRisk);
			} else {
				substancesWithHighRisk.push(substanceRisk);
			}
		}

		setModerateSubstances(substancesWithModerateRisk);
		setReferralSubstances(substancesWithHighRisk);

		if (scores) handlePage(allPages.advice);
	}

	function getSubstanceAdviceHTML(type, substanceId) {
		type = type.toLowerCase();
		substanceId = substanceId.toLowerCase();

		return content?.substanceAdvice[type][substanceId];
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
								substances={content?.substances}
								handlePage={handlePage}
								handleScores={handleScores}
							/>
						)}

						{currentPage === allPages.advice && (
							<AdviceContainer
								allPages={allPages}
								handlePage={handlePage}
								scores={finalScores}
								substanceRiskLevels={content?.substanceRiskLevels}
								moderateSubstances={moderateSubstances}
								referralSubstances={referralSubstances}
								getSubstanceAdviceHTML={getSubstanceAdviceHTML}
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
