import { useState, useEffect } from "react";

import Question from "./Question";
import PageButton from "./PageButton";

function QuestionContainer(props) {
	const [questionNumber, setQuestionNumber] = useState(1);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [selectedSubstances, setSelectedSubstances] = useState([]);
	const [substances, setSubstances] = useState([]);
	const [showRequiredMsg, setShowRequiredMsg] = useState(false);

	const questionId = "question" + questionNumber; //ex: question5
	const question = props.questions ? props.questions[questionId] : null;

	function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		console.log(selectedSubstances);
		console.log(selectedOptions);

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			// Initialize selected option for current question.
			newSelectedOptions[questionId] ??= {};
			newSelectedOptions[questionId][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[questionId][substanceId].text = optionText;
			newSelectedOptions[questionId][substanceId].score = optionScore;

			// For question 1, Add substance to selectedSubstances if selected option of that substance is "Yes".
			if (questionNumber === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSelectedSubstances(prevselectedSubstances => [
						...prevselectedSubstances,
						substanceId,
					]);

					// Remove duplicates.
					setSelectedSubstances(prevselectedSubstances =>
						Array.from(new Set(prevselectedSubstances)),
					);
				} else {
					// Deselect a substance.
					setSelectedSubstances(prevselectedSubstances =>
						prevselectedSubstances.filter(substance => substance !== substanceId),
					);
				}
			}

			return newSelectedOptions;
		});
	}

	function selectSubstances() {
		if (questionNumber === 1 || questionNumber === 8) {
			setSubstances(question?.substances);
		} else {
			// For questions other than 1 and 8,
			// only substances selected in Question 1 (selectedSubstances) should be displayed.
			setSubstances(
				question?.substances?.filter(substanceData =>
					selectedSubstances.includes(substanceData.id),
				),
			);
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

	useEffect(selectSubstances, [question?.substances, questionNumber, selectedSubstances]);

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.
		setShowRequiredMsg(false);

		setQuestionNumber(prevQuestionNum => {
			let totalQuestions = Object.keys(props.questions).length;

			// Show Thank you page if no substances are selected in first question.
			if (prevQuestionNum === 1 && selectedSubstances.length === 0) {
				props.handlePage(props.allPages.thankYou);
			}

			// Last question.
			if (prevQuestionNum === totalQuestions) {
				const substanceScores = getSubstanceScores();
				console.log(selectedOptions);
				console.log(substanceScores);

				props.handleScores(substanceScores);
			}

			let newQuestionNum;
			if (prevQuestionNum === totalQuestions) {
				newQuestionNum = prevQuestionNum;
			} else {
				newQuestionNum = prevQuestionNum + 1;
			}

			return newQuestionNum;
		});
	}

	function handlePrevButtonClick() {
		props.handleScores(null);

		setQuestionNumber(prevNum => {
			return prevNum === 1 ? prevNum : prevNum - 1;
		});
	}

	function getSubstanceScores() {
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
				questionNumber={questionNumber}
				question={question}
				totalQuestions={Object.keys(props?.questions)?.length}
				substances={substances}
				selectedOptions={selectedOptions}
				handleChange={handleChange}
			/>

			<div className="question-navigation">
				{showRequiredMsg && (
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
					{questionNumber !== 1 && (
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
