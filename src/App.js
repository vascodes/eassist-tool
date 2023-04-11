import { useContext, useEffect, useState } from "react";
import { data } from "./data";

import Layout from "./components/layouts/Layout";
import Home from "./components/home/Home";
import UserDetails from "./components/user-details/UserDetails";
import QuestionContainer from "./components/question/QuestionContainer";
import AdviceContainer from "./components/advice/AdviceContainer";
import ScoresTable from "./components/score/ScoresTable";
import ThankYou from "./components/thank-you/ThankYou";
import Contact from "./components/contact/Contact";

import { PageContext } from "./components/contexts/PageContext";

function App() {
	const allPages = Object.freeze({
		home: 1,
		userDetails: 2,
		questions: 3,
		thankYou: 4,
		advice: 5,
		scores: 6,
		contact: 7,
	});

	const [content] = useState(data);
	const [page, setPage] = useState(useContext(PageContext));
	const [scores, setScores] = useState(null);
	const [substanceRiskCategories, setSubstanceRiskCategories] = useState({
		low: [],
		moderate: [],
		referral: [],
	});

	function getSubstanceScores(allSelectedAnswers, answeredQuestions) {
		const substanceScores = {};

		// Initialize scores for all substances as 0.
		for (let substance of content?.substances) {
			substanceScores[substance.id] = 0;
		}

		// Compute total score of each substance.
		for (let questionId in allSelectedAnswers) {
			// Answers of Question 1, Question 8 should not be considered.
			if (questionId === 1 || questionId === 8) {
				continue;
			}

			/*				
				Ignore options of questions in allSelectedAnswers that are not in answeredQuestions list.
				This ensures that only the selected options of visted questions
				are considered when calculating the substance's score.
				
				Example: 
				User might choose options of question 4, 5 but later change 
				the answers of previous question such that question 4 and 5 is skipped. 
				In this case, answers of question 4, 5
				should not be considered when calculating the score.
			*/
			if (!answeredQuestions.includes(Number(questionId))) {
				continue;
			}

			const selectedSubstances = allSelectedAnswers[questionId];
			for (let substanceId in selectedSubstances) {
				let substance = selectedSubstances[substanceId];

				// Update score of substance in substanceScores.
				if (substanceId in substanceScores)
					substanceScores[substanceId] += Number(substance.score);
			}
		}

		return substanceScores;
	}

	function categorizeSubstancesBasedOnScore(scores) {
		const substancesWithLowRisk = [],
			substancesWithModerateRisk = [],
			substancesWithHighRisk = [];

		for (let substanceId in scores) {
			const substance = getSubstanceDetailsById(substanceId);

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

	function showAdvice(allSelectedAnswers, answeredQuestions) {
		const scores = getSubstanceScores(
			allSelectedAnswers,
			answeredQuestions,
		);
		categorizeSubstancesBasedOnScore(scores);
		console.log(scores);
		setScores(scores);
		setPage(allPages.advice);
	}

	function getSubstanceDetailsById(substanceId) {
		return content?.substances.find(
			substance => substance.id === substanceId,
		);
	}

	function getSubstanceAdviceHTML(type = "moderate", substanceId) {
		type = type.toLowerCase();
		substanceId = substanceId?.toLowerCase();
		const adviceHTML = content?.substanceAdvice[type][substanceId];

		return adviceHTML;
	}

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && !page) {
			setPage(allPages.home);
		}
	}, [allPages, content, page]);

	return (
		<PageContext.Provider value={{ allPages, setPage }}>
			<Layout>
				{/* Loading Page. */}
				{!page && <h1>Loading</h1>}

				{/* Home Page. */}
				{page === allPages.home && <Home />}

				{/* User Details Page. */}
				{page === allPages.userDetails && <UserDetails />}

				{/* Questions Page. */}
				{page === allPages.questions && (
					<QuestionContainer
						allQuestions={content?.questions}
						allSubstances={content?.substances}
						showAdvice={showAdvice}
					/>
				)}

				{/* Advice Page. */}
				{page === allPages.advice && (
					<AdviceContainer
						substanceRiskCategories={substanceRiskCategories}
						getSubstanceAdviceHTML={getSubstanceAdviceHTML}
					/>
				)}

				{/* Scores Page. */}
				{page === allPages.scores && (
					<ScoresTable
						scores={scores}
						substanceRiskCategories={substanceRiskCategories}
						substanceRiskLevels={content?.substanceRiskLevels}
						getSubstanceDetails={getSubstanceDetailsById}
					/>
				)}

				{/* Thank You Page. */}
				{page === allPages.thankYou && <ThankYou />}

				{page === allPages.contact && <Contact />}
			</Layout>
		</PageContext.Provider>
	);
}

export default App;
