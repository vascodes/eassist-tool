import { useState } from "react";

export default function usePage(intialPage) {
	const [page, setPage] = useState(intialPage);
	const allPages = Object.freeze({
		home: 1,
		userDetails: 2,
		questions: 3,
		thankYou: 4,
		advice: 5,
		scores: 6,
		contact: 7,
	});

	return { page, setPage, allPages };
}
