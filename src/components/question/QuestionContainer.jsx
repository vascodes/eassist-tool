import { useEffect, useRef, useState } from "react";

import Question from "./Question";
import PageButton from "../ui/PageButton";
import CardLayout from "../layouts/CardLayout";

function QuestionContainer(props) {
	let { allPages, setPage, allQuestions, allSubstances, handleScore, getSubstanceDetailsById } =
		props;

	console.count("Question Container.");
	/* 	
		Separate state is used for question and substances as substances displayed
		for a question may vary based on the answers selected in previous questions.
	*/
	const [currentQuestion, setQuestion] = useState(allQuestions[0]);
	const [allSelectedOptions, setAllSelectedOptions] = useState({});
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);
	const [questionHistory, setQuestionHistory] = useState([currentQuestion.id]);

	// lifetime: Ids of substances selected in Q1, past3Months: Ids of Substances selected in Q2.
	const substancesUsedRef = useRef({ lifetime: new Set(), past3Months: new Set() });

	function getSubstancesUsed() {
		return substancesUsedRef.current;
	}

	function setSubstancesUsed({ substancesUsedInLifetime, substancesUsedInPast3Months }) {
		if (substancesUsedInLifetime) {
			substancesUsedRef.current.lifetime = new Set(substancesUsedInLifetime);
		}

		if (substancesUsedInPast3Months) {
			substancesUsedRef.current.past3Months = new Set(substancesUsedInPast3Months);
		}

		console.log(substancesUsedRef);
	}

	const totalQuestions = allQuestions.length;

	function getSubstances(questionId) {
		const { lifetime: substancesUsedInLifetime, past3Months: substancesUsedInPast3Months } =
			getSubstancesUsed();

		// Return all substances for currentQuestion 1 and currentQuestion 8, if exists.
		if (questionId === 1 || questionId === 8) {
			return currentQuestion?.substances;
		} else {
			// For other allQuestions, only return substances selected in Question 1.
			let filteredSubstances = currentQuestion.substances?.filter(substance =>
				substancesUsedInLifetime.has(substance.id),
			);

			// For allQuestions 3, 4 and 5, return substances that,
			// were not answered as "Never" in currentQuestion 2.
			if (questionId >= 3 && questionId <= 5) {
				filteredSubstances = filteredSubstances.filter(substance =>
					substancesUsedInPast3Months.has(substance.id),
				);
			}

			return filteredSubstances;
		}
	}

	function pushQuestionHistory(nextQuestionId) {
		const newQuestionHistory = questionHistory;
		newQuestionHistory.push(nextQuestionId);

		setQuestionHistory(newQuestionHistory);
	}

	function popQuestionHistory() {
		const newQuestionHistory = questionHistory;
		newQuestionHistory.pop();

		setQuestionHistory(newQuestionHistory);
	}

	// Change to previous currentQuestion if nextQuestionId is null else change to next currentQuestion.
	function changeQuestionById(nextQuestionId = null) {
		if (!nextQuestionId) {
			popQuestionHistory();
		} else {
			pushQuestionHistory(nextQuestionId);
		}

		const previousQuestionId = questionHistory.at(-1);
		let index = previousQuestionId - 1;
		setQuestion(allQuestions[index]);
	}

	function validateSelectedOptionsOfAQuestion({ questionId, selectedOptions }) {
		// None of the options of a question are selected.
		if (!selectedOptions) {
			return false;
		}

		const allSubstancesOfQuestion = getSubstances(questionId);
		let countOfSelectedSubstancesOfQuestion = Object.keys(selectedOptions).length ?? 0;

		// Only some options of question are selected.
		if (countOfSelectedSubstancesOfQuestion < allSubstancesOfQuestion.length) {
			return false;
		}

		return true;
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.

		setShowRequiredMessage(false); // reset required message.

		const isValidSelection = validateSelectedOptionsOfAQuestion({
			questionId: currentQuestion.id,
			selectedOptions: allSelectedOptions[currentQuestion.id],
		});
		if (!isValidSelection) {
			setShowRequiredMessage(true);
			return;
		}

		// Add substance to substancesUsedInLifetime if selected option of that substance is "Yes" in Question 1.
		if (currentQuestion.id === 1) {
			const selectedSubstances = [];

			for (let substanceId in allSelectedOptions[currentQuestion.id]) {
				const selectedOptionOfSubstance =
					allSelectedOptions[currentQuestion.id][substanceId];

				if (selectedOptionOfSubstance.text.toLowerCase() === "yes") {
					selectedSubstances.push(substanceId);
				}
			}

			setSubstancesUsed({ substancesUsedInLifetime: selectedSubstances });
		}

		// Add substance to substancesUsedInPast3Months if,
		// selected option of that substance is NOT "Never" in currentQuestion 2.
		if (currentQuestion.id === 2) {
			const selectedSubstances = [];

			for (let substanceId in allSelectedOptions[currentQuestion.id]) {
				const selectedOptionOfSubstance =
					allSelectedOptions[currentQuestion.id][substanceId];

				if (selectedOptionOfSubstance.text.toLowerCase() !== "never") {
					selectedSubstances.push(substanceId);
				}
			}

			setSubstancesUsed({ substancesUsedInPast3Months: selectedSubstances });
		}

		const { lifetime: substancesUsedInLifetime, past3Months: substancesUsedInPast3Months } =
			getSubstancesUsed();

		// Show Thank You page if all options are answered as "No" in question 1.
		if (substancesUsedInLifetime.size === 0) {
			setPage(allPages.thankYou);
			return;
		}

		/* 
			If "never" is selected for all options in Question 2
			(ie: no substances were used in past 3 months) then, 
			Question 6 should be shown.
		*/
		if (currentQuestion.id === 2 && substancesUsedInPast3Months.size === 0) {
			changeQuestionById(6);
			return;
		}

		/*
			If only tobacco is NOT selected as "Never" in Q2 
			(ie: if only tobacco is used in past 3 months) then,
			skip to Question 6 after Question 4 as tobacco is not displayed in Question 5.				
		*/
		if (
			currentQuestion.id === 4 &&
			substancesUsedInPast3Months.size === 1 &&
			substancesUsedInPast3Months.has("tobacco")
		) {
			changeQuestionById(6);
			return;
		}

		if (currentQuestion.id !== totalQuestions) {
			changeQuestionById(currentQuestion.id + 1);
		} else {
			// Show scores after last currentQuestion.
			const substanceScores = getSubstanceScores();
			handleScore(substanceScores);
		}
	}

	function handlePrevButtonClick() {
		setShowRequiredMessage(false); // Reset required message.

		if (currentQuestion.id !== 1) changeQuestionById();
	}

	function getSubstanceScores() {
		const substanceScores = {};

		// Initialize scores for all substances as 0.
		for (let substance of allSubstances) {
			substanceScores[substance.id] = 0;
		}

		// Compute total score of each substance.
		for (let questionId in allSelectedOptions) {
			// Answers of Question 1, Question 8 should not be considered for calculating scores.
			if (questionId === 1 || questionId === 8) {
				continue;
			}

			/*				
				Ignore options of allQuestions in allSelectedOptions that are not in questionHistory.
				This ensures that only the selected options of visted allQuestions
				are considered when calculating the substance's score.
				
				Example: User might choose options of currentQuestion 4, 5 but later change 
				the answers of previous allQuestions such that currentQuestion 4 and 5 is skipped. 
				In this case, answers of currentQuestion 4, 5 should not be considered,
				when calculating the score.
			*/
			if (!questionHistory.includes(Number(questionId))) {
				continue;
			}

			const selectedSubstances = allSelectedOptions[questionId];
			for (let substanceId in selectedSubstances) {
				let substance = selectedSubstances[substanceId];

				// Update score of substance in substanceScores.
				if (substanceId in substanceScores)
					substanceScores[substanceId] += Number(substance.score);
			}
		}

		return substanceScores;
	}

	return (
		<CardLayout>
			<Question
				key={currentQuestion?.id}
				question={currentQuestion}
				allSubstances={allSubstances}
				substancesToDisplay={getSubstances(currentQuestion.id)}
				allSelectedOptions={allSelectedOptions}
				setAllSelectedOptions={setAllSelectedOptions}
				totalQuestions={totalQuestions}
			/>

			<div className="question-navigation">
				{showRequiredMessage && (
					<div
						className="alert alert-danger mt-4"
						role="alert"
					>
						Please complete all questions on the page to continue.
					</div>
				)}

				{/* Next Button */}
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					<PageButton
						buttonText={"Next >"}
						buttonClass="btn btn-success"
						handlePageButtonClick={handleNextButtonClick}
					/>
				</div>

				{/* Previous Button */}
				<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
					{currentQuestion?.number !== 1 && (
						<PageButton
							buttonText={"< Changed my mind"}
							buttonClass="btn btn-outline-success"
							handlePageButtonClick={handlePrevButtonClick}
						/>
					)}
				</div>
			</div>
		</CardLayout>
	);
}

export default QuestionContainer;
