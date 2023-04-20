import InfoCard from "../common/InfoCard";

function CardLayout({ children }) {
	return (
		<div className="row p-4">
			<div className="container-fluid col-lg-8 mb-3">
				<div className="card">
					<div className="card-body">{children}</div>
				</div>
			</div>

			<InfoCard />
		</div>
	);
}

export default CardLayout;
