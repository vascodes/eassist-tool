import Option from "./Option";

function OptionBlock({ options, substanceName, examples }) {
	return (
		<div className="option-block">
			<p className="option-text">
				{substanceName}
				{examples && ` (${examples} etc.)`}
			</p>

			<div className="options">
				{options?.map((option) => {
					return (
						<Option
							key={option}
							substanceName={substanceName}
							option={option}
						></Option>
					);
				})}
			</div>
		</div>
	);
}

export default OptionBlock;
