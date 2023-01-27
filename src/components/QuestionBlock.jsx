import OptionBlock from "./OptionBlock";

function QuestionBlock({ question, substances, allSubstanceScores }) {
	return (
		question && (
			<div className="question-block">
				<p className="question-text">{question.text}</p>
				{substances.map((substance) => (
					<OptionBlock
						key={substance.id}
						options={question.options}
						substanceName={substance.name}
						substanceScore={allSubstanceScores && allSubstanceScores[substance.name]}
						examples={substance.examples}
					></OptionBlock>
				))}
			</div>
		)
	);
}

export default QuestionBlock;
