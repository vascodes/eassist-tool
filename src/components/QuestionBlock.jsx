function QuestionBlock({ substances, question }) {
	return (
		<div className="question-block">
			<p className="question-text">{question.text}</p>
			{substances.map((substance) => (
				<div
					key={substance.id}
					className="option-block"
				>
					<p className="option-text">
						{substance.name}
						{substance.examples && ` (${substance.examples} etc.)`}
					</p>
					<div className="options"></div>
				</div>
			))}
		</div>
	);
}

export default QuestionBlock;
