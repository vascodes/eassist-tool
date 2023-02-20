function ScoresTableRow({ rowNum, scores, category, rowClassName }) {
	return (
		<>
			<tr
				key={category}
				className={rowClassName}
			>
				<th rowSpan={4}>{`${rowNum}. `} {category}</th>
				<td rowSpan={4}>{scores[category]}</td>
				<td rowSpan={4}>Low</td>
			</tr>
			<tr className={rowClassName}>
				<td>1-3 Low</td>
			</tr>
			<tr className={rowClassName}>
				<td>4-26 Moderate</td>
			</tr>
			<tr className={rowClassName}>
				<td>27+ High</td>
			</tr>
		</>
	);
}

function ScoresTable({ scores }) {
	return (
		<>
			<h3>eAssist scores</h3>

			<table className="table table-borderless">
				<thead className="table-dark">
					<tr>
						<th className="py-4" scope="col">Substance</th>
						<th className="py-4" scope="col">Score</th>
						<th className="py-4" scope="col">Risk</th>
						<th className="py-4" scope="col">Criteria</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(scores).map((category, index) => {
						let rowClassName = "";
						rowClassName = index % 2 === 0 ? null : "table-secondary";

						return (
							<ScoresTableRow
								key={category}
                                rowNum = {index + 1}
								scores={scores}
								category={category}
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
