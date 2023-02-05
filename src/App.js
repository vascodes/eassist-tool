import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";

function App() {
	const [content, setContent] = useState(null);
	const [showQuestions, setShowQuestions] = useState(true);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [selectedSubstances, setSelectedSubstances] = useState([]);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

	const CategoryScores = {
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
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function handleChange({ target }) {
		let substanceId = target.name,
			optionText = target.dataset.optionText;

		setSelectedOptions((prev) => {
			const newSelectedOptions = { ...prev };

			newSelectedOptions[questionId] ??= {
				substances: {
					tobacco: "",
					alcohol: "",
					cannabis: "",
					cocaine: "",
					amphetamine: "",
					inhalants: "",
					sedatives: "",
					hallucinogens: "",
					opioids: "",
					other: "",
				},
			};

			newSelectedOptions[questionId].substances[substanceId] = optionText;
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
