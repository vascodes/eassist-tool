import { useEffect, useState } from "react";

function App() {
	const [content, setContent] = useState(null);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

	const questions = content?.questions;
	const substances = content?.substances;
	const questionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[questionId] : null;
	const substanceScores = currentQuestion?.substanceScores;

	async function fetchData() {
		try {
			const response = await fetch("http://localhost:8000/e-assist");
			const responseJSON = await response.json();
			setContent(responseJSON);
		} catch (error) {
			console.log("Error! Could not fetch data." + error);
		}
	}

	// Fetch data on app load.
	useEffect(() => fetchData, []);

	function Question({ questionText, options }) {
		return (
			<div className="question-block">
				<p className="question-text">{questionText}</p>
				{substances.map((substance) => {
					return (
						<div
							key={substance.id}
							className="option-block"
						>
							<div className="option-text">
								{substance.name} ({substance.examples})
							</div>

							<div className="options">
								{options.map((option) => {
									return option;
								})}
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<div className="app-container">
			<div className="questions-container">
				{content && (
					<Question
						questionText={currentQuestion.text}
						options={currentQuestion.options}
					/>
				)}
			</div>

			<div className="info-container">
				<div className="info-block">
					<h3 className="info-heading">What is the eASSIST?</h3>
					<p className="info-text">
						The eASSIST is an electronic version of the Alcohol, Smoking and Substance Involvement Screening Test (ASSIST) which was developed by the World Health Organization. The ASSIST has eight questions and takes approximately 5-10 minutes to complete. The ASSIST helps identify the
						risks associated with substance use and the personalised feedback helps explore options for change.
					</p>
				</div>

				<div className="info-block">
					<h3 className="info-heading">Need Help?</h3>
					<p className="info-text">
						The Alcohol and Drug Information Service (ADIS) are State and Territory based phone services that offer information, advice and support. They provide services for health professionals, individuals, business and community groups. Phone 1800 250 015 to be linked to your nearest
						service.
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
