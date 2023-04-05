function replaceSpecialCharsInString(str, replaceStr = "") {
	return str.replace(/[\s\W]/gi, replaceStr);
}

function Option({ questionId, substanceId, selectedOptions, optionText, score, handleChange }) {
	// convert to lowercase and remove spaces, special characters.
	let optionTextWithHyphens = replaceSpecialCharsInString(optionText.toLowerCase(), "-");

	let radioButtonId = `radio-${substanceId}-${optionTextWithHyphens}`; // ex: radio-cannabis-no
	radioButtonId = replaceSpecialCharsInString(radioButtonId, "-"); // Remove multiple hyphens.

	function getIsChecked() {
		if (selectedOptions[questionId]) {
			if (
				selectedOptions[questionId][substanceId]?.text.toLowerCase() ===
				optionText.toLowerCase()
			) {
				return true;
			}
		}

		return false;
	}

	return (
		<div className="form-check radio-spacing option-group">
			<label
				className="form-check-label"
				htmlFor={radioButtonId}
			>
				{optionText}
			</label>
			<input
				className="form-check-input"
				type="radio"
				name={substanceId}
				id={radioButtonId}
				value={score}
				checked={getIsChecked()}
				onChange={handleChange}
				data-option-text={optionText}
				required
			/>
		</div>
	);
}

export default Option;
