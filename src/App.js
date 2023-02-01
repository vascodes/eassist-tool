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

	function Option({ categoryName, optionText, score }) {
		// convert to lowercase and remove spaces, special characters.
		let categoryNameWithHyphens = replaceSpecialCharsInString(categoryName.toLowerCase(), "-");
		let optionTextWithHyphens = replaceSpecialCharsInString(optionText.toLowerCase(), "-");

		let radioButtonId = `radio-${categoryNameWithHyphens}-${optionTextWithHyphens}`; // ex: radio-cannabis-no
		radioButtonId = replaceSpecialCharsInString(radioButtonId, "-");

		return (
			<div className="option-group">
				<input
					type="radio"
					name={categoryNameWithHyphens}
					id={radioButtonId}
					value={score}
					required
				/>
				<label htmlFor={radioButtonId}>{optionText}</label>
			</div>
		);
	}

	function CategoryBlock({ category }) {
		let categoryName = category?.name,
			categoryExamples = category?.examples !== "" ? `(${category.examples}, etc.)` : "";

		return (
			<div className="category-block">
				{categoryName !== "" ? (
					<div className="category-text">
						{categoryName} {categoryExamples}
					</div>
				) : null}

				<div className="options">
					{category?.options?.map((option) => (
						<Option
							key={option.id}
							categoryName={categoryName}
							optionText={option.text}
							score={option.score}
						/>
					))}
				</div>
			</div>
		);
	}

	function Question({ question, categories }) {
		return (
			<div className="question-block">
				<p className="question-text">{`${currentQuestionNumber}. ${question.text}`}</p>
				{categories?.map((category) => (
					<CategoryBlock
						key={category.id}
						category={category}
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
						categories={substances}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
