import { useState } from "react";

function useFetch(data) {
	const [content] = useState(data);
	
	function getSubstanceDetailsById(substanceId) {
		return content?.substances.find(
			substance => substance.id === substanceId,
		);
	}

	function getSubstanceAdviceHTML(type = "moderate", substanceId) {
		type = type.toLowerCase();
		substanceId = substanceId?.toLowerCase();
		const adviceHTML = content?.substanceAdvice[type][substanceId];

		return adviceHTML;
	}

	return {
		content,		
		getSubstanceDetailsById,
		getSubstanceAdviceHTML,
	};
}

export default useFetch;
