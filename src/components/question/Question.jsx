import OptionGroup from "./OptionGroup";

function Question({
	question,	
	allSubstances,	
	setAllSelectedOptionsRef,
	totalQuestions,
	handleChange
}) {
	// console.count("Question");

	const progressBarWidth = Math.floor((question.id / totalQuestions) * 100);

	return (
		<div className="question-block">
			<p className="d-flex question-text">{`${question.id}. ${question.text}`}</p>

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
				{question.substances?.map(substance => (
					<OptionGroup												
						key={substance.id}
						questionId = {question.id}
						category={substance}
						allSubstances = {allSubstances}						
						setAllSelectedOptionsRef = {setAllSelectedOptionsRef}
					/>
				))}
			</ol>
		</div>
	);
}

export default Question;
