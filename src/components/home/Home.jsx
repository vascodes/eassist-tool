import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function Home() {
	const { translation, allPages, setPage } = useContext(AppContext);

	function handleNextButtonClick() {
		setPage(allPages.userDetails);
	}

	return (
		<>
			<section
				id="hero"
				className="bg-success text-white py-5 d-flex flex-column align-items-center"
			>
				<div className="hero-heading d-flex align-items-end justify-content-between gap-3">
					<h1>{translation.home.hero.title}</h1>
					<i
						className="bi bi-card-checklist d-none d-md-block"
					/>
				</div>
				<div className="hero-text mt-3">
					<p className="lead">
						{translation.home.hero.text}
					</p>
				</div>
				<button type="button" className="btn bg-white text-success fw-bold mt-3" onClick={handleNextButtonClick}>
					{translation.home.hero.button}
				</button>
			</section>

			<section id="about-assessment" className="bg-white p-5">
				<div className="row align-items-center">
					<div className="col-md text-center">
						<h3>{translation.home.aboutAssessment.title}</h3>
					</div>
					<div className="col-md">
						<div className="info-bubble bg-success text-white p-4 rounded">
							<p className="lead">
								{translation.home.aboutAssessment.text}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="about-us" className="bg-success p-5">
				<div className="row align-items-start">
					<div className="col-md order-2 order-md-1 text-center">
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/Rajagiri_college_of_social_science.jpg`}
							alt=""
							className="about-us-img img-fluid rounded"
						/>
					</div>
					<div className="col-md order-1 order-md-2 text-white">
						<div className="about-us-container">
							<h3>{translation.home.aboutUs.title}</h3>
							<p className="about-us-text mt-4">
								{translation.home.aboutUs.text1}
							</p>
							<p className="about-us-text mt-4">
								{translation.home.aboutUs.text2}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="support"
				className="bg-white d-flex flex-column align-items-center p-5"
			>
				<h3>{translation.home.projectSupportedBy.title}</h3>
				<div
					className="logos-row mt-3 mt-md-5 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 gap-md-5"
				>
					<img src={`${process.env.PUBLIC_URL}/assets/images/MSJE.jpg`} alt="" className="img-fluid" />
					<img
						src={`${process.env.PUBLIC_URL}/assets/images/nashamuktbharatabhiyaan-1658925323.jpg`}
						alt=""
						className="img-fluid"
					/>
					<img src={`${process.env.PUBLIC_URL}/assets/images/NISD.png`} alt="" className="img-fluid" />
				</div>
			</section>
		</>
	);
}

export default Home;
