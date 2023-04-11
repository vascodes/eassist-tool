import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import PageNavigation from "../ui/PageNavigation";

function Home() {
	const { allPages, setPage } = useContext(PageContext);

	function handleNextButtonClick() {
		setPage(allPages.userDetails);
	}

	return (
		<>
			<h1>This is the Home page.</h1>
			<PageNavigation
				showNextButton
				nextButtonText="Start Questionnaire >"
				handleNextButtonClick={handleNextButtonClick}
			/>
		</>
	);
}

export default Home;
