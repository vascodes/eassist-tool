import Advice from "./Advice";
import CardLayout from "../layouts/CardLayout";
import PageNavigation from "../ui/PageNavigation";

import { useContext, useEffect } from "react";
import { PageContext } from "../contexts/PageContext";

function AdviceContainer({ substanceRiskCategories, getSubstanceAdviceHTML }) {
	const { allPages, setPage } = useContext(PageContext);

	const moderateRiskSubstances = substanceRiskCategories.moderate;
	const referralRiskSubstances = substanceRiskCategories.referral;

	function handleNextButtonClick() {
		setPage(allPages.scores);
	}

	function handlePrevButtonClick() {
		setPage(allPages.questions);
	}

	useEffect(
		() => console.log(moderateRiskSubstances, referralRiskSubstances),
		[],
	);

	return (
		<CardLayout>
			<div>
				<h4 className="text-center">What's next?</h4>
				<p className="result-container">
					Thanks for completing the questions. Click each section
					below to view further information and advice.
				</p>
			</div>

			{moderateRiskSubstances.length > 0 && (
				<Advice
					type="moderate"
					substances={moderateRiskSubstances}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			)}

			{referralRiskSubstances.length > 0 && (
				<Advice
					type="referral"
					substances={referralRiskSubstances}
					getSubstanceAdviceHTML={getSubstanceAdviceHTML}
				/>
			)}

			<PageNavigation
				showNextButton
				showPreviousButton
				handleNextButtonClick={handleNextButtonClick}
				handlePrevButtonClick={handlePrevButtonClick}
			/>
		</CardLayout>
	);
}

export default AdviceContainer;
