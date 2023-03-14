import { useState } from "react";

import Question from "./Question";
import PageButton from "./PageButton";

function getQuestion(questionNumber) {
	let questionId = "question" + questionNumber;

	return { id: questionId, number: questionNumber };
}

function QuestionContainer({ allPages, questions, handlePage, handleScores }) {
	/* 	
		Separate state is used for question and substances as substances displayed
		for a question may vary based on the answers selected in previous questions.
	*/
	const [question, setQuestion] = useState(getQuestion(1));
	const [selectedOptions, setSelectedOptions] = useState({});
	const [substancesUsed, setSubstancesUsed] = useState(new Set()); // Ids of substances selected in Q1.
	const [substancesUsedInPast3Months, setSubstancesUsedInPast3Months] = useState(new Set()); // Ids of Substances selected in Q2.
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);
	const [questionStack, setQuestionStack] = useState([1]);
	
	const totalQuestions = Object.keys(questions).length;

	function pushToQuestionStack(questionNumber){
		const newQuestionStack = questionStack;
		newQuestionStack.push(questionNumber);
		
		setQuestionStack(newQuestionStack);
	}

	function popFromQuestionStack(){
		const newQuestionStack = questionStack;
		let popped = newQuestionStack.pop();

		setQuestionStack(newQuestionStack);
	}
	
	function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		console.log(selectedOptions);

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			// Initialize selected option for current question.
			newSelectedOptions[question.id] ??= {};
			newSelectedOptions[question.id][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[question.id][substanceId].text = optionText;
			newSelectedOptions[question.id][substanceId].score = optionScore;

			// For question 1, Add substance to substancesUsed if selected option of that substance is "Yes".
			if (question.number === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSubstancesUsed(
						prevSelectedSubstances => new Set([...prevSelectedSubstances, substanceId]),
					);
				} else {
					// Deselect a substance.
					const selectedSet = substancesUsed;
					selectedSet.delete(substanceId);
					setSubstancesUsed(selectedSet);
				}
			}

			// For question 2, add substance to substancesUsedInPast3Months if selected option of that substance is not "Never".
			if (question.number === 2) {
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

	function getSubstances(questionNumber) {
		let questionId = "question" + questionNumber;

		// Display all substances for question 1 and question 8, if exists.
		if (questionNumber === 1 || questionNumber === 8) {
			return questions[questionId]?.substances;
		} else {
			// For other questions, only substances selected in Question 1 should be displayed.
			const actualSubstances = questions[questionId]?.substances;
			const filteredSubstances = actualSubstances?.filter(substance =>
				substancesUsed.has(substance.id),
			);

			let newSubstances = filteredSubstances;

			// For questions 3, 4 and 5, display only substances that,
			// were not answered as "Never" in question 2.
			if (questionNumber >= 3 && questionNumber <= 5) {
				newSubstances = filteredSubstances.filter(substance =>
					substancesUsedInPast3Months.has(substance.id),
				);
			}

			// Remove tobacco in question 5.
			if (questionNumber === 5) {
				newSubstances = newSubstances.filter(substance => substance.id !== "tobacco");
			}

			return newSubstances;
		}
	}

	function changeQuestion() {
		let lastVisitedQuestion = questionStack[questionStack.length - 1];
				
		setQuestion(getQuestion(lastVisitedQuestion));
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.
		setShowRequiredMessage(false); // reset required message.

		// Show required message if NO options of current question are selected.
		if (!selectedOptions[question.id]) {
			setShowRequiredMessage(true);
			return;
		} else {
			let currentQuestionNumber = question.number;
			const currentSubstances = getSubstances(currentQuestionNumber);
			let totalSelectedOptions = Object.keys(selectedOptions[question.id]).length ?? 0;

			console.log(currentSubstances);

			// If all options are answered as "No" in question 1 then,
			// show Thank You page.
			if (currentQuestionNumber === 1) {
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
			if (currentQuestionNumber === 2 && substancesUsedInPast3Months.size === 0) {				
				pushToQuestionStack(6);		
				changeQuestion();
				
				return;
			}

			/*
				If only tobacco is NOT selected as "Never" in Q2 
				(ie: if only tobacco is used in past 3 months) then,
				skip to Question 6 after Question 4 as tobacco is not displayed in Question 5.				
			*/
			if (
				currentQuestionNumber === 4 &&
				substancesUsedInPast3Months.size === 1 &&
				substancesUsedInPast3Months.has("tobacco")
			) {				
				pushToQuestionStack(6);
				changeQuestion();				
				return;
			}

			// Show scores after last question.
			if (currentQuestionNumber === totalQuestions) {
				const substanceScores = getSubstanceScores();
				console.log(selectedOptions);
				console.log(substanceScores);

				handleScores(substanceScores);

				return;
			} else {
				pushToQuestionStack(question.number + 1);	
				changeQuestion();				
			}
		}
	}

	function handlePrevButtonClick() {
		setShowRequiredMessage(false);

		popFromQuestionStack();
		changeQuestion();				
	}

	function getSubstanceScores() {
		// TODO: Use substances from data.js to initialize substanceScores.
		const substanceScores = {
			tobacco: 0,
			alcohol: 0,
			cannabis: 0,
			cocaine: 0,
			amphetamine: 0,
			inhalants: 0,
			sedatives: 0,
			hallucinogens: 0,
			opioids: 0,
			other: 0,
		};

		// Find total score of each substance from questions in selectedOptions.
		for (let questionId in selectedOptions) {
			// Answers of Question 1 or Question 8 should not be considered in finalScores.
			if (questionId === "question1" || questionId === "question8") continue;

			const substances = selectedOptions[questionId];
			for (let substanceName in substances) {
				let substance = substances[substanceName];

				// If substance doesn't exist in substanceScores,
				// add substance to substanceScores and initialize it to 0.
				if (!substanceScores[substanceName]) substanceScores[substanceName] = 0;

				// Update score of current substance in substanceScores.
				substanceScores[substanceName] += Number(substance.score);
			}
		}

		return substanceScores;
	}

	return (
		<>
			<Question
				key={question?.number}
				questionNumber={question?.number}
				question={questions[question?.id]}
				totalQuestions={totalQuestions}
				substances={getSubstances(question?.number)}
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
		</>
	);
}

export default QuestionContainer;
