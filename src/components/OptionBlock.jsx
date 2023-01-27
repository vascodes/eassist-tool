import Option from "./Option";

function OptionBlock({ options, substanceName, examples, substanceScore }) {
	let optionText = `${substanceName}`;
	optionText = examples ? optionText.concat(` (${examples} etc.)`) : optionText;
	return (
		<div className="option-block">
			<p className="option-text">{optionText}</p>
			<div className="options">
				{options?.map((option) => {
					return (
						<Option
							key={option}
							substanceName={substanceName}
                            score = {substanceScore && substanceScore[option]}
							option={option}
						></Option>
					);
				})}
			</div>
		</div>
	);
}

export default OptionBlock;
