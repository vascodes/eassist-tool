export function getInitialSubstanceScores(allSubstances) {
	const initialSubstanceScores = {};

	allSubstances.forEach(substance => {
		initialSubstanceScores[substance.id] = 0;
	});

	return initialSubstanceScores;
}

export function getInitialCategories() {
	return {
		low: [],
		moderate: [],
		referral: [],
	};
}
