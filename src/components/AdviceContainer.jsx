import { useEffect, useState } from "react";
import PageButton from "./PageButton";
import Advice from "./Advice";

// TODO: Dynamically populate advice.
function AdviceContainer({ allPages, handlePage, moderateSubstances, referralSubstances }) {
	function handleNextButtonClick() {
		handlePage(allPages.scores);
	}

	function handlePrevButtonClick() {
		handlePage(allPages.questions);
	}	

	// Object.keys(scores).map(substance => {
	// 	const substanceScore = scores[substance];

	// 	let substanceRiskText = "";
	// 	let substanceRiskAdviceText = "";
	// 	const substanceRisk = substanceRiskLevels[substance];
	// 	const substanceName = substanceRisk?.name;
	// 	const criterias = substanceRisk?.criterias;
	// 	const riskLowMax = substanceRisk?.lower.max;
	// 	const riskModerateMax = substanceRisk?.moderate.max;

	// 	if (substanceScore <= riskLowMax) {
	// 		substanceRiskText = substanceRisk.lower.text;
	// 	} else if (substanceScore <= riskModerateMax) {
	// 		substanceRiskText = substanceRisk.moderate.text;
	// 		substanceRiskAdviceText = substanceRisk.moderate.adviceText;
	// 	} else {
	// 		substanceRiskText = substanceRisk.high.text;
	// 		substanceRiskAdviceText = substanceRisk.high.adviceText;
	// 	}
	// });
	
	return (
		<>
			<div>
				<h4 className="text-center">What's next?</h4>
				<p className="result-container">
					Thanks for completing the questions. Click each section below to view further
					information and advice.
				</p>
			</div>

			<Advice
				type="Moderate"
				substances={moderateSubstances}
			/>

			<Advice
				type="Referral"
				substances={referralSubstances}
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
		</>
	);
}

export default AdviceContainer;
