import { useContext } from "react";
import CardLayout from "../layouts/CardLayout";
import { AppContext } from "../../contexts/AppContext";

function ServiceTableRow({ rowSpanCount, index, service }) {
	return (
		<>
			<tr>
				<th
					scope="row"
					rowSpan={rowSpanCount}
				>
					{index + 1}
				</th>
				<th rowSpan={rowSpanCount}>{service.name}</th>
				<td rowSpan={rowSpanCount}>{service.location}</td>
			</tr>
			{service.serviceDetails.map((serviceDetail, index) => {
				return (
					<tr key={index}>
						<td>{serviceDetail}</td>
					</tr>
				);
			})}
		</>
	);
}

function Service({ children }) {
	const { translation } = useContext(AppContext);

	return (
		<CardLayout>
			<h1 className="text-center">{translation.service.title}</h1>
			<div className="table-responsive">
				<table className="table table-bordered table-responsive mt-4">
					<thead className="bg-success text-white">
						<tr>
							<th scope="col">#</th>
							<th scope="col">{translation.service.name}</th>
							<th scope="col">{translation.service.location}</th>
							<th scope="col">{translation.service.service}</th>
						</tr>
					</thead>
					<tbody>
						{children.map((service, index) => {
							const rowSpanCount = service.serviceDetails.length + 1;
							return (
								<ServiceTableRow
									key={index}
									rowSpanCount={rowSpanCount}
									index={index}
									service={service}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</CardLayout>
	);
}

export default Service;
