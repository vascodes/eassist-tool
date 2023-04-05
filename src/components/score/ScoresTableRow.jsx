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

export default ScoresTableRow;