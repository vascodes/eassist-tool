function replaceSpecialCharsInString(str, replaceStr = "") {
	return str.replace(/[\s\W]/gi, replaceStr);
}

function Option({ categoryId, selectedCategories, optionText, score, handleRadioBtnChange }) {
	// convert to lowercase and remove spaces, special characters.
	let optionTextWithHyphens = replaceSpecialCharsInString(optionText.toLowerCase(), "-");

	let radioButtonId = `radio-${categoryId}-${optionTextWithHyphens}`; // ex: radio-cannabis-no
	radioButtonId = replaceSpecialCharsInString(radioButtonId, "-"); // Remove multiple hyphens.

	let isChecked = false;
	if (selectedCategories?.hasOwnProperty(categoryId)) {
		if(selectedCategories[categoryId]?.toLowerCase() === optionText?.toLowerCase()){
			isChecked = true
		}
	};

	return (
		<div className="option-group">
			<input
				type="radio"
				name={categoryId}
				id={radioButtonId}
				value={score}
				checked={isChecked}				
				onChange={handleRadioBtnChange}
				data-option-text={optionText}
				required
			/>
			<label htmlFor={radioButtonId}>{optionText}</label>
		</div>
	);
}

export default Option;
