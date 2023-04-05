import Accordion from "../ui/Accordion";

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function Advice({ type, substances, getSubstanceAdviceHTML }) {
	return (
		<>
			<h5>{capitalize(type)} Advice</h5>

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
