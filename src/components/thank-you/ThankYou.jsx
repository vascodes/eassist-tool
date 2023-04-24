import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function ThankYou() {
	const { translation } = useContext(AppContext);

	return (
		<div className="thank-you-container container-fluid bg-white p-5 m-0">
			<div className="card p-3">
				<div className="card-body">
					<h3>{translation.thankYou.title}</h3>
					<p className="mt-3">{translation.thankYou.text}</p>
				</div>
			</div>			
		</div>
	);
}

export default ThankYou;
