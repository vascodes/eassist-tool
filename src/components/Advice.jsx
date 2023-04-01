import Accordion from "./Accordion";

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function Advice({ type, substances, getSubstanceAdviceHTML }) {
	return (
		<>
			<h5>{capitalize(type)} Advice</h5>

			{substances.map(substance => {
				return (
					<Accordion
						key={substance.id}
						title={substance.name}
						capitalize={capitalize}
					>
						{getSubstanceAdviceHTML(type, substance.id)}
					</Accordion>
				);
			})}
		</>
	);
}

export default Advice;
