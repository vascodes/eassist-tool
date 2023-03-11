import { useState, useEffect } from "react";

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
	const [selectedSubstances, setSelectedSubstances] = useState(new Set()); // Substances selected in Q1.
	const [selectedOptions, setSelectedOptions] = useState({});
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);

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

			// For question 1, Add substance to selectedSubstances if selected option of that substance is "Yes".
			if (question.number === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSelectedSubstances(
						prevSelectedSubstances => new Set([...prevSelectedSubstances, substanceId]),
					);
				} else {
					// Deselect a substance.
					const selectedSet = selectedSubstances;
					selectedSet.delete(substanceId);
					setSelectedSubstances(selectedSet);
				}
			}

			return newSelectedOptions;
		});
	}

	function getSubstances(questionNumber) {
		let questionId = "question" + questionNumber;
		if (questionNumber === 1 || questionNumber === 8) {
			return questions[questionId]?.substances;
			// setSubstances(questions[questionId]?.substances);
		} else {
			// For questions other than 1 and 8,
			// only substances selected in Question 1 should be displayed.
			const actualSubstances = questions[questionId]?.substances;
			const filteredSubstances = actualSubstances.filter(substance =>
				selectedSubstances.has(substance.id),
			);

			return filteredSubstances;
			// setSubstances(filteredSubstances);
		}

		// For questions 3, 4 and 5, display only substances that,
		// were not answered as "Never" in question 2.
		// if (questionNumber >= 3 && questionNumber <= 5) {
		// 	const newSubstances = substances.filter(
		// 		substance => {
		//             console.log(substance);
		//             return selectedOptions["question2"][substance.id]?.text?.toLowerCase() !== "never"
		//         }
		// 	);

		//     setSubstances(newSubstances);
		// }
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.
		setShowRequiredMessage(false); // reset required message.

		// Show required message if NO options of current question are selected.
		if (!selectedOptions[question.id]) {
			setShowRequiredMessage(true);
			console.log("no options selected.");
			return;
		} else {
			let totalSelectedOptions = Object.keys(selectedOptions[question.id]).length ?? 0;
			const currSubstances = getSubstances(question.number);
			
			// If all options are answered as "No" in question 1 then,
			// show Thank You page.
			if (question.number === 1) {
				if (totalSelectedOptions > 0 && selectedSubstances.size === 0) {
					handlePage(allPages.thankYou);
					return;
				}
			}

			// Show required message if ALL options of current question are NOT selected.
			if (totalSelectedOptions < currSubstances.length) {
				setShowRequiredMessage(true);
				return;
			}
		}

		setQuestion(prevQuestion => {
			let totalQuestions = Object.keys(questions).length;

			// Last question.
			if (prevQuestion.number === totalQuestions) {
				const substanceScores = getSubstanceScores();
				console.log(selectedOptions);
				console.log(substanceScores);

				handleScores(substanceScores);

				return;
			}

			// Change question if current question is not last question.
			if (prevQuestion.number !== totalQuestions) {
				let newQuestionNumber = prevQuestion.number + 1;
				const newQuestion = getQuestion(newQuestionNumber);
				return newQuestion;
			}

			return;
		});
	}

	function handlePrevButtonClick() {
		handleScores(null);

		setQuestion(prevQuestion => {
			if (prevQuestion.number !== 1) {
				let newQuestionNumber = prevQuestion.number - 1;
				return getQuestion(newQuestionNumber);
			}

			return prevQuestion;
		});
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
				key={question.number}
				questionNumber={question.number}
				question={questions[question.id]}
				totalQuestions={Object.keys(questions)?.length}
				substances={getSubstances(question.number)}
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
					{question.number !== 1 && (
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
