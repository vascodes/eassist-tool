import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

function InfoCard() {
	const { translation } = useContext(AppContext);
	return (
		<div className="info-container col-lg-4">
			<div className="card border-remove">
				<div className="card-body">
					<h3>{translation.infoCard.title1}</h3>
					<p>{translation.infoCard.text1}</p>

					<h3>{translation.infoCard.title2}</h3>
					<p>{translation.infoCard.text2}</p>
				</div>
			</div>
		</div>
	);
}

export default InfoCard;
