import { useEffect, useState } from "react";
import { data } from "./data";

import Layout from "./components/layouts/Layout";
import Home from "./components/home/Home";
import UserDetails from "./components/user-details/UserDetails";
import QuestionContainer from "./components/question/QuestionContainer";
import AdviceContainer from "./components/advice/AdviceContainer";
import ScoresTable from "./components/score/ScoresTable";
import ThankYou from "./components/thank-you/ThankYou";

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
	const [currentPage, setCurrentPage] = useState(allPages.loading);
	const [score, setScore] = useState(null);
	const [substanceRiskCategories, setSubstanceRiskCategories] = useState({
		low: [],
		moderate: [],
		referral: [],
	});

	function handlePage(selectedPage) {
		setCurrentPage(selectedPage);
	}

	function categorizeSubstancesBasedOnScore(scores) {
		const substancesWithLowRisk = [],
			substancesWithModerateRisk = [],
			substancesWithHighRisk = [];

		for (let substanceId in scores) {
			const substance = getSubstanceDetails(substanceId);

			let substanceScore = scores[substanceId];
			const substanceRisk = content?.substanceRiskLevels[substanceId];

			const lowMax = substanceRisk.lower.max;
			const moderateMax = substanceRisk.moderate.max;

			if (substanceScore <= lowMax) {
				substancesWithLowRisk.push(substance);
			} else if (substanceScore <= moderateMax) {
				substancesWithModerateRisk.push(substance);
			} else {
				substancesWithHighRisk.push(substance);
			}
		}

		const riskCategories = {
			low: substancesWithLowRisk,
			moderate: substancesWithModerateRisk,
			referral: substancesWithHighRisk,
		};

		setSubstanceRiskCategories(riskCategories);
	}

	function handleScore(scores) {
		console.log(scores);
		setScore(scores);

		categorizeSubstancesBasedOnScore(scores);

		if (scores) handlePage(allPages.advice);
	}

	function getSubstanceDetails(substanceId) {
		return content?.substances.find(substance => substance.id === substanceId);
	}

	function getSubstanceAdviceHTML(type = "moderate", substanceId) {
		type = type.toLowerCase();
		substanceId = substanceId?.toLowerCase();
		const adviceHTML = content?.substanceAdvice[type][substanceId];

		return adviceHTML;
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
			{/* Loading Page. */}
			{currentPage === allPages.loading && <h1>Loading</h1>}

			{/* Home Page. */}
			{currentPage === allPages.home && <Home />}

			{/* User Details Page. */}
			{currentPage === allPages.userDetails && (
				<UserDetails
					allPages={allPages}
					handlePage={handlePage}
				/>
			)}

			{/* Questions Page. */}
			{currentPage === allPages.questions && (
				<QuestionContainer
					allPages={allPages}
					handlePage={handlePage}
					questions={content?.questions}
					allSubstances={content?.substances}
					handleScore={handleScore}
					getSubstanceDetails={getSubstanceDetails}
				/>
			)}

			{/* Advice Page. */}
			{currentPage === allPages.advice && (
				<AdviceContainer
					allPages={allPages}
					handlePage={handlePage}
					substanceRiskCategories={substanceRiskCategories}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			)}

			{/* Scores Page. */}
			{currentPage === allPages.scores && (
				<ScoresTable
					scores={score}
					substanceRiskCategories={substanceRiskCategories}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetails={getSubstanceDetails}
				/>
			)}

			{/* Thank You Page. */}
			{currentPage === allPages.thankYou && <ThankYou />}
		</Layout>
	);
}

export default App;
