import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";

function App() {
	const [content, setContent] = useState(null);
	const [showCategorySelect, setShowCategorySelect] = useState(false);
	const [showQuestions, setShowQuestions] = useState(true);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

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
			// setShowQuestions(false); // UNCOMMENT LATER
			setShowCategorySelect(true);
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
	// useEffect(() => console.log(selectedOptions), [selectedOptions]);

	return (
		<div className="app-container">
			{content && (showQuestions || showCategorySelect) && (
				<div className="navigation">
					{showPrevButton && <button onClick={() => handlePrevButtonClick()}>Previous</button>}
					<button onClick={() => handleNextButtonClick()}>Next</button>
				</div>
			)}

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
