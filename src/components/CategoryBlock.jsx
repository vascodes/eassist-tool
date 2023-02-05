import Option from "./Option";

function CategoryBlock({ category, selectedCategories, handleRadioBtnChange }) {
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
				{category?.options?.map((option) => {					
					return (
						<Option
							key={option.id}
							categoryId={category.id}							
							optionText={option.text}							
							score={option.score}
							selectedCategories={selectedCategories}
							handleRadioBtnChange={handleRadioBtnChange}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default CategoryBlock;
