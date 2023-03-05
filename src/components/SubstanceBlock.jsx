import Option from "./Option";

function SubstanceBlock({ questionNumber, substance, selectedOptions, handleChange }) {
	let substanceName = substance?.name,
		substanceExamples = substance?.examples !== "" ? `(${substance.examples}, etc.)` : "";

	return (
		<li className="list-group-item d-flex">
			<div className="substance-block">
				{substanceName !== "" ? (
					<div className="substance-text">
						{substanceName} {substanceExamples}
					</div>
				) : null}

				<div className="options">
					{substance?.options?.map(option => {
						return (
							<Option
								key={option.id}
								questionNumber={questionNumber}
								substanceId={substance.id}
								optionText={option.text}
								score={option.score}
								selectedOptions={selectedOptions}
								handleChange={handleChange}
							/>
						);
					})}
				</div>
			</div>
		</li>
	);
}

export default SubstanceBlock;
