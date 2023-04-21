import { useContext, useEffect, useState } from "react";

import Layout from "./components/layouts/Layout";
import Home from "./components/home/Home";
import UserDetails from "./components/user-details/UserDetails";
import QuestionContainer from "./components/question/QuestionContainer";
import AdviceContainer from "./components/advice/AdviceContainer";
import ScoresTable from "./components/score/ScoresTable";
import ThankYou from "./components/thank-you/ThankYou";
import Contact from "./components/contact/Contact";

import { PageContext } from "./components/contexts/PageContext";
import useFetch from "./hooks/useFetch";
import { calculateSubstanceScores } from "./utils/helper";

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

	const { content, getSubstanceDetailsById, getSubstanceAdviceHTML } =
		useFetch();

	const [scores, setScores] = useState(null);
	const [substanceRiskCategories, setSubstanceRiskCategories] = useState({
		low: [],
		moderate: [],
		referral: [],
	});
	const [page, setPage] = useState(useContext(PageContext));

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && !page) {
			setPage(allPages.home);
		}
	}, [allPages, content, page]);

	function categorizeSubstancesBasedOnScore(substanceRiskLevels, scores) {
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
		const scores = calculateSubstanceScores(
			content?.substances,
			allSelectedAnswers,
			answeredQuestions,
		);

		categorizeSubstancesBasedOnScore(content?.substanceRiskLevels, scores);
		console.log(scores);
		setScores(scores);
		setPage(allPages.advice);
	}

	let pageToDisplay = null;
	switch (page) {
		case allPages.home:
			pageToDisplay = <Home />;
			break;

		case allPages.userDetails:
			pageToDisplay = <UserDetails />;
			break;

		case allPages.questions:
			pageToDisplay = (
				<QuestionContainer
					allQuestions={content?.questions}
					allSubstances={content?.substances}
					showAdvice={showAdvice}
				/>
			);
			break;

		case allPages.advice:
			pageToDisplay = (
				<AdviceContainer
					substanceRiskCategories={substanceRiskCategories}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			);
			break;

		case allPages.scores:
			pageToDisplay = (
				<ScoresTable
					scores={scores}
					substanceRiskCategories={substanceRiskCategories}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetails={getSubstanceDetailsById}
				/>
			);
			break;

		case allPages.thankYou:
			pageToDisplay = <ThankYou />;
			break;

		case allPages.contact:
			pageToDisplay = <Contact />;
			break;

		default:
			pageToDisplay = <h1>Loading</h1>;
			break;
	}

	return (
		<PageContext.Provider value={{ allPages, setPage }}>
			<Layout>{pageToDisplay}</Layout>
		</PageContext.Provider>
	);
}

export default App;
