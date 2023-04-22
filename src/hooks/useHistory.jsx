import { useState } from "react";

export default function useHistory(initialItem) {
	const [history, setHistory] = useState([initialItem]);

	function pushHistory(nextItem) {
		const newHistory = history;
		newHistory.push(nextItem);

		setHistory(newHistory);
	}

	function popHistory() {
		const newHistory = history;
		newHistory.pop();

		setHistory(newHistory);
	}

	function searchHistory(searchItem){
		return history.find(item => item === searchItem);
	}
    
    return {history, pushHistory, popHistory, searchHistory};
}
