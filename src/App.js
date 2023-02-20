import { useEffect, useState } from "react";
import { data } from "./data";

import Question from "./components/Question";
import ScoresTable from "./components/ScoresTable";

function App() {
	const [content, setContent] = useState(null);
	const [showQuestions, setShowQuestions] = useState(true);
	const [finalScores, setFinalScores] = useState(null);
	const [showThankYou, setShowThankYou] = useState(false);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [showPrevButton, SetShowPrevButton] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [showRequiredMsg, setShowRequiredMsg] = useState(false);

	const questions = content?.questions;
	const currentQuestionId = "question" + currentQuestionNumber; //ex: question5
	const currentQuestion = questions ? questions[currentQuestionId] : null;

	function getCategoryScores() {
		const categoryScores = {
			tobacco: 0,
			alcohol: 0,
			cannabis: 0,
			cocaine: 0,
			amphetamine: 0,
			inhalants: 0,
			sedatives: 0,
			hallucinogens: 0,
			opioids: 0,
			other: 0,
		};

		// Find total score of each category from questions in selectedOptions.
		for (let currentQuestionId in selectedOptions) {
			// Answers of Question 8 should not be considered in finalScores.
			if (currentQuestionId === "question8") break;

			const categories = selectedOptions[currentQuestionId];
			for (let categoryName in categories) {
				let category = categories[categoryName];

				// If category doesn't exist in categoryScores,
				// add category to categoryScores and initialize it to 0.
				if (!categoryScores[categoryName]) categoryScores[categoryName] = 0;

				// Update score of current category in categoryScores.
				categoryScores[categoryName] += Number(category.score);
			}
		}

		return categoryScores;
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the category that was selected is removed and quiz is retaken.
		setShowRequiredMsg(false);

		// Show required message if NO questions are answered.
		if (!selectedOptions[currentQuestionId]) {
			setShowRequiredMsg(true);
			return;
		}

		const numSelectedOptions = Object.keys(selectedOptions[currentQuestionId]).length;
		let totalCategories = 0;

		if (currentQuestionNumber === 1 || currentQuestionNumber === 8) {
			totalCategories = currentQuestion?.substances?.length;
		} else {
			totalCategories = selectedCategories?.length;
		}

		// Show required message if all questions are not answered.
		if (numSelectedOptions !== totalCategories) {
			console.log(selectedOptions);
			console.log(totalCategories);
			console.log(selectedCategories);
			setShowRequiredMsg(true);
			return;
		}

		setCurrentQuestionNumber(prevQuestionNum => {
			let totalQuestions = Object.keys(questions).length;

			// Show Thank you page if no categories are selected in first question.
			if (prevQuestionNum === 1 && selectedCategories.length === 0) {
				setShowQuestions(false);
				setShowThankYou(true);
			}

			// Last question.
			if (prevQuestionNum === totalQuestions) {
				const categoryScores = getCategoryScores();
				console.log(selectedOptions);
				console.log(categoryScores);

				setShowQuestions(false);
				SetShowPrevButton(false);
				setFinalScores(categoryScores);
			}

			let newQuestionNum;
			if (prevQuestionNum === totalQuestions) {
				newQuestionNum = prevQuestionNum;
			} else {
				newQuestionNum = prevQuestionNum + 1;
			}

			return newQuestionNum;
		});
	}

	function handlePrevButtonClick() {
		setFinalScores(null);
		setCurrentQuestionNumber(prevNum => {
			return prevNum === 1 ? prevNum : prevNum - 1;
		});
	}

	function togglePrevButton(currentQuestionNumber) {
		if (currentQuestionNumber === 1) {
			SetShowPrevButton(false);
		} else {
			SetShowPrevButton(true);
		}
	}

	function handleChange({ target }) {
		let substanceId = target.name,
			optionScore = target.value,
			optionText = target.dataset.optionText;

		console.log(selectedCategories);
		console.log(selectedOptions);

		setSelectedOptions(prev => {
			let newSelectedOptions = { ...prev };

			newSelectedOptions[currentQuestionId] ??= {};
			newSelectedOptions[currentQuestionId][substanceId] ??= { text: "", score: 0 };
			newSelectedOptions[currentQuestionId][substanceId].text = optionText;
			newSelectedOptions[currentQuestionId][substanceId].score = optionScore;

			if (currentQuestionNumber === 1) {
				if (optionText.toLowerCase() === "yes") {
					setSelectedCategories(prevSelectedCategories => [
						...prevSelectedCategories,
						substanceId,
					]);

					// Remove duplicates.
					setSelectedCategories(prevSelectedCategories =>
						Array.from(new Set(prevSelectedCategories)),
					);
				} else {
					// Deselect a category.
					setSelectedCategories(prevSelectedCategories =>
						prevSelectedCategories.filter(substance => substance !== substanceId),
					);
				}
			}

			return newSelectedOptions;
		});
	}

	function selectCategories() {
		if (currentQuestionNumber === 1 || currentQuestionNumber === 8) {
			setCategories(currentQuestion?.substances);
		} else {
			// For questions other than 1 and 8,
			// only categories selected in Question 1 should be displayed.
			const selectedCategoriesSet = new Set(selectedCategories);
			setCategories(
				currentQuestion?.substances?.filter(substanceData =>
					selectedCategoriesSet.has(substanceData.id),
				),
			);
		}
	}

	function InfoCard() {
		return (
			<div className="container-fluid col-lg info-container">
				<div className="card border-remove">
					<div className="card-body">
						<div className="container">
							<h3>What is the eASSIST?</h3>
							<p>
								The eASSIST is an electronic version of the Alcohol, Smoking and
								Substance Involvement Screening Test (ASSIST) which was developed by
								the World Health Organization. The ASSIST has eight questions and
								takes approximately 5-10 minutes to complete. The ASSIST helps
								identify the risks associated with substance use and the
								personalised feedback helps explore options for change.
							</p>

							<h3>Need Help?</h3>
							<p>
								The Alcohol and Drug Information Service (ADIS) are State and
								Territory based phone services that offer information, advice and
								support. They provide services for health professionals,
								individuals, business and community groups. Phone 1800 250 015 to be
								linked to your nearest service.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	useEffect(() => setContent(data), []); // Fetch data on app load.
	useEffect(() => togglePrevButton(currentQuestionNumber), [currentQuestionNumber]);
	useEffect(selectCategories, [currentQuestionNumber, currentQuestion, selectedCategories]);

	return (
		<>
			<header>
				<nav
					className="navbar navbar-expand-lg navbar-light"
					style={{ backgroundColor: "#158852" }}
				>
					<div className="container-fluid">
						<a
							className="navbar-brand"
							href="https://rajagiri.edu/"
						>
							<img
								src={`${process.env.PUBLIC_URL}/assets/images/rajagiri_logo.jpg`}
								width="70"
								height="70"
								className="d-inline-block align-top"
								alt="logo"
							/>
						</a>

						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo02"
							aria-controls="navbarTogglerDemo02"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarTogglerDemo02"
						>
							<ul className="navbar-nav ms-auto px-5 mb-2 mb-lg-0">
								<li className="nav-item">
									<a
										className="nav-link text-white active"
										href="#"
									>
										Home
									</a>
								</li>
								<li className="nav-item">
									<a
										className="nav-link text-white"
										href="#"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>

			<div className="container pt-4 app-container">
				{content && showQuestions && (
					<div className="row">
						<div className="container-fluid col-lg-8 questions-container">
							<div className="card">
								<div className="card-body">
									<Question
										questionNumber={currentQuestionNumber}
										question={currentQuestion}
										categories={categories}
										selectedOptions={selectedOptions}
										handleChange={handleChange}
									/>
									<div className="question-navigation">
										{showRequiredMsg && (
											<div
												className="alert alert-danger mt-4"
												role="alert"
											>
												Please complete all questions on the page to
												continue.
											</div>
										)}

										<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
											<button
												type="button"
												className="btn btn-success"
												onClick={() => handleNextButtonClick()}
											>
												Next {">"}
											</button>
										</div>

										{showPrevButton && (
											<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
												<button
													className="btn btn-outline-success"
													onClick={() => handlePrevButtonClick()}
												>
													{"<"} Changed my mind
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<InfoCard />
					</div>
				)}

				{content && finalScores && (
					<div className="row">
						<div className="container-fluid col-lg-8 scores-table-container">
							<div className="card">
								<div className="card-body">
									<ScoresTable
										scores={finalScores}
										substanceRiskLevels={content?.substanceRiskLevels}
									/>
								</div>
							</div>
						</div>

						<InfoCard />
					</div>
				)}

				{content && showThankYou && (
					<div className="row">
						<div className="container-fluid col-lg-8 thank-you-container">
							<div className="card">
								<div className="card-body">
									<h3>eASSIST finalScores</h3>
									<p>
										Thank you for completing the questions. Based on your
										answers, you are not at any risk of harms from Tobacco,
										Alcohol, Cannabis, Cocaine, Inhalants, Hallucinogens,
										Sedatives, Opioids, Other use at this time.
									</p>
								</div>
							</div>
						</div>

						<InfoCard />
					</div>
				)}
			</div>
		</>
	);
}

export default App;
