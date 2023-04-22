import CardLayout from "../layouts/CardLayout";

function ContactRow({ rowSpanCount, index, contact }) {
	return (
		<>
			<tr>
				<th
					scope="row"
					rowSpan={rowSpanCount}
				>
					{index + 1}
				</th>
				<th rowSpan={rowSpanCount}>{contact.name}</th>
				<td rowSpan={rowSpanCount}>{contact.location}</td>
			</tr>
			{contact.contactDetails.map((contactDetail, index) => {
				return (
					<tr key={index}>
						<td>{contactDetail}</td>
					</tr>
				);
			})}
		</>
	);
}

function Contact({ children }) {
	return (
		<CardLayout>
			<h1 className="text-center">Contact Us</h1>
			<div className="table-responsive">
				<table className="table table-bordered table-responsive mt-4">
					<thead className="bg-success text-white">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Location</th>
							<th scope="col">Contact</th>
						</tr>
					</thead>
					<tbody>
						{children.map((contact, index) => {
							const rowSpanCount = contact.contactDetails.length + 1;
							return (
								<ContactRow key={index} rowSpanCount={rowSpanCount} index={index} contact={contact} />
							);
						})}
					</tbody>
				</table>
			</div>
		</CardLayout>
	);
}

export default Contact;
