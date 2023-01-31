import { useEffect, useState } from "react";
import { data } from "./data";

function App() {
	const [content, setContent] = useState(null);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

	const questions = content?.questions;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : {};
	const substances = currentQuestion?.substances;

	// Fetch data on app load.
	useEffect(() => setContent(data), []);

	function replaceSpecialCharsInString(str, replaceStr = "") {
		return str.replace(/[\s\W]/gi, replaceStr);
	}

	function Option({ substanceName, optionText, score }) {
		// convert to lowercase and remove spaces, special characters.		
		let shortSubstanceName = replaceSpecialCharsInString(substanceName.toLowerCase(), "-");
		let shortOptionText = replaceSpecialCharsInString(optionText.toLowerCase(), "-");

		let radioButtonId = `radio-${shortSubstanceName}-${shortOptionText}`; // ex: radio-cannabis-no
		radioButtonId = radioButtonId.replace(/[-]+/gi, "-"); // replace multiple hyphens with single hyphen (-).

		return (
			<div className="option-group">
				<input
					type="radio"
					name={shortSubstanceName}
					id={radioButtonId}
					value={score}
					required
				/>
				<label htmlFor={radioButtonId}>{optionText}</label>
			</div>
		);
	}

	function OptionBlock({ substance }) {
		let substanceName = substance?.name,
			substanceExamples = substance?.examples !== "" ? `(${substance.examples}, etc.)` : "";

		return (
			<div className="option-block">
				{substanceName !== "" ? (
					<div className="option-text">
						{substanceName} {substanceExamples}
					</div>
				) : null}

				<div className="options">
					{substance?.options?.map((option) => (
						<Option
							key={option.id}
							substanceName={substanceName}
							optionText={option.text}
							score={option.score}
						/>
					))}
				</div>
			</div>
		);
	}

	function Question({ question, substances }) {
		return (
			<div className="question-block">
				<p className="question-text">{`${currentQuestionNumber}. ${question.text}`}</p>
				{substances?.map((substance) => (
					<OptionBlock
						key={substance.id}
						substance={substance}
					/>
				))}
			</div>
		);
	}

	return (
		<div className="app-container">
			<div className="questions-container">
				{content && (
					<Question
						question={currentQuestion}
						substances={substances}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
