import InfoCard from "../common/InfoCard";

function CardLayout({ showInfo, children }) {
	return (
		<div className="row p-4">
			<div className="col mb-3">
				<div className="card">
					<div className="card-body">{children}</div>
				</div>
			</div>

			{showInfo && <InfoCard />}
		</div>
	);
}

export default CardLayout;
