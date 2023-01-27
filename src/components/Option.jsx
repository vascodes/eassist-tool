function Option({ option, substanceName }) {
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
			/>
			<label htmlFor={optionId}>{option}</label>
		</div>
	);
}

export default Option;
