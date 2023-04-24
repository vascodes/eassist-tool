import { useState } from "react";

import Question from "./Question";
import AlertBox from "../ui/AlertBox";
import PageNavigation from "../ui/PageNavigation";
import CardLayout from "../layouts/CardLayout";

import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

import * as helper from "./helpers/helper";
import useHistory from "../../hooks/useHistory";
import useSubstancesUsedRef from "../../hooks/useSubstancesUsedRef";

function QuestionContainer({ allQuestions, allSubstances, resultsRef }) {
	// Contexts.
	const { translation, allPages, setPage } = useContext(AppContext);

	// States.
	const [currentQuestion, setCurrentQuestion] = useState(allQuestions[0]);
	const [allSelectedAnswers, setAllSelectedAnswers] = useState({});
	const [showRequiredMessage, setShowRequiredMessage] = useState(false);

	// Custom hooks.
	const {
		history: questionHistory,
		pushHistory: pushQuestionHistory,
		popHistory: popQuestionHistory,
		searchHistory,
	} = useHistory(currentQuestion.id);

	const { getSubstancesUsed, setSubstancesUsed } = useSubstancesUsedRef({
		lifetime: new Set(), // Ids of substances selected in Q1,
		past3Months: new Set(), // Ids of Substances selected in Q2.
	});

	const totalQuestions = allQuestions.length;
	const currentQuestionIndex = helper.getQuestionIndexFromId(allQuestions, currentQuestion.id);

	function getSubstancesToDisplay() {
		const substancesToDisplay = helper.getSubstancesToDisplay(
			currentQuestion.id,
			getSubstancesUsed,
			currentQuestion?.substances,
		);

		return substancesToDisplay;
	}

	// Change to previous question if nextQuestionId is null else change to next question.
	function changeQuestionById(nextQuestionId = null) {
		if (!nextQuestionId) {
			popQuestionHistory();
		} else {
			pushQuestionHistory(nextQuestionId);
		}

		const newQuestionId = questionHistory.at(-1);
		let index = helper.getQuestionIndexFromId(allQuestions, newQuestionId);
		setCurrentQuestion(allQuestions[index]);
	}

	function handleNextButtonClick() {
		setShowRequiredMessage(false); // reset required message.

		// Validate selected options of a question.
		const isValidSelectedOptions = helper.validateSelectedOptions(
			getSubstancesToDisplay(),
			allSelectedAnswers[currentQuestion.id],
		);

		if (!isValidSelectedOptions) {
			setShowRequiredMessage(true);
			return;
		}

		if (currentQuestion.id === 1) {
			const substancesUsedInLifetime = helper.getSubstancesUsedInLifetime(
				allSelectedAnswers,
				currentQuestion.id,
			);

			setSubstancesUsed({
				substancesUsedInLifetime: substancesUsedInLifetime,
			});
		}

		if (currentQuestion.id === 2) {
			const substancesUsedInPast3Months = helper.getSubstancesUsedInPast3Months(
				allSelectedAnswers,
				currentQuestion.id,
			);

			setSubstancesUsed({
				substancesUsedInPast3Months: substancesUsedInPast3Months,
			});
		}

		const { lifetime: substancesUsedInLifetime } = getSubstancesUsed();

		// Show Thank You page if all options are answered as "No" in question 1.
		if (searchHistory(1) && substancesUsedInLifetime.size === 0) {
			setPage(allPages.thankYou);
			return;
		}

		const nextQuestionId = helper.getNextQuestionId(
			currentQuestion.id,
			allQuestions,
			getSubstancesUsed,
		);

		if (nextQuestionId) {
			changeQuestionById(nextQuestionId);
		} else {
			helper.updateScores(allSelectedAnswers, questionHistory, resultsRef);
			setPage(allPages.advice);
		}
	}

	function handlePrevButtonClick() {
		setShowRequiredMessage(false); // Reset required message.
		if (currentQuestionIndex !== 0) changeQuestionById();
	}

	return (
		<CardLayout showInfo>
			<Question
				key={currentQuestion?.id}
				question={currentQuestion}
				questionIndex={currentQuestionIndex}
				allSubstances={allSubstances}
				substancesToDisplay={getSubstancesToDisplay()}
				allSelectedAnswers={allSelectedAnswers}
				setAllSelectedAnswers={setAllSelectedAnswers}
				totalQuestions={totalQuestions}
			/>

			{showRequiredMessage && (
				<AlertBox type="danger">{translation.alert.answerAllQuestions}</AlertBox>
			)}

			<PageNavigation
				showNextButton
				nextButtonText={
					currentQuestionIndex === totalQuestions - 1
						? translation.pageNavigation.submit
						: translation.pageNavigation.next
				}
				showPreviousButton={currentQuestionIndex !== 0}
				handleNextButtonClick={handleNextButtonClick}
				handlePreviousButtonClick={handlePrevButtonClick}
			/>
		</CardLayout>
	);
}

export default QuestionContainer;
