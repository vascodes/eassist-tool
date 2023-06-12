import { useRef } from "react";

export default function useSubstancesUsedRef(intialSubstances){
    const substancesUsedRef = useRef(intialSubstances);

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
	}

    return {substancesUsedRef, getSubstancesUsed, setSubstancesUsed};
}