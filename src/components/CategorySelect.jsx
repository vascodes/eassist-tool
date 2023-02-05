import Question from "./Question";

function CategorySelect({ questionNumber, question, categories, selectedCategories, handleRadioBtnChange }) {
    return (
        <Question
            questionNumber={questionNumber}
            question={question}
            categories={categories}
            selectedCategories = {selectedCategories}
            handleRadioBtnChange={handleRadioBtnChange}
        />
    );
}

export default CategorySelect;