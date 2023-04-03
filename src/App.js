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
	const [moderateRiskSubstances, setModerateRiskSubstances] = useState([]);
	const [referralRiskSubstances, setReferralRiskSubstances] = useState([]);
	const [currentPage, setCurrentPage] = useState(allPages.userDetails);

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function handleScores(scores) {
		console.log(scores);
		setFinalScores(scores);

		/*
			TODO:
				find substances with moderate risk and put them in moderateList
				find substances with high risk and put them in referralList
				pass both lists as props to AdviceContainer.
				show advice for substances in respective lists.
				pass these lists as props to ScoresTable.
				If score > 0 for any substance in scores, then check if substance is in moderate or referral List
					and display each row accordingly else display score as 0 and risk as low.
		*/
		const substancesWithLowRisk = [];
		const substancesWithModerateRisk = [];
		const substancesWithHighRisk = [];

		for (let substanceId in scores) {
			const substance = getSubstanceDetails(substanceId);

			let substanceScore = scores[substanceId];
			const substanceRisk = content?.substanceRiskLevels[substanceId];
			console.log(substanceRisk);

			const { min: moderateMin, max: moderateMax } = substanceRisk.moderate;
			const { min: highMin } = substanceRisk.high;

			if (substanceScore >= moderateMin && substanceScore <= moderateMax) {
				substancesWithModerateRisk.push(substance);
			} else if (substanceScore >= highMin) {
				substancesWithHighRisk.push(substance);
			}
		}

		setModerateRiskSubstances(substancesWithModerateRisk);
		setReferralRiskSubstances(substancesWithHighRisk);

		console.log(substancesWithModerateRisk);
		console.log(substancesWithHighRisk);

		if (scores) handlePage(allPages.advice);
	}

	function getSubstanceDetails(substanceId){
		return content?.substances.find(substance => substance.id === substanceId);
	}
		
	function getSubstanceAdviceHTML(type, substanceId) {
		type = type?.toLowerCase();
		substanceId = substanceId?.toLowerCase();

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
								allSubstances={content?.substances}
								handlePage={handlePage}
								handleScores={handleScores}
								getSubstanceDetails = {getSubstanceDetails}
							/>
						)}

						{currentPage === allPages.advice && (
							<AdviceContainer
								allPages={allPages}
								handlePage={handlePage}
								moderateRiskSubstances={moderateRiskSubstances}
								referralRiskSubstances={referralRiskSubstances}
								getSubstanceAdviceHTML={getSubstanceAdviceHTML}
							/>
						)}

						{currentPage === allPages.scores && (
							<ScoresTable
								scores={finalScores}
								substanceRiskLevels={content?.substanceRiskLevels}
								getSubstanceDetails = {getSubstanceDetails}
							/>
						)}

						{currentPage === allPages.thankYou && <ThankYou />}
					</CardLayout>
				))}
		</Layout>
	);
}

export default App;
