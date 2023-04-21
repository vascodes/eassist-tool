import { useState } from "react";

export default function useHistory(initialValue) {
	const [history, setHistory] = useState([initialValue]);

	function pushHistory(nextQuestionId) {
		const newHistory = history;
		newHistory.push(nextQuestionId);

		setHistory(newHistory);
	}

	function popHistory() {
		const newHistory = history;
		newHistory.pop();

		setHistory(newHistory);
	}
    
    return {history, pushHistory, popHistory};
}
