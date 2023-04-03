function ScoresTableRow({
	rowNum,
	rowClassName,
	substanceName,
	score,
	risk,
	riskClassName,
	criterias,
}) {
	return (
		<>
			<tr
				key={substanceName}
				className={rowClassName}
			>
				{/* Category name */}
				<td rowSpan={4}>
					{`${rowNum}. `} {substanceName}
				</td>

				{/* Category Score */}
				<td rowSpan={4}>{score}</td>

				{/* Category Risk */}
				<td
					rowSpan={4}
					className={riskClassName}
				>
					{risk}
				</td>
			</tr>

			{/* Category Criterias */}
			{criterias.map(criteria => (
				<tr
					key={criteria}
					className={rowClassName}
				>
					<td>{criteria}</td>
				</tr>
			))}
		</>
	);
}

function ScoresTable({ scores, substanceRiskLevels, getSubstanceDetails }) {
	return (
		<>
			<h3>eAssist scores</h3>

			<table className="table table-borderless">
				<thead className="table-dark">
					<tr>
						<th
							className="py-4"
							scope="col"
						>
							Substance
						</th>
						<th
							className="py-4"
							scope="col"
						>
							Score
						</th>
						<th
							className="py-4"
							scope="col"
						>
							Risk
						</th>
						<th
							className="py-4"
							scope="col"
						>
							Criteria
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(scores).map((substanceId, index) => {
						let rowClassName = "";
						rowClassName = index % 2 === 0 ? null : "table-secondary";

						const substance = getSubstanceDetails(substanceId);
						const substanceScore = scores[substanceId];

						let substanceRiskText = "";
						const substanceRisk = substanceRiskLevels[substanceId];
						const substanceName = substance.name;
						const criterias = substanceRisk?.criterias;
						const riskLowMax = substanceRisk?.lower.max;
						const riskModerateMax = substanceRisk?.moderate.max;

						// TODO: Use moderateRiskSubstances and referralRiskSubstances in app.js for below.
						let substanceRiskTextClassName = "text-danger";
						if (substanceScore <= riskLowMax) {
							substanceRiskText = substanceRisk.lower.text;
							substanceRiskTextClassName = null;
						} else if (substanceScore <= riskModerateMax) {
							substanceRiskText = substanceRisk.moderate.text;
						} else {
							substanceRiskText = substanceRisk.high.text;
						}

						return (
							<ScoresTableRow
								key={substanceId}
								substanceName={substanceName}
								score={substanceScore}
								risk={substanceRiskText}
								criterias={criterias}
								rowNum={index + 1}
								riskClassName={substanceRiskTextClassName}
								rowClassName={rowClassName}
							/>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default ScoresTable;
