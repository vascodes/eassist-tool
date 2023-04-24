import { useContext } from "react";
import Accordion from "../ui/Accordion";
import { AppContext } from "../../contexts/AppContext";

function Advice({ type, substances, getSubstanceAdviceHTML }) {
	const { translation } = useContext(AppContext);
	let adviceTitle =
		type === "moderate" ? translation.advice.moderateAdvice : translation.advice.referralAdvice;

	return (
		<>
			<h5>{adviceTitle}</h5>

			{substances.map(substance => {
				let adviceContent = getSubstanceAdviceHTML(type, substance.id);
				adviceContent ||= "No advice.";

				return (
					<Accordion
						key={substance.id}
						id={substance.id}
						title={substance.name}
					>
						{adviceContent}
					</Accordion>
				);
			})}
		</>
	);
}

export default Advice;
