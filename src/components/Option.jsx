function Option({ option, substanceName, score = 0 }) {
	const shortSubstanceName = substanceName.replace(" ", "").toLowerCase();
	const optionName = `radio-${shortSubstanceName}`;
	const optionId = `radio-${shortSubstanceName}-${option.toLowerCase()}`;

	return (
		<div className="option-group">
			<input
				type="radio"
				className="option-radio"
				name={optionName}
				id={optionId}
				value={score}
			/>
			<label htmlFor={optionId}>{option}</label>
		</div>
	);
}

export default Option;
