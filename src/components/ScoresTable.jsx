function ScoresTableRow({
	rowNum,
	rowClassName,
	categoryName,
	score,
	risk,
	riskClassName,
	criterias,
}) {
	return (
		<>
			<tr
				key={categoryName}
				className={rowClassName}
			>
				{/* Category name */}
				<td rowSpan={4}>
					{`${rowNum}. `} {categoryName}
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

function ScoresTable({ scores, substanceRiskLevels }) {
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
					{Object.keys(scores).map((category, index) => {
						let rowClassName = "";
						rowClassName = index % 2 === 0 ? null : "table-secondary";

						const categoryScore = scores[category];

						let substanceRiskText = "";
						const substanceRisk = substanceRiskLevels[category];
						const categoryName = substanceRisk.name;
						const criterias = substanceRisk?.criterias;
						const riskLowMax = substanceRisk?.lower.max;
						const riskModerateMax = substanceRisk?.moderate.max;

						let substanceRiskTextClassName = "text-danger";
						if (categoryScore < riskLowMax) {
							substanceRiskText = substanceRisk.lower.text;
							substanceRiskTextClassName = null;
						} else if (categoryScore < riskModerateMax) {
							substanceRiskText = substanceRisk.moderate.text;
						} else {
							substanceRiskText = substanceRisk.high.text;
						}

						return (
							<ScoresTableRow
								key={category}
								categoryName={categoryName}
								score={categoryScore}
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
