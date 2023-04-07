import OptionGroup from "./OptionGroup";

function Question({
	questionId,
	question,
	totalQuestions,
	substances,
	selectedOptions,
	handleChange,
	getSubstanceDetailsById,
}) {
	// console.count("Question");

	const progressBarWidth = Math.floor((questionId / totalQuestions) * 100);
	return (
		<div className="question-block">
			<p className="d-flex question-text">{`${questionId}. ${question.text}`}</p>

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
				{substances?.map(substance => (
					<OptionGroup
						key={substance.id}
						questionId={questionId}
						substance={substance}
						substanceDetails={getSubstanceDetailsById(substance.id)}
						selectedOptions={selectedOptions}
						handleChange={handleChange}
					/>
				))}
			</ol>
		</div>
	);
}

export default Question;
