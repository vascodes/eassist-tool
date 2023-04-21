export function validateSelectedOptions(substancesOfQuestion, selectedOptions) {
	// Check if none of the options of a question are selected.
	if (!selectedOptions) return false;

	// Check if only some options of question are selected.
	let numSelectedSubstancesOfQuestion =
		Object.keys(selectedOptions).length ?? 0;

	if (numSelectedSubstancesOfQuestion < substancesOfQuestion.length)
		return false;

	return true;
}

export function filterSelectedSubstances(
	selectedAnswersOfQuestion,
	compareFunction,
) {
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

export function filterAnswersNotInQuestionHistory(
	allSelectedAnswers,
	questionHistory,
) {
	let filteredAnswers = {};

	for (let questionId in allSelectedAnswers) {
		if (questionHistory.includes(Number(questionId))) {
			filteredAnswers[questionId] = allSelectedAnswers[questionId];
		}
	}

	return filteredAnswers;
}

export function calculateSubstanceScores(allSelectedAnswers) {
	const substanceScores = {};

	// Compute total score of each substance.
	for (let questionId in allSelectedAnswers) {
		questionId = Number(questionId);
		
		// Answers of Question 1, Question 8 should not be considered.
		if (questionId === 1 || questionId === 8) {
			continue;
		}
		
		const selectedSubstances = allSelectedAnswers[questionId];
		for (let substanceId in selectedSubstances) {
			let substance = selectedSubstances[substanceId];
			substanceScores[substanceId] ||= 0;
			substanceScores[substanceId] += Number(substance.score);
		}
	}

	return substanceScores;
}
