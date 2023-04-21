function calculateSubstanceScores(
	allSubstances,
	allSelectedAnswers,
	answeredQuestions,
) {
	const substanceScores = {};

	// Initialize scores for all substances as 0.
	for (let substance of allSubstances) {
		substanceScores[substance.id] = 0;
	}

	// Compute total score of each substance.
	for (let questionId in allSelectedAnswers) {
		// Answers of Question 1, Question 8 should not be considered.
		if (questionId === 1 || questionId === 8) {
			continue;
		}

		/*				
            Ignore options of questions in allSelectedAnswers that are not in answeredQuestions list.
            This ensures that only the selected options of visted questions
            are considered when calculating the substance's score.
            
            Example: 
            User might choose options of question 4, 5 but later change 
            the answers of previous question such that question 4 and 5 is skipped. 
            In this case, answers of question 4, 5
            should not be considered when calculating the score.
        */
		if (!answeredQuestions.includes(Number(questionId))) {
			continue;
		}

		const selectedSubstances = allSelectedAnswers[questionId];
		for (let substanceId in selectedSubstances) {
			let substance = selectedSubstances[substanceId];

			// Update score of substance in substanceScores.
			if (substanceId in substanceScores)
				substanceScores[substanceId] += Number(substance.score);
		}
	}

	return substanceScores;
}

export { calculateSubstanceScores };