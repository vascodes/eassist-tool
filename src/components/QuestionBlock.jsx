function QuestionBlock({ substances, question }) {
	return (
		<div className="question-block">
			<p className="question-text">{question.text}</p>
			{substances.map((substance) => {
				const substanceName = substance.name;
				const examples = substance.examples;

				return (
					<div
						key={substance.id}
						className="option-block"
					>
						<p className="option-text">
							{substanceName}
							{examples && ` (${examples} etc.)`}
						</p>

						<div className="options">
							{question.options?.map((option) => {
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
			})}
		</div>
	);
}

export default QuestionBlock;
