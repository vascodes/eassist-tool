import PageButton from "./PageButton";

function PageNavigation({
	nextButtonText = "Next >",
	nextButtonStyles,
	showNextButton,
	previousButtonText = "< Changed my mind",
	previousButtonStyles,
	showPreviousButton,
	handleNextButtonClick,
	handlePreviousButtonClick,
}) {
	return (
		<div className="question-navigation">
			{/* Next Button */}
			{showNextButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={nextButtonText}
						buttonClass="btn btn-success"
						handlePageButtonClick={handleNextButtonClick}
					/>
				</div>
			)}

			{/* Previous Button */}
			{showPreviousButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={previousButtonText}
						buttonClass="btn btn-outline-success"
						handlePageButtonClick={handlePreviousButtonClick}
					/>
				</div>
			)}
		</div>
	);
}

export default PageNavigation;
