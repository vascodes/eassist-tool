function replaceSpecialCharsInString(str, replaceStr = "") {
	return str.replace(/[\s\W]/gi, replaceStr);
}

function Option({ questionNumber, substanceId, selectedOptions, optionText, score, handleChange }) {
	// convert to lowercase and remove spaces, special characters.
	let optionTextWithHyphens = replaceSpecialCharsInString(optionText.toLowerCase(), "-");

	let radioButtonId = `radio-${substanceId}-${optionTextWithHyphens}`; // ex: radio-cannabis-no
	radioButtonId = replaceSpecialCharsInString(radioButtonId, "-"); // Remove multiple hyphens.
		
	function getIsChecked(){		
		let key = "question" + questionNumber;

		if (selectedOptions[key]) {
			if (selectedOptions[key][substanceId]?.text === optionText) {
				return true;
			}
		}

		return false;
	}

	return (
		<div className="form-check radio-spacing option-group">
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
			<label className="form-check-label" htmlFor={radioButtonId}>{optionText}</label>
		</div>
	);
}

export default Option;
