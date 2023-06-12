export function getSubstancesToDisplay(currentQuestion, getSubstancesUsed) {
	const { id: questionId, substances: currentQuestionSubstances, isGeneric } = currentQuestion;
	const { lifetime: substancesUsedInLifetime, past3Months: substancesUsedInPast3Months } =
		getSubstancesUsed();

	if (isGeneric) return currentQuestionSubstances;

	// For other questions, only return substances selected in Question 1.
	let filteredSubstances = currentQuestionSubstances.filter(substance =>
		substancesUsedInLifetime.has(substance.id),
	);

	/* For questions 3, 4 and 5, return substances that, were not answered as "Never" in question 2. */
	if (questionId >= 3 && questionId <= 5) {
		filteredSubstances = filteredSubstances.filter(substance =>
			substancesUsedInPast3Months.has(substance.id),
		);
	}

	return filteredSubstances;
}

export function getQuestionIndexFromId(allQuestions, questionId) {
	let questionIndex = 0;
	for (let index in allQuestions) {
		if (allQuestions[index].id === questionId) {
			questionIndex = index;
		}
	}

	return Number(questionIndex);
}

export function getNextQuestionId(currentQuestionId, allQuestions, getSubstancesUsed) {
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

	const questionIndex = getQuestionIndexFromId(allQuestions, currentQuestionId);
	if (questionIndex !== allQuestions.length - 1) {
		return allQuestions[questionIndex + 1].id;
	}

	return null;
}

export function validateSelectedOptions(substancesOfQuestion, selectedOptions) {
	// Check if none of the options of a question are selected.
	if (!selectedOptions) return false;

	// Check if only some options of question are selected.
	let numSelectedSubstancesOfQuestion = Object.keys(selectedOptions).length ?? 0;

	if (numSelectedSubstancesOfQuestion < substancesOfQuestion.length) return false;

	return true;
}

export function filterSelectedSubstances(selectedAnswersOfQuestion, compareFunction) {
	const filteredSubstances = [];

	for (let substanceId in selectedAnswersOfQuestion) {
		const selectedOptionOfSubstance = selectedAnswersOfQuestion[substanceId];

		if (compareFunction(selectedOptionOfSubstance.id)) {
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
		selectedOptionId => selectedOptionId === 2,
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
		selectedOptionId => selectedOptionId !== 1,
	);

	return substancesUsedInPast3Months;
}

export function filterAnswersNotInQuestionHistory(allSelectedAnswers, questionHistory) {
	let filteredAnswers = {};

	for (let questionId in allSelectedAnswers) {
		if (questionHistory.includes(Number(questionId))) {
			filteredAnswers[questionId] = allSelectedAnswers[questionId];
		}
	}

	return filteredAnswers;
}

function getGenericQuestionIds(allQuestions) {
	const genericQuestionIds = new Set();
	for (let question of allQuestions) {		
		if (question.isGeneric) genericQuestionIds.add(Number(question.id));
	}

	return genericQuestionIds;
}

function calculateSubstanceScores(allSelectedAnswers, allQuestions) {
	const substanceScores = {};

	const genericQuestionIds = getGenericQuestionIds(allQuestions);

	// Compute total score of each substance.
	for (let questionId in allSelectedAnswers) {
		questionId = Number(questionId);

		if (genericQuestionIds.has(questionId)) {
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

export function updateScores(allQuestions, allSelectedAnswers, questionHistory, resultsRef) {
	const filteredAnswers = filterAnswersNotInQuestionHistory(allSelectedAnswers, questionHistory);

	const selectedSubstanceScores = calculateSubstanceScores(filteredAnswers, allQuestions);

	// Update scores in result.
	for (let substanceId in selectedSubstanceScores) {
		resultsRef.current.scores[substanceId] = selectedSubstanceScores[substanceId];
	}
}
