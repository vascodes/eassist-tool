import CardLayout from "../layouts/CardLayout";
function Contact({ children }) {
	return (
		<CardLayout>
			<h1 className="text-center">Contact Us</h1>
			<div className="table-responsive">
				<table className="table table-bordered table-responsive mt-4">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Location</th>
							<th scope="col">Phone</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody>
						{children.map((contact, index) => {
							const rowSpanCount = contact.phoneNumbers.length + 1;
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
									{contact.phoneNumbers.map((phoneNumber, index) => {
										return (
											<tr>
												<td>{phoneNumber}</td>
												<td>{contact.emails[index]}</td>
											</tr>
										);
									})}
								</>
							);
						})
					}
					</tbody>
				</table>
			</div>
		</CardLayout>
	);
}

export default Contact;
