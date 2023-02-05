import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";
import CategorySelect from "./components/CategorySelect";

function App() {
	const [content, setContent] = useState(null);
	const [showCategorySelect, setShowCategorySelect] = useState(true);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState({});

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;
	const selectedSubstances = new Set();

	function handleNextButtonClick() {
		setShowCategorySelect(false);
		setShowQuestions(true);

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
		if (currentQuestionNumber === 1) {
			setShowQuestions(false);
			setShowCategorySelect(true);
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function handleCategoryChange({ target }) {
		let substanceId = target.name,
			optionText = target.dataset.optionText,
			isCategorySelected = optionText.toLowerCase() === "yes";

		// isCategorySelected ? selectedSubstances.add(substanceId) : selectedSubstances.delete(substanceId);

		setSelectedCategories((prev) => {
			const newSelectedCategories = { ...prev };
			newSelectedCategories[substanceId] = optionText;

			return newSelectedCategories;
		});
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);
	useEffect(() => console.log(selectedCategories), [selectedCategories]);

	return (
		<div className="app-container">
			{content && (showQuestions || showCategorySelect) && (
				<div className="navigation">
					{showPrevButton && <button onClick={() => handlePrevButtonClick()}>Previous</button>}
					<button onClick={() => handleNextButtonClick()}>Next</button>
				</div>
			)}

			<div className="questions-container">
				{content && showCategorySelect && (
					<CategorySelect
						questionNumber={currentQuestionNumber}
						question={currentQuestion}
						categories={substances}
						selectedCategories={selectedCategories}
						handleRadioBtnChange={handleCategoryChange}
					/>
				)}

				{content && showQuestions && (
					<Question
						questionNumber={currentQuestionNumber}
						question={currentQuestion}
						categories={substances}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
