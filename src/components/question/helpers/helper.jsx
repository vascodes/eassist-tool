export function getSubstancesToDisplay(
	questionId,
	getSubstancesUsed,
	currentQuestionSubstances,
) {
	const {
		lifetime: substancesUsedInLifetime,
		past3Months: substancesUsedInPast3Months,
	} = getSubstancesUsed();

	// Return all substances of question 1 and question 8, if exists.
	if (questionId === 1 || questionId === 8) {
		return currentQuestionSubstances;
	} else {
		// For other questions, only return substances selected in Question 1.
		let filteredSubstances = currentQuestionSubstances.filter(substance =>
			substancesUsedInLifetime.has(substance.id),
		);

		// For questions 3, 4 and 5, return substances that,
		// were not answered as "Never" in questions 2.
		if (questionId >= 3 && questionId <= 5) {
			filteredSubstances = filteredSubstances.filter(substance =>
				substancesUsedInPast3Months.has(substance.id),
			);
		}

		return filteredSubstances;
	}
}

export function getNextQuestionId(
	currentQuestionId,
	totalQuestions,
	getSubstancesUsed,
) {
	const { past3Months: substancesUsedInPast3Months } = getSubstancesUsed();

	/* 
		If "never" is selected for all options in Question 2
		(ie: no substances were used in past 3 months) then, 
		show Question 6.
	*/
	if (currentQuestionId === 2 && substancesUsedInPast3Months.size === 0) {
		return 6;
	}

	/*
		If only tobacco is NOT selected as "Never" in Q2 
		(ie: if only tobacco is used in past 3 months) then,
		skip to Question 6 after Question 4.
		This is because tobacco should not be displayed in Question 5.
	*/
	if (
		currentQuestionId === 4 &&
		substancesUsedInPast3Months.size === 1 &&
		substancesUsedInPast3Months.has("tobacco")
	) {
		return 6;
	}

	if (currentQuestionId !== totalQuestions) {
		return currentQuestionId + 1;
	}

	return null;
}

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

export function getSubstancesUsedInLifetime(allSelectedAnswers, questionId) {
	/*
		If selected option of a substance is "Yes" in Question 1, 
		then it is a substance used in liftime.
	*/
	const substancesUsedInLifetime = filterSelectedSubstances(
		allSelectedAnswers[questionId],
		selectedOption => selectedOption === "yes",
	);

	return substancesUsedInLifetime;
}

export function getSubstancesUsedInPast3Months(allSelectedAnswers, questionId) {
	/*
		If selected option of a substance is not "Never" in Question 2, 
		then it is a substance used in past 3 months.
	*/
	const substancesUsedInPast3Months = filterSelectedSubstances(
		allSelectedAnswers[questionId],
		selectedOption => selectedOption !== "never",
	);

	return substancesUsedInPast3Months;
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

export function updateScores(allSelectedAnswers, questionHistory, resultsRef) {
	const filteredAnswers = filterAnswersNotInQuestionHistory(
		allSelectedAnswers,
		questionHistory,
	);

	const selectedSubstanceScores = calculateSubstanceScores(filteredAnswers);

	// Update scores in result.
	for (let substanceId in selectedSubstanceScores) {
		resultsRef.current.scores[substanceId] =
			selectedSubstanceScores[substanceId];
	}
}
