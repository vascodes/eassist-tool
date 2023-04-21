import { useContext, useEffect, useRef } from "react";

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
import usePage from "./hooks/usePage";

import { getInitialSubstanceScores, getInitialCategories } from "./utils/helper";

function App() {
	const { content, getSubstanceDetailsById, getSubstanceAdviceHTML } = useFetch();

	const resultsRef = useRef({
		scores: getInitialSubstanceScores(content?.substances),
		categorizedSubstances: getInitialCategories(),
	});

	const { page, setPage, allPages } = usePage(useContext(PageContext));

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && !page) {
			setPage(allPages.home);
		}
	}, []);

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
					resultsRef={resultsRef}
				/>
			);
			break;

		case allPages.advice:
			pageToDisplay = (
				<AdviceContainer
					resultsRef={resultsRef}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetailsById={getSubstanceDetailsById}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			);
			break;

		case allPages.scores:
			pageToDisplay = (
				<ScoresTable
					resultsRef={resultsRef}
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
