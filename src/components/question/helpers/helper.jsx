function validateSelectedOptions(substancesOfQuestion, selectedOptions) {
	// Check if none of the options of a question are selected.
	if (!selectedOptions) return false;

	// Check if only some options of question are selected.
	let numSelectedSubstancesOfQuestion =
		Object.keys(selectedOptions).length ?? 0;

	if (numSelectedSubstancesOfQuestion < substancesOfQuestion.length)
		return false;

	return true;
}

function filterSelectedSubstances(selectedAnswersOfQuestion, compareFunction) {
	const filteredSubstances = [];

	for (let substanceId in selectedAnswersOfQuestion) {
		const selectedOptionOfSubstance =
			selectedAnswersOfQuestion[substanceId];

		if (compareFunction(selectedOptionOfSubstance.text.toLowerCase())) {
			filteredSubstances.push(substanceId);
		}
	}

	return filteredSubstances;
}

export { validateSelectedOptions, filterSelectedSubstances };
