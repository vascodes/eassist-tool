import { useContext } from "react";
import PageButton from "./PageButton";
import { AppContext } from "../../contexts/AppContext";

function PageNavigation({
	nextButtonText,
	nextButtonStyles,
	showNextButton,
	previousButtonText,
	previousButtonStyles,
	showPreviousButton,
	handleNextButtonClick,
	handlePreviousButtonClick,
}) {
	const {translation} = useContext(AppContext);
	return (
		<div className="question-navigation">
			{/* Next Button */}
			{showNextButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={nextButtonText || translation.pageNavigation.next}
						buttonClass="btn btn-success"
						handlePageButtonClick={handleNextButtonClick}
					/>
				</div>
			)}

			{/* Previous Button */}
			{showPreviousButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={previousButtonText || translation.pageNavigation.previous}
						buttonClass="btn btn-outline-success"
						handlePageButtonClick={handlePreviousButtonClick}
					/>
				</div>
			)}
		</div>
	);
}

export default PageNavigation;
