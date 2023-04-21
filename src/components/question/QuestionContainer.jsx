import { useRef, useState } from "react";

import Question from "./Question";
import AlertBox from "../ui/AlertBox";
import PageNavigation from "../ui/PageNavigation";
import CardLayout from "../layouts/CardLayout";

import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

import * as helper from "./helpers/helper";
import useHistory from "../../hooks/useHistory";

function QuestionContainer(props) {
	let { allQuestions, allSubstances, resultsRef } = props;
	const { allPages, setPage } = useContext(PageContext);
	const totalQuestions = allQuestions.length;

	console.count("Question Container.");

	const [currentQuestion, setQuestion] = useState(allQuestions[0]);
	const [allSelectedAnswers, setAllSelectedAnswers] = useState({});
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);
	const {
		history: questionHistory,
		pushHistory: pushQuestionHistory,
		popHistory: popQuestionHistory,
	} = useHistory(currentQuestion.id);

	const substancesUsedRef = useRef({
		lifetime: new Set(), // Ids of substances selected in Q1,
		past3Months: new Set(), // Ids of Substances selected in Q2.
	});

	const getSubstancesUsed = () => substancesUsedRef.current;

	function setSubstancesUsed({
		substancesUsedInLifetime,
		substancesUsedInPast3Months,
	}) {
		if (substancesUsedInLifetime) {
			substancesUsedRef.current.lifetime = new Set(
				substancesUsedInLifetime,
			);
		}

		if (substancesUsedInPast3Months) {
			substancesUsedRef.current.past3Months = new Set(
				substancesUsedInPast3Months,
			);
		}

		console.log(substancesUsedRef);
	}

	function getSubstancesToDisplay(questionId) {
		const {
			lifetime: substancesUsedInLifetime,
			past3Months: substancesUsedInPast3Months,
		} = getSubstancesUsed();

		// Return all substances of question 1 and question 8, if exists.
		if (questionId === 1 || questionId === 8) {
			return currentQuestion?.substances;
		} else {
			// For other questions, only return substances selected in Question 1.
			let filteredSubstances = currentQuestion.substances?.filter(
				substance => substancesUsedInLifetime.has(substance.id),
			);

			// For questions 3, 4 and 5, return substances that,
			// were not answered as "Never" in questions 2.
			if (questionId >= 3 && questionId <= 5) {
				filteredSubstances = filteredSubstances.filter(substance =>
					substancesUsedInPast3Months.has(substance.id),
				);
			}

			return filteredSubstances;
		}
	}

	function setSubstancesUsedInLifetime() {
		/*
			If selected option of a substance is "Yes" in Question 1, 
			then it is a substance used in liftime.
		*/
		const substancesUsedInLifetime = helper.filterSelectedSubstances(
			allSelectedAnswers[currentQuestion.id],
			selectedOption => selectedOption === "yes",
		);

		setSubstancesUsed({
			substancesUsedInLifetime: substancesUsedInLifetime,
		});
	}

	function setSubstancesUsedInPast3Months() {
		/*
			If selected option of a substance is not "Never" in Question 2, 
			then it is a substance used in past 3 months.
		*/
		const substancesUsedInPast3Months = helper.filterSelectedSubstances(
			allSelectedAnswers[currentQuestion.id],
			selectedOption => selectedOption !== "never",
		);

		setSubstancesUsed({
			substancesUsedInPast3Months: substancesUsedInPast3Months,
		});
	}

	// Change to previous question if nextQuestionId is null else change to next question.
	function changeQuestionById(nextQuestionId = null) {
		if (!nextQuestionId) {
			popQuestionHistory();
		} else {
			pushQuestionHistory(nextQuestionId);
		}

		const previousQuestionId = questionHistory.at(-1);
		let index = previousQuestionId - 1;
		setQuestion(allQuestions[index]);
	}

	function getNextQuestionId(currentQuestionId) {
		const { past3Months: substancesUsedInPast3Months } =
			getSubstancesUsed();

		/* 
			If "never" is selected for all options in Question 2
			(ie: no substances were used in past 3 months) then, 
			show Question 6.
		*/
		if (currentQuestionId === 2 && substancesUsedInPast3Months.size === 0) {
			return 6;
		}

		/*
			If only tobacco is NOT selected as "Never" in Q2 
			(ie: if only tobacco is used in past 3 months) then,
			skip to Question 6 after Question 4.
			This is because tobacco should not be displayed in Question 5.
		*/
		if (
			currentQuestionId === 4 &&
			substancesUsedInPast3Months.size === 1 &&
			substancesUsedInPast3Months.has("tobacco")
		) {
			return 6;
		}

		if (currentQuestionId !== totalQuestions) {
			return currentQuestionId + 1;
		}

		return null;
	}

	function handleNextButtonClick() {
		//TODO: Fix bug where required message is shown when one of the substance that was selected is removed and quiz is retaken.

		setShowRequiredMessage(false); // reset required message.

		// Validate selected options of a question.
		const isValidSelectedOptions = helper.validateSelectedOptions(
			getSubstancesToDisplay(currentQuestion.id),
			allSelectedAnswers[currentQuestion.id],
		);

		if (!isValidSelectedOptions) {
			setShowRequiredMessage(true);
			return;
		}

		if (currentQuestion.id === 1) {
			setSubstancesUsedInLifetime();
		}

		if (currentQuestion.id === 2) {
			setSubstancesUsedInPast3Months();
		}

		const { lifetime: substancesUsedInLifetime } = getSubstancesUsed();

		// Show Thank You page if all options are answered as "No" in question 1.
		const isShowThankYouPage = substancesUsedInLifetime.size === 0;
		if (isShowThankYouPage) {
			setPage(allPages.thankYou);
			return;
		}

		const nextQuestionId = getNextQuestionId(currentQuestion.id);
		if (nextQuestionId) {
			changeQuestionById(nextQuestionId);
		} else {
			const filteredAnswers = helper.filterAnswersNotInQuestionHistory(
				allSelectedAnswers,
				questionHistory,
			);

			const selectedSubstanceScores =
				helper.calculateSubstanceScores(filteredAnswers);

			// Update scores.
			for (let substanceId in selectedSubstanceScores) {
				resultsRef.current.scores[substanceId] =
					selectedSubstanceScores[substanceId];
			}

			setPage(allPages.advice);
		}
	}

	function handlePrevButtonClick() {
		setShowRequiredMessage(false); // Reset required message.

		if (currentQuestion.id !== 1) changeQuestionById();
	}

	return (
		<CardLayout>
			<Question
				key={currentQuestion?.id}
				question={currentQuestion}
				allSubstances={allSubstances}
				substancesToDisplay={getSubstancesToDisplay(currentQuestion.id)}
				allSelectedAnswers={allSelectedAnswers}
				setAllSelectedAnswers={setAllSelectedAnswers}
				totalQuestions={totalQuestions}
			/>

			{showRequiredMessage && (
				<AlertBox type="danger">
					Please complete all questions on the page to continue.
				</AlertBox>
			)}

			<PageNavigation
				showNextButton
				nextButtonText={
					currentQuestion.id === totalQuestions
						? "Submit Answers >"
						: "Next >"
				}
				showPreviousButton={currentQuestion.id !== 1}
				handleNextButtonClick={handleNextButtonClick}
				handlePreviousButtonClick={handlePrevButtonClick}
			/>
		</CardLayout>
	);
}

export default QuestionContainer;
