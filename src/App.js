import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";
import CategorySelect from "./components/CategorySelect";

function App() {
	const [content, setContent] = useState(null);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;
	const selectedSubstances = new Set();

	function handleNextButtonClick() {
		setCurrentQuestionNumber((prevNo) => {
			let totalQuestions = Object.keys(questions).length;

			return prevNo === totalQuestions ? prevNo : prevNo + 1;
		});
	}

	function handlePrevButtonClick() {
		setCurrentQuestionNumber((prevNum) => {
			return prevNum === 1 ? prevNum : prevNum - 1;
		});
	}

	function togglePrevButton(currentQuestionNumber) {
		SetShowPrevButton(currentQuestionNumber !== 1);
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);

	function handleCategoryChange(e) {
		let substanceId = e.target.name,
			isCategorySelected = e.target.dataset.isCategorySelected;

		isCategorySelected ? selectedSubstances.add(substanceId) : selectedSubstances.delete(substanceId);
	}

	return (
		<div className="app-container">
			{showPrevButton && <button onClick={() => handlePrevButtonClick()}>Previous</button>}
			<button onClick={() => handleNextButtonClick()}>Next</button>
			<div className="questions-container">
				{content && (
					// <Question
					// 	questionNumber={currentQuestionNumber}
					// 	question={currentQuestion}
					// 	categories={substances}
					// />

					<CategorySelect
						questionNumber={currentQuestionNumber}
						question={currentQuestion}
						categories={substances}
						handleRadioBtnChange={handleCategoryChange}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
