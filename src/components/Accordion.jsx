function Accordion({ id, title, children, capitalize }) {
	let capitalizedId = capitalize(id);
	let accordionId = `accordion${capitalizedId}`;
	let headingId = `heading${capitalizedId}`;
	let dataTarget = `collapse${capitalizedId}`;

	console.log(children);
	
	return (
		<div
			className="accordion mb-4"
			id={accordionId}
		>
			<div className="accordion-item">
				<h2
					className="accordion-header"
					id={headingId}
				>
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={`#${dataTarget}`}
						aria-expanded="true"
						aria-controls={dataTarget}
					>
						{title}
					</button>
				</h2>

				<div
					id={dataTarget}
					className="accordion-collapse collapse"
					aria-labelledby={headingId}
					data-bs-parent={`#${accordionId}`}
				>					
					<div className="accordion-body">{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
