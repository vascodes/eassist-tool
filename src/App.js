import { useEffect, useState } from "react";
import { data } from "./data";

import Option from "./components/Option";
import CategoryBlock from "./components/CategoryBlock";
import Question from "./components/Question";

function App() {
	const [content, setContent] = useState(null);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

	// Fetch data on app load.
	useEffect(() => setContent(data), []);

	function handleNextButtonClick() {
		setCurrentQuestionNumber((prevNo) => {
			let totalQuestions = Object.keys(questions).length;
			if (prevNo === totalQuestions) return prevNo;

			return prevNo + 1;
		});
	}

	return (
		<div className="app-container">
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
