function replaceSpecialCharsInString(str, replaceStr = "") {
	return str.replace(/[\s\W]/gi, replaceStr);
}

function OptionGroup({
	questionId,
	category,
	allSubstances,
	allSelectedAnswers,
	setAllSelectedAnswers,
}) {
	let substanceDetails = allSubstances.find(substance => substance.id === category.id);

	let substanceName = substanceDetails?.name,
		substanceExamples = substanceDetails?.examples && `(${substanceDetails.examples}, etc.)`;

	function getIsOptionChecked(substanceId, selectedOptionId) {
		let isChecked = false;

		const selectedQuestion = allSelectedAnswers[questionId];
		const selectedQuestionOption = selectedQuestion ? selectedQuestion[substanceId] : null;

		if (selectedQuestion && selectedQuestionOption) {
			isChecked = selectedQuestionOption.id === selectedOptionId;
		}

		return isChecked;
	}

	function handleChange(category, option) {
		setAllSelectedAnswers(prev => {
			let newSelectedOptions = { ...prev };

			// Update score and selected option for current question.
			newSelectedOptions[questionId] ??= { [category.id]: null };
			newSelectedOptions[questionId][category.id] = option;

			return newSelectedOptions;
		});
	}

	return (
		<li className="list-group-item d-flex">
			<div className="category-block">
				{substanceName !== "" ? (
					<div className="category-text">
						{substanceName} {substanceExamples}
					</div>
				) : null}

				<div className="options">
					{category?.options?.map(option => {
						let optionText = option.text;
						let optionTextWithHyphens = replaceSpecialCharsInString(
							optionText.toLowerCase(),
							"-",
						);
						let radioButtonId = `radio-${category.id}-${optionTextWithHyphens}`; // ex: radio-cannabis-no
						radioButtonId = replaceSpecialCharsInString(radioButtonId, "-"); // Remove multiple hyphens.

						return (
							<div
								key={option.id}
								className="form-check radio-spacing option-group"
							>
								<label
									className="form-check-label"
									htmlFor={radioButtonId}
								>
									{optionText}
								</label>
								<input
									className="form-check-input"
									type="radio"
									name={category.id}
									id={radioButtonId}
									value={option.id}
									checked={getIsOptionChecked(category.id, option.id)}
									onChange={() => handleChange(category, option)}
									data-option-text={optionText}
									required
								/>
							</div>
						);
					})}
				</div>
			</div>
		</li>
	);
}

export default OptionGroup;
