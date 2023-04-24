import Advice from "./Advice";
import CardLayout from "../layouts/CardLayout";
import PageNavigation from "../ui/PageNavigation";

import { getCategorizedSubstances } from "./helper";

import { useContext, useMemo } from "react";
import { AppContext } from "../../contexts/AppContext";

function AdviceContainer({
	resultsRef,
	substanceRiskLevels,
	getSubstanceDetailsById,
	getSubstanceAdviceHTML,
}) {
	const { translation, allPages, setPage } = useContext(AppContext);

	const categorizedSubstances = useMemo(
		() =>
			getCategorizedSubstances(
				resultsRef.current.scores,
				substanceRiskLevels,
				getSubstanceDetailsById,
			),
		[getSubstanceDetailsById, resultsRef, substanceRiskLevels],
	);

	resultsRef.current.categorizedSubstances = categorizedSubstances;

	const moderateRiskSubstances = categorizedSubstances?.moderate;
	const referralRiskSubstances = categorizedSubstances?.referral;

	function handleNextButtonClick() {
		setPage(allPages.scores);
	}

	function handlePrevButtonClick() {
		setPage(allPages.questions);
	}

	return (
		<CardLayout>
			<div>
				<h4 className="text-center">{translation.advice.title}</h4>
				<p className="result-container">{translation.advice.text}</p>
			</div>

			{moderateRiskSubstances.length > 0 && (
				<Advice
					type={"moderate"}
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
				nextButtonText={translation.pageNavigation.viewScores}
				previousButtonText={translation.pageNavigation.restartQuestionnaire}
				showPreviousButton
				handleNextButtonClick={handleNextButtonClick}
				handlePreviousButtonClick={handlePrevButtonClick}
			/>
		</CardLayout>
	);
}

export default AdviceContainer;
