function replaceSpecialCharsInString(str, replaceStr = "") {
	return str.replace(/[\s\W]/gi, replaceStr);
}

function OptionGroup({
	questionId,
	category,
	allSubstances,	
	setAllSelectedOptionsRef,
}) {
	let substanceDetails = allSubstances.find(s => s.id === category.id);

	let substanceName = substanceDetails?.name,
		substanceExamples = substanceDetails?.examples && `(${substanceDetails.examples}, etc.)`;

	function handleChange(e, option, category) {		
		setAllSelectedOptionsRef(questionId, category.id, option);
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
									onChange={e => handleChange(e, option, category)}
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
