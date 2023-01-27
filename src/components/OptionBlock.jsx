function OptionBlock({ options, substanceName, examples }) {
	return (
		<div className="option-block">
			<p className="option-text">
				{substanceName}
				{examples && ` (${examples} etc.)`}
			</p>

			<div className="options">
				{options?.map((option) => {
					const shortSubstanceName = substanceName.replace(" ", "").toLowerCase();
					const optionName = `radio-${shortSubstanceName}`;
					const optionId = `radio-${shortSubstanceName}-${option.toLowerCase()}`;

					return (
						<div
							key={option}
							className="option-group"
						>
							<input
								type="radio"
								className="option-radio"
								name={optionName}
								id={optionId}
							/>
							<label htmlFor={optionId}>{option}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OptionBlock;
