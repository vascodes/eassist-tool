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

	const {
		content,		
		getSubstanceDetailsById,
		getSubstanceAdviceHTML,
	} = useFetch();
			
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
