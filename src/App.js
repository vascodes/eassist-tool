import { useContext, useEffect, useRef, useState } from "react";

import { data as dataEN } from "./data-en";
import { data as dataML } from "./data-ml";

import Layout from "./components/layouts/Layout";
import Home from "./components/home/Home";
import UserDetails from "./components/user-details/UserDetails";
import QuestionContainer from "./components/question/QuestionContainer";
import AdviceContainer from "./components/advice/AdviceContainer";
import ScoresTable from "./components/score/ScoresTable";
import ThankYou from "./components/thank-you/ThankYou";
import Contact from "./components/contact/Contact";

import { AppContext } from "./contexts/AppContext";
import useFetch from "./hooks/useFetch";
import usePage from "./hooks/usePage";

import { getInitialSubstanceScores, getInitialCategories } from "./utils/helper";

function App() {
	const [language, setLanguage] = useState("en");
	const { content, setContent, getSubstanceDetailsById, getSubstanceAdviceHTML } = useFetch(dataEN);
	const { page, setPage, allPages } = usePage(useContext(AppContext));
	const resultsRef = useRef({
		scores: getInitialSubstanceScores(content?.substances),
		categorizedSubstances: getInitialCategories(),
	});

	// Change from loading page once data is fetched.
	useEffect(() => {
		if (content && !page) {
			setPage(allPages.home);
		}
	}, [allPages.home, content, page, setPage]);

	function changeLanguage(language) {
		switch (language) {
			case "en":
				setLanguage("en");
				setContent(dataEN);
				break;

			case "ml":
				setLanguage("ml");
				setContent(dataML);
				break;

			default:
				setLanguage("en");
				break;
		}
	}

	function showPage(page) {
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
						scoreMeaning={content?.scoreMeaning}
						getSubstanceDetails={getSubstanceDetailsById}
					/>
				);
				break;

			case allPages.thankYou:
				componentToDisplay = <ThankYou />;
				break;

			case allPages.contact:
				componentToDisplay = <Contact>{content?.contactDetails}</Contact>;
				break;

			default:
				componentToDisplay = <h1>Loading</h1>;
				break;
		}

		return componentToDisplay;
	}

	return (
		<AppContext.Provider value={{ language, changeLanguage, allPages, setPage }}>
			<Layout key={language}>{showPage(page)}</Layout>
		</AppContext.Provider>
	);
}

export default App;
