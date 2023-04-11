import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

function NavBar() {
	const { allPages, setPage } = useContext(PageContext);

	function handleNavButtonClick() {
		setPage(allPages.home);
	}

	function handleContactButtonClick() {
		setPage(allPages.contact);
	}

	return (
		<header>
			<nav
				className="navbar navbar-expand-lg navbar-light"
				style={{ backgroundColor: "#158852" }}
			>
				<div className="container-fluid">
					<button
						className="navbar-brand btn border-0"
						onClick={handleNavButtonClick}
					>
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/rajagiri_logo.jpg`}
							width="70"
							height="70"
							className="d-inline-block align-top"
							alt="logo"
						/>
					</button>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="collapse navbar-collapse"
						id="navbarTogglerDemo02"
					>
						<ul className="navbar-nav ms-auto px-5 mb-2 mb-lg-0">
							<li className="nav-item">
								<button
									className="nav-link text-white active btn border-0"
									onClick={handleNavButtonClick}
								>
									Home
								</button>
							</li>
							<li className="nav-item">
								<button
									className="nav-link text-white btn border-0"
									onClick={handleContactButtonClick}
								>
									Contact
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default NavBar;
