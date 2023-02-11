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
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

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
		setCurrentQuestionNumber((prevNo) => {
			let totalQuestions = Object.keys(questions).length;

			// Last question.
			if (prevNo === totalQuestions) {
				calculateCategoryScores();
				console.log(selectedOptions);
				console.log(categoryScores);
			}

			return prevNo === totalQuestions ? prevNo : prevNo + 1;
		});
	}

	function handlePrevButtonClick() {
		setCurrentQuestionNumber((prevNum) => {
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

		setSelectedOptions((prev) => {
			const newSelectedOptions = { ...prev };
						
			newSelectedOptions[questionId] = {};			
			newSelectedOptions[questionId][substanceId] = { text: "", score: 0 };
			newSelectedOptions[questionId][substanceId].text = optionText;
			newSelectedOptions[questionId][substanceId].score = optionScore;

			return newSelectedOptions;
		});
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);

	return (
		<div className="app-container">
			<div className="navigation">
				{showPrevButton && <button onClick={() => handlePrevButtonClick()}>Previous</button>}
				<button onClick={() => handleNextButtonClick()}>Next</button>
			</div>

			<div className="questions-container">
				{content && showQuestions && (
					<Question
						questionNumber={currentQuestionNumber}
						question={currentQuestion}
						categories={substances}
						selectedOptions={selectedOptions}
						handleChange={handleChange}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
