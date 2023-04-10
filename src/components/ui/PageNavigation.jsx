import PageButton from "./PageButton";

function PageNavigation({
	NextButtonText,
	PreviousButtonText,
	showNextButton,
	showPreviousButton,
	handleNextButtonClick,
	handlePrevButtonClick,
}) {
	return (
		<div className="question-navigation">
			{/* Next Button */}
			{showNextButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={NextButtonText || "Next >"}
						buttonClass="btn btn-success"
						handlePageButtonClick={handleNextButtonClick}
					/>
				</div>
			)}

			{/* Previous Button */}
			{showPreviousButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={PreviousButtonText || "< Changed my mind"}
						buttonClass="btn btn-outline-success"
						handlePageButtonClick={handlePrevButtonClick}
					/>
				</div>
			)}
		</div>
	);
}

export default PageNavigation;
