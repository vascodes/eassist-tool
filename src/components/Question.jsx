import CategoryBlock from "./CategoryBlock";

function Question({ questionNumber, question, categories }) {
	return (
		<div className="question-block">
			<p className="question-text">{`${questionNumber}. ${question.text}`}</p>
			{categories?.map((category) => (
				<CategoryBlock
					key={category.id}
					category={category}
				/>
			))}
		</div>
	);
}

export default Question;
