import PageButton from "./PageButton";

function PageNavigation({
	NextButtonText = "Next >",
	PreviousButtonText = "< Changed my mind",
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
						buttonText={NextButtonText}
						buttonClass="btn btn-success"
						handlePageButtonClick={handleNextButtonClick}
					/>
				</div>
			)}

			{/* Previous Button */}
			{showPreviousButton && (
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={PreviousButtonText}
						buttonClass="btn btn-outline-success"
						handlePageButtonClick={handlePrevButtonClick}
					/>
				</div>
			)}
		</div>
	);
}

export default PageNavigation;
