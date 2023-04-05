import PageButton from "../ui/PageButton";
import Advice from "./Advice";
import CardLayout from "../layouts/CardLayout";

function AdviceContainer({
	allPages,
	handlePage,
	substanceRiskCategories,
	getSubstanceAdviceHTML,
}) {
	const moderateRiskSubstances = substanceRiskCategories.moderate;
	const referralRiskSubstances = substanceRiskCategories.referral;

	function handleNextButtonClick() {
		handlePage(allPages.scores);
	}

	function handlePrevButtonClick() {
		handlePage(allPages.questions);
	}

	return (
		<CardLayout>
			<div>
				<h4 className="text-center">What's next?</h4>
				<p className="result-container">
					Thanks for completing the questions. Click each section below to view further
					information and advice.
				</p>
			</div>

			<Advice
				type="moderate"
				substances={moderateRiskSubstances}
				getSubstanceAdviceHTML={getSubstanceAdviceHTML}
			/>

			<Advice
				type="referral"
				substances={referralRiskSubstances}
				getSubstanceAdviceHTML={getSubstanceAdviceHTML}
			/>

			{/* Next Button */}
			<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonText={"Next >"}
					buttonClass="btn btn-success"
					handlePageButtonClick={handleNextButtonClick}
				/>
			</div>

			{/* Previous Button */}
			<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonText={"< Changed my mind"}
					buttonClass="btn btn-outline-success"
					handlePageButtonClick={handlePrevButtonClick}
				/>
			</div>
		</CardLayout>
	);
}

export default AdviceContainer;
