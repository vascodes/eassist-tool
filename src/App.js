import { useEffect, useState } from "react";
import QuestionBlock from "./components/QuestionBlock";

function App() {
	const [content, setContent] = useState(null);
	const [questions, setQuestions] = useState({});
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

	const substances = content?.substances;
	const currentQuestion = questions ? questions["question" + currentQuestionNumber] : "question1";

	async function fetchData() {
		try {
			const response = await fetch("http://localhost:8000/e-assist");
			const responseJSON = await response.json();
			setContent(responseJSON);
		} catch (error) {
			console.log("Error! Could not fetch data." + error);
		}
	}

	function handleNextButtonClick() {
		setCurrentQuestionNumber((prevId) => {
			let numQuestions = Object.keys(questions).length;
			if (prevId === numQuestions) {
				alert("End of questions");
				return prevId;
			}

			return prevId + 1;
		});
	}

	function handlePrevButtonClick(){
		
	}

	useEffect(() => fetchData, []);
	useEffect(() => setQuestions(content?.questions), [content]);

	return (
		<div className="app-container">
			{!content ? (
				"Loading.."
			) : (
				<div className="questions-container">
					<button onClick={() => handleNextButtonClick()}>Next</button>
					<button onClick={() => handlePrevButtonClick()}>Previous</button>
					<QuestionBlock
						question={currentQuestion}
						substances={substances}
						allSubstanceScores={currentQuestion.substanceScores}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
