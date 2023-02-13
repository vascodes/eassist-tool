import Option from "./Option";

function CategoryBlock({ questionNumber, category, selectedOptions, handleChange }) {
	let categoryName = category?.name,
		categoryExamples = category?.examples !== "" ? `(${category.examples}, etc.)` : "";

	return (
		<div className="category-block">
			{categoryName !== "" ? (
				<div className="category-text">
					{categoryName} {categoryExamples}
				</div>
			) : null}

			<div className="options">
				{category?.options?.map(option => {
					return (
						<Option
							key={option.id}
							questionNumber={questionNumber}
							categoryId={category.id}
							optionText={option.text}
							score={option.score}
							selectedOptions={selectedOptions}
							handleChange={handleChange}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default CategoryBlock;
