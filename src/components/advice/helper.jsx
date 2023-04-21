export function getCategorizedSubstances(
	scores,
	substanceRiskLevels,
	getSubstanceDetailsById,
) {
	const substancesWithLowRisk = [],
		substancesWithModerateRisk = [],
		substancesWithHighRisk = [];

	for (let substanceId in scores) {
		const substance = getSubstanceDetailsById(substanceId);

		let substanceScore = scores[substanceId];
		const substanceRisk = substanceRiskLevels[substanceId];

		const lowMax = substanceRisk.lower.max;
		const moderateMax = substanceRisk.moderate.max;

		if (substanceScore <= lowMax) {
			substancesWithLowRisk.push(substance);
		} else if (substanceScore <= moderateMax) {
			substancesWithModerateRisk.push(substance);
		} else {
			substancesWithHighRisk.push(substance);
		}
	}

	const riskCategories = {
		low: substancesWithLowRisk,
		moderate: substancesWithModerateRisk,
		referral: substancesWithHighRisk,
	};

	return riskCategories;
}