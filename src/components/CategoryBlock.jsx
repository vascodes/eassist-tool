import Option from "./Option";

function CategoryBlock({ category, handleRadioBtnChange }) {
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
				{category?.options?.map((option) => (
					<Option
						key={option.id}
						categoryName={categoryName}
						optionText={option.text}
						score={option.score}
						handleRadioBtnChange = {handleRadioBtnChange}
					/>
				))}
			</div>
		</div>
	);
}

export default CategoryBlock;
