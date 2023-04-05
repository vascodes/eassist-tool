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
		loading: 0,
		home: 1,
		userDetails: 2,
		questions: 3,
		thankYou: 4,
		advice: 5,
		scores: 6,
	});

	const [content, setContent] = useState(null);
	const [finalScores, setFinalScores] = useState(null);
	const [moderateRiskSubstances, setModerateRiskSubstances] = useState([]);
	const [referralRiskSubstances, setReferralRiskSubstances] = useState([]);
	const [currentPage, setCurrentPage] = useState(allPages.loading);

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function handleScores(scores) {
		console.log(scores);
		setFinalScores(scores);

		const substancesWithModerateRisk = [];
		const substancesWithHighRisk = [];

		for (let substanceId in scores) {
			const substance = getSubstanceDetails(substanceId);

			let substanceScore = scores[substanceId];
			const substanceRisk = content?.substanceRiskLevels[substanceId];

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

		if (scores) handlePage(allPages.advice);
	}

	function getSubstanceDetails(substanceId) {
		return content?.substances.find(substance => substance.id === substanceId);
	}

	function getSubstanceAdviceHTML(type = "moderate", substanceId) {
		type = type.toLowerCase();
		substanceId = substanceId?.toLowerCase();

		return content?.substanceAdvice[type][substanceId];
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && currentPage === allPages.loading) {
			setCurrentPage(allPages.userDetails);
		}
	}, [allPages, content, currentPage]);

	return (
		<Layout>
			{currentPage === allPages.loading && <h1>Loading</h1>}

			{currentPage === allPages.home && <Home />}

			{currentPage === allPages.userDetails && (
				<UserDetails
					allPages={allPages}
					handlePage={handlePage}
				/>
			)}

			{currentPage === allPages.questions && (
				<QuestionContainer
					allPages={allPages}
					handlePage={handlePage}
					questions={content?.questions}
					allSubstances={content?.substances}
					handleScores={handleScores}
					getSubstanceDetails={getSubstanceDetails}
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
					moderateRiskSubstances={moderateRiskSubstances}
					referralRiskSubstances={referralRiskSubstances}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetails={getSubstanceDetails}
				/>
			)}

			{currentPage === allPages.thankYou && <ThankYou />}
		</Layout>
	);
}

export default App;
