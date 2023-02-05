import CategoryBlock from "./CategoryBlock";

function Question({ questionNumber, question, categories, handleRadioBtnChange }) {
	return (
		<div className="question-block">
			<p className="question-text">{`${questionNumber}. ${question.text}`}</p>
			{categories?.map((category) => (
				<CategoryBlock
					key={category.id}
					category={category}
					handleRadioBtnChange={handleRadioBtnChange}
				/>
			))}
		</div>
	);
}

export default Question;
