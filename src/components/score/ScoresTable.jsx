import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

import ScoresTableRow from "./ScoresTableRow";
import CardLayout from "../layouts/CardLayout";
import PageNavigation from "../ui/PageNavigation";

function ScoresTable({ resultsRef, substanceRiskLevels, scoreMeaning, getSubstanceDetails }) {
	const { allPages, setPage } = useContext(PageContext);

	function handlePrevButtonClick() {
		setPage(allPages.advice);
	}

	const scores = resultsRef.current.scores;
	const moderateRiskSubstances =
		resultsRef.current.categorizedSubstances.moderate;
	const referralRiskSubstances =
		resultsRef.current.categorizedSubstances.referral;

	const substances = Object.keys(scores);
	const scoreTableHeadings = ["Substance", "Score", "Risk", "Criteria"];
	return (
		<CardLayout>
			<h3>eAssist scores</h3>

			{/* Scores Table */}
			<div className="table-responsive">
				<table className="table table-borderless">
					<thead className="bg-success text-white">
						<tr>
							{scoreTableHeadings.map((heading, index) => (
								<th
									key={index}
									className="py-4"
									scope="col"
								>
									{heading}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{substances.map((substanceId, index) => {
							// Alternate table row style.
							let rowClassName =
								index % 2 === 0 ? null : "table-secondary";

							const substance = getSubstanceDetails(substanceId);
							const substanceRisk = substanceRiskLevels[substanceId];

							let substanceRiskText = "";
							let substanceRiskTextClassName = "text-danger";

							let isModerateRiskSubstance =
								moderateRiskSubstances.find(
									s => s.id === substanceId,
								);
							let isReferralRiskSubstance =
								referralRiskSubstances.find(
									s => s.id === substanceId,
								);

							if (isModerateRiskSubstance) {
								substanceRiskText = substanceRisk.moderate.text;
							} else if (isReferralRiskSubstance) {
								substanceRiskText = substanceRisk.high.text;
							} else {
								// Low risk substance.
								substanceRiskText = substanceRisk.lower.text;
								substanceRiskTextClassName = null;
							}

							return (
								<ScoresTableRow
									key={substanceId}
									substanceName={substance.name}
									score={scores[substanceId]}
									risk={substanceRiskText}
									criterias={substanceRisk?.criterias}
									rowNum={index + 1}
									riskClassName={substanceRiskTextClassName}
									rowClassName={rowClassName}
								/>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Score Meaning Table */}
			<div className="table-responsive mt-5">
				<h4>Score Meaning</h4>
				<table className="table table-bordered table-striped">
					<thead className="bg-success text-white">
						<tr>
							<th scope="col">Category</th>
							<th scope="col">Meaning</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Lower</th>
							<td>{scoreMeaning.lower}</td>
						</tr>
						<tr>
							<th scope="row">Moderate</th>
							<td>{scoreMeaning.moderate}</td>
						</tr>
						<tr>
							<th scope="row">Referral / High</th>
							<td>{scoreMeaning.high}</td>
						</tr>
					</tbody>

				</table>
			</div>

			<PageNavigation
				showPreviousButton
				previousButtonText="< Show Advice"
				handlePreviousButtonClick={handlePrevButtonClick}
			/>
		</CardLayout>
	);
}

export default ScoresTable;
