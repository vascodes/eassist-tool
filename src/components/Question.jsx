import CategoryBlock from "./CategoryBlock";

function Question({ questionNumber, question, categories, selectedOptions, handleChange }) {
	return (
		<div className="question-block">
			<p className="question-text">{`${questionNumber}. ${question.text}`}</p>
			{categories?.map((category) => (
				<CategoryBlock
					key={category.id}
					questionNumber = {questionNumber}
					category={category}
					selectedOptions = {selectedOptions}
					handleChange={handleChange}
				/>
			))}
		</div>
	);
}

export default Question;
