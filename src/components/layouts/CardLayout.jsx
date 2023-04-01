import InfoCard from "../InfoCard";

function CardLayout({ children }) {
	return (
		<div className="row">
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
