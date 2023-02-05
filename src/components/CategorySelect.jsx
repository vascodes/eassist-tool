import Question from "./Question";

function CategorySelect({ questionNumber, question, categories, handleRadioBtnChange }) {
    return (
        <Question
            questionNumber={questionNumber}
            question={question}
            categories={categories}
            handleRadioBtnChange={handleRadioBtnChange}
        />
    );
}

export default CategorySelect;