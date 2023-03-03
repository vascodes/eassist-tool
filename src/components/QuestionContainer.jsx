import { useState, useEffect } from "react";

import Question from "./Question";

function QuestionContainer(props) {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categories, setCategories] = useState([]);

    const currentQuestionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = props.questions ? props.questions[currentQuestionId] : null;
    
    function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		console.log(selectedCategories);
		console.log(selectedOptions);

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			newSelectedOptions[currentQuestionId] ??= {};
			newSelectedOptions[currentQuestionId][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[currentQuestionId][substanceId].text = optionText;
			newSelectedOptions[currentQuestionId][substanceId].score = optionScore;

			if (currentQuestionNumber === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSelectedCategories(prevSelectedCategories => [
						...prevSelectedCategories,
						substanceId,
					]);

					// Remove duplicates.
					setSelectedCategories(prevSelectedCategories =>
						Array.from(new Set(prevSelectedCategories)),
					);
				} else {
					// Deselect a category.
					setSelectedCategories(prevSelectedCategories =>
						prevSelectedCategories.filter(substance => substance !== substanceId),
					);
				}
			}

			return newSelectedOptions;
		});
	}

    function selectCategories() {
		if (currentQuestionNumber === 1 || currentQuestionNumber === 8) {
			setCategories(currentQuestion?.substances);
		} else {
			// For questions other than 1 and 8,
			// only categories selected in Question 1 should be displayed.
			const selectedCategoriesSet = new Set(selectedCategories);
			setCategories(
				currentQuestion?.substances?.filter(substanceData =>
					selectedCategoriesSet.has(substanceData.id),
				),
			);
		}
	}

    function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the category that was selected is removed and quiz is retaken.
		props.setShowRequiredMsg(false);

		// Show required message if NO questions are answered.
		if (!selectedOptions[currentQuestionId]) {
			props.setShowRequiredMsg(true);
			return;
		}

		const numSelectedOptions = Object.keys(selectedOptions[currentQuestionId]).length;
		let totalCategories = 0;

		if (currentQuestionNumber === 1 || currentQuestionNumber === 8) {
			totalCategories = currentQuestion?.substances?.length;
		} else {
			totalCategories = selectedCategories?.length;
		}

		// Show required message if all questions are not answered.
		if (numSelectedOptions !== totalCategories) {
			console.log(selectedOptions);
			console.log(totalCategories);
			console.log(selectedCategories);
			props.setShowRequiredMsg(true);
			return;
		}

		setCurrentQuestionNumber(prevQuestionNum => {
			let totalQuestions = Object.keys(props.questions).length;

			// Show Thank you page if no categories are selected in first question.
			if (prevQuestionNum === 1 && selectedCategories.length === 0) {
				props.setShowQuestions(false);
				props.setShowThankYou(true);
			}

			// Last question.
			if (prevQuestionNum === totalQuestions) {
				const categoryScores = getCategoryScores();
				console.log(selectedOptions);
				console.log(categoryScores);

				props.setShowQuestions(false);
				props.SetShowPrevButton(false);
				props.setFinalScores(categoryScores);
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
		props.setFinalScores(null);
		setCurrentQuestionNumber(prevNum => {
			return prevNum === 1 ? prevNum : prevNum - 1;
		});
	}

    function getCategoryScores() {
		const categoryScores = {
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

		// Find total score of each category from questions in selectedOptions.
		for (let currentQuestionId in selectedOptions) {
			// Answers of Question 8 should not be considered in finalScores.
			if (currentQuestionId === "question8") break;

			const categories = selectedOptions[currentQuestionId];
			for (let categoryName in categories) {
				let category = categories[categoryName];

				// If category doesn't exist in categoryScores,
				// add category to categoryScores and initialize it to 0.
				if (!categoryScores[categoryName]) categoryScores[categoryName] = 0;

				// Update score of current category in categoryScores.
				categoryScores[categoryName] += Number(category.score);
			}
		}

		return categoryScores;
	}

    useEffect(() => props.togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);
	useEffect(selectCategories, [currentQuestionNumber, currentQuestion, selectedCategories]);
    
    return (
        <>
            <Question
                questionNumber={currentQuestionNumber}
                question={currentQuestion}
                categories={categories}
                selectedOptions={selectedOptions}
                handleChange={handleChange}
            />

            <div className="question-navigation">
                {props.showRequiredMsg && (
                    <div
                        className="alert alert-danger mt-4"
                        role="alert"
                    >
                        Please complete all questions on the page to
                        continue.
                    </div>
                )}

                <div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleNextButtonClick()}
                    >
                        Next {">"}
                    </button>
                </div>

                {props.showPrevButton && (
                    <div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
                        <button
                            className="btn btn-outline-success"
                            onClick={() => handlePrevButtonClick()}
                        >
                            {"<"} Changed my mind
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default QuestionContainer;