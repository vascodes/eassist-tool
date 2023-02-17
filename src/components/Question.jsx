import CategoryBlock from "./CategoryBlock";

function Question({ questionNumber, question, categories, selectedOptions, handleChange }) {
	// TODO: Change 8 to totalQuestions length
	const progressBarWidth = Math.floor((questionNumber / 8) * 100);
	return (
		<div className="question-block">
			<p className="d-flex question-text">{`${questionNumber}. ${question.text}`}</p>

			{/* Progress Bar */}
			<div className="progress mb-4">
				<div
					className="progress-bar bg-success"
					role="progressbar"
					style={{ width: `${progressBarWidth}%` }}
					aria-valuenow={progressBarWidth}
					aria-valuemin="0"
					aria-valuemax="100"
				>					
					{`${progressBarWidth}%`}
				</div>
			</div>

			<ol className="list-group list-group-flush">
				{categories?.map(category => (
					<CategoryBlock
						key={category.id}
						questionNumber={questionNumber}
						category={category}
						selectedOptions={selectedOptions}
						handleChange={handleChange}
					/>
				))}
			</ol>
		</div>
	);
}

export default Question;
