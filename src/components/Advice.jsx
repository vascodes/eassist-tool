import Accordion from "./Accordion";

function Advice({ type, substances }) {
	function getAdvice(type, substanceId) {
		/* GET ADVICE FROM FILE */
		return "TEST ADVICE CONTENT.";
	}

	return (
		<>
			<h5>{type} Advice</h5>

			{substances.map(substance => {
				return (
					<Accordion
						key={substance.id}
						title={substance.name}
					>
						{getAdvice(type, substance.id)}
					</Accordion>
				);
			})}
		</>
	);
}

export default Advice;
