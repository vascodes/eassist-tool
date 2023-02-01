import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";

function App() {
	const [content, setContent] = useState(null);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

	function handleNextButtonClick() {
		setCurrentQuestionNumber((prevNo) => {
			let totalQuestions = Object.keys(questions).length;
			if (prevNo === totalQuestions) return prevNo;

			return prevNo + 1;
		});
	}

	function handlePrevButtonClick() {
		setCurrentQuestionNumber((prevNum) => {
			if (prevNum === 1) return prevNum;

			return prevNum - 1;
		});
	}

	function togglePrevButton(currentQuestionNumber) {
		currentQuestionNumber === 1 ? SetShowPrevButton(false) : SetShowPrevButton(true);
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);

	return (
		<div className="app-container">
			{showPrevButton && <button onClick={() => handlePrevButtonClick()}>Previous</button>}
			<button onClick={() => handleNextButtonClick()}>Next</button>
			<div className="questions-container">
				{content && (
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
