import { useState } from "react";

import Question from "./Question";
import PageButton from "../ui/PageButton";
import CardLayout from "../layouts/CardLayout";

function QuestionContainer({
	allPages,
	questions,
	handlePage,
	handleScore,
	allSubstances,
	getSubstanceDetails,
}) {
	/* 	
		Separate state is used for question and substances as substances displayed
		for a question may vary based on the answers selected in previous questions.
	*/
	const [question, setQuestion] = useState(questions[0]);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [substancesUsed, setSubstancesUsed] = useState(new Set()); // Ids of substances selected in Q1.
	const [substancesUsedInPast3Months, setSubstancesUsedInPast3Months] = useState(new Set()); // Ids of Substances selected in Q2.
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);
	const [questionHistory, setQuestionHistory] = useState([question.id]);

	const totalQuestions = questions.length;

	function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			// Update score and selected option for current question.
			newSelectedOptions[question.id] ??= {};
			newSelectedOptions[question.id][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[question.id][substanceId].text = optionText;
			newSelectedOptions[question.id][substanceId].score = optionScore;

			// Add substance to substancesUsed if selected option of that substance is "Yes" in Question 1.
			if (question.id === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSubstancesUsed(
						prevSubstancesUsed => new Set([...prevSubstancesUsed, substanceId]),
					);
				} else {
					// Deselect a substance.
					const newSubstancesUsed = substancesUsed;
					newSubstancesUsed.delete(substanceId);
					setSubstancesUsed(newSubstancesUsed);
				}
			}

			// Add substance to substancesUsedInPast3Months if,
			// selected option of that substance is NOT "Never" in question 2.
			if (question.id === 2) {
				if (optionText.toLowerCase() !== "never") {
					setSubstancesUsedInPast3Months(
						prevSubstances => new Set([...prevSubstances, substanceId]),
					);
				} else {
					// Remove substance from substancesUsedInPast3Months.
					const selectedSet = substancesUsedInPast3Months;
					selectedSet.delete(substanceId);
					setSubstancesUsedInPast3Months(selectedSet);
				}
			}

			return newSelectedOptions;
		});		
	}

	function getSubstances(questionId) {
		// Return all substances for question 1 and question 8, if exists.
		if (questionId === 1 || questionId === 8) {
			return question?.substances;
		} else {
			// For other questions, only return substances selected in Question 1.
			let filteredSubstances = question.substances?.filter(substance =>
				substancesUsed.has(substance.id),
			);

			// For questions 3, 4 and 5, return substances that,
			// were not answered as "Never" in question 2.
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

	// Change to previous question if nextQuestionId is null else change to next question.
	function changeQuestionById(nextQuestionId = null) {
		if (!nextQuestionId) {
			popQuestionHistory();
		} else {
			pushQuestionHistory(nextQuestionId);
		}
		
		const previousQuestionId = questionHistory.at(-1);
		let index = previousQuestionId - 1;
		setQuestion(questions[index]);
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.
		setShowRequiredMessage(false); // reset required message.

		// Show required message if NO options of current question are selected.
		if (!selectedOptions[question.id]) {
			setShowRequiredMessage(true);
			return;
		} else {
			let currentQuestionId = question.id;
			const currentSubstances = getSubstances(currentQuestionId);
			let totalSelectedOptions = Object.keys(selectedOptions[question.id]).length ?? 0;

			// If all options are answered as "No" in question 1 then,
			// show Thank You page.
			if (currentQuestionId === 1) {
				if (totalSelectedOptions > 0 && substancesUsed.size === 0) {
					handlePage(allPages.thankYou);
					return;
				}
			}

			// Show required message if only SOME options of current question are selected.
			if (totalSelectedOptions < currentSubstances.length) {
				setShowRequiredMessage(true);
				return;
			}

			/* 
				If "never" is selected for all options in Question 2
				(ie: no substances were used in past 3 months) then, 
				Question 6 should be shown.
			*/
			if (currentQuestionId === 2 && substancesUsedInPast3Months.size === 0) {
				changeQuestionById(6);
				return;
			}

			/*
				If only tobacco is NOT selected as "Never" in Q2 
				(ie: if only tobacco is used in past 3 months) then,
				skip to Question 6 after Question 4 as tobacco is not displayed in Question 5.				
			*/
			if (
				currentQuestionId === 4 &&
				substancesUsedInPast3Months.size === 1 &&
				substancesUsedInPast3Months.has("tobacco")
			) {
				changeQuestionById(6);
				return;
			}

			if (currentQuestionId !== totalQuestions) {
				changeQuestionById(question.id + 1);
			} else {
				// Show scores after last question.
				const substanceScores = getSubstanceScores();
				handleScore(substanceScores);								
			}
		}
	}

	function handlePrevButtonClick() {
		setShowRequiredMessage(false); // Reset required message.

		if (question.id !== 1) changeQuestionById();
	}

	function getSubstanceScores() {
		const substanceScores = {};

		// Initialize scores for all substances as 0.
		for (let substance of allSubstances) {
			substanceScores[substance.id] = 0;
		}

		// Compute total score of each substance.
		for (let questionId in selectedOptions) {
			// Answers of Question 1, Question 8 should not be considered for calculating scores.
			if (questionId === 1 || questionId === 8) {
				continue;
			}
			
			/*				
				Ignore options of questions in selectedOptions that are not in questionHistory.
				This ensures that only the selected options of visted questions
				are considered when calculating the substance's score.
				
				Example: User might choose options of question 4, 5 but later change 
				the answers of previous questions such that question 4 and 5 is skipped. 
				In this case, answers of question 4, 5 should not be considered,
				when calculating the score.
			*/
			if (!questionHistory.includes(Number(questionId))) {
				continue;
			}

			const selectedSubstances = selectedOptions[questionId];
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
				key={question?.id}
				questionId={question?.id}
				question={question}
				totalQuestions={totalQuestions}
				substances={getSubstances(question.id)}
				getSubstanceDetails={getSubstanceDetails}
				selectedOptions={selectedOptions}
				handleChange={handleChange}
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
					{question?.number !== 1 && (
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
