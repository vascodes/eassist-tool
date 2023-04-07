import Option from "./Option";

function OptionCard({ questionId, substance, substanceDetails, selectedOptions, handleChange }) {		
	let substanceName = substanceDetails?.name,
		substanceExamples = substanceDetails?.examples && `(${substanceDetails.examples}, etc.)`;

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
								questionId={questionId}
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

export default OptionCard;
