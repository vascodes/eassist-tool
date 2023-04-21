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
	const { page, setPage, allPages } = usePage(useContext(PageContext));
	const resultsRef = useRef({
		scores: getInitialSubstanceScores(content?.substances),
		categorizedSubstances: getInitialCategories(),
	});	

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && !page) {
			setPage(allPages.home);
		}
	}, []);

	let componentToDisplay = null;
	switch (page) {
		case allPages.home:
			componentToDisplay = <Home />;
			break;

		case allPages.userDetails:
			componentToDisplay = <UserDetails />;
			break;

		case allPages.questions:
			componentToDisplay = (
				<QuestionContainer
					allQuestions={content?.questions}
					allSubstances={content?.substances}
					resultsRef={resultsRef}
				/>
			);
			break;

		case allPages.advice:
			componentToDisplay = (
				<AdviceContainer
					resultsRef={resultsRef}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetailsById={getSubstanceDetailsById}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			);
			break;

		case allPages.scores:
			componentToDisplay = (
				<ScoresTable
					resultsRef={resultsRef}
					substanceRiskLevels={content?.substanceRiskLevels}
					getSubstanceDetails={getSubstanceDetailsById}
				/>
			);
			break;

		case allPages.thankYou:
			componentToDisplay = <ThankYou />;
			break;

		case allPages.contact:
			componentToDisplay = <Contact />;
			break;

		default:
			componentToDisplay = <h1>Loading</h1>;
			break;
	}

	return (
		<PageContext.Provider value={{ allPages, setPage }}>
			<Layout>{componentToDisplay}</Layout>
		</PageContext.Provider>
	);
}

export default App;
