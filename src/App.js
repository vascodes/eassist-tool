import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";

function App() {
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

	const [content, setContent] = useState(null);
	const [showQuestions, setShowQuestions] = useState(true);
	const [showThankYou, setShowThankYou] = useState(false);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categories, setCategories] = useState([]);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : null;

	function calculateCategoryScores() {
		// Find total score of each category from questions in selectedOptions.
		for (let questionId in selectedOptions) {
			const categories = selectedOptions[questionId];

			for (let categoryName in categories) {
				let category = categories[categoryName];

				// If category doesn't exist in categoryScores,
				// add category to categoryScores and initialize it to 0.
				if (!categoryScores[categoryName]) categoryScores[categoryName] = 0;

				// Update score of current category in categoryScores.
				categoryScores[categoryName] += Number(category.score);
			}
		}
	}

	function handleNextButtonClick() {
		const requiredMsg = "Please complete all questions on the page to continue.";

		if (!selectedOptions[questionId]) {
			console.log(requiredMsg);
			return;
		}

		const numSelectedOptions = Object.keys(selectedOptions[questionId]).length;
		let totalCategories = 0;

		if (currentQuestionNumber === 1 || currentQuestionNumber === 8) {
			totalCategories = currentQuestion?.substances?.length;
		} else {
			totalCategories = selectedCategories?.length;
		}
		if (numSelectedOptions !== totalCategories) {
			console.log(selectedCategories);
			console.log(requiredMsg);
			return;
		}

		setCurrentQuestionNumber(prevQuestionNum => {
			let totalQuestions = Object.keys(questions).length;

			// Show Thank you page if no categories are selected in first question.
			if (prevQuestionNum === 1 && selectedCategories.length === 0) {
				setShowQuestions(false);
				setShowThankYou(true);
			}

			// Last question.
			if (prevQuestionNum === totalQuestions) {
				calculateCategoryScores();
				console.log(selectedOptions);
				console.log(categoryScores);
			}

			return prevQuestionNum === totalQuestions ? prevQuestionNum : prevQuestionNum + 1;
		});
	}

	function handlePrevButtonClick() {
		setCurrentQuestionNumber(prevNum => {
			return prevNum === 1 ? prevNum : prevNum - 1;
		});
	}

	function togglePrevButton(currentQuestionNumber) {
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			newSelectedOptions[questionId] ??= {};
			newSelectedOptions[questionId][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[questionId][substanceId].text = optionText;
			newSelectedOptions[questionId][substanceId].score = optionScore;

			if (currentQuestionNumber === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSelectedCategories(prevSelectedCategories => [
						...prevSelectedCategories,
						substanceId,
					]);
					setSelectedCategories(prevSelectedCategories =>
						Array.from(new Set(prevSelectedCategories)),
					);
				} else {
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
			const selectedCategoriesSet = new Set(selectedCategories);
			setCategories(
				currentQuestion?.substances?.filter(substanceData =>
					selectedCategoriesSet.has(substanceData.id),
				),
			);
		}
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);
	useEffect(selectCategories, [currentQuestionNumber, currentQuestion, selectedCategories]);

	return (
		<div className="app-container">
			{content && showQuestions && (
				<div className="questions-container">
					<div className="navigation">
						{showPrevButton && (
							<button onClick={() => handlePrevButtonClick()}>Previous</button>
						)}
						<button onClick={() => handleNextButtonClick()}>Next</button>
					</div>
					<Question
						questionNumber={currentQuestionNumber}
						question={currentQuestion}
						categories={categories}
						selectedOptions={selectedOptions}
						handleChange={handleChange}
					/>
				</div>
			)}

			{content && showThankYou && (
				<div className="thank-you-container">
					<p>Thank you page.</p>
				</div>
			)}
		</div>
	);
}

export default App;
