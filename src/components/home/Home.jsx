import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import PageNavigation from "../ui/PageNavigation";

function Home() {
	const { allPages, setPage } = useContext(PageContext);

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
					<h1>SELF ASSESSMENT</h1>
					<i
						className="bi bi-card-checklist d-none d-md-block"
					/>
				</div>
				<div className="hero-text mt-3">
					<p className="lead">
						Spend a few minutes to learn more about your potential alcohol or
						substance addiction through our assessment.
					</p>
				</div>
				<button type="button" className="btn bg-white text-success fw-bold mt-3" onClick={handleNextButtonClick}>
					Start Assessment
				</button>
			</section>

			<section id="about-assessment" className="bg-white py-5">
				<div className="row align-items-center">
					<div className="col-md text-center">
						<h3>What is this Assessment about?</h3>
					</div>
					<div className="col-md">
						<div className="info-bubble bg-success text-white p-4 m-4 rounded">
							This assessment is a modified version of the Alcohol, Smoking and
							Substance Involvement Screening Test (ASSIST) which was developed by
							the World Health Organization. It takes approximately 5-10 minutes to
							complete and helps identify the risks associated with substance use.
							The personalised feedback helps you explore options for change.
						</div>
					</div>
				</div>
			</section>

			<section id="about-us" className="bg-success p-5">
				<div className="row align-items-start">
					<div className="col-md order-2 order-md-1">
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/Rajagiri_college_of_social_science.jpg`}
							alt=""
							className="about-us-img img-fluid rounded"
						/>
					</div>
					<div className="col-md order-1 order-md-2 text-white">
						<div className="about-us-container">
							<h3>About Us</h3>
							<p className="about-us-text mt-4">
								The development of this website is supported and undertaken by
								Rajagiri College of Social Sciences (Autonomous) Centre for
								Excellence in Substance Use Prevention (CESUP)
							</p>
							<p className="about-us-text mt-4">
								Rajagiri - COMmunity Based Action for Drug PrevenTion (R-COMBAT)
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="support"
				className="bg-white d-flex flex-column align-items-center p-5"
			>
				<h3>Project Supported By</h3>
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
