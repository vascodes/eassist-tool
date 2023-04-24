import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

function NavBar() {
	const { translation, changeLanguage, allPages, setPage } = useContext(AppContext);
	const [activeNavButton, setActiveNavButton] = useState("btn-nav-home");

	function getNavButtonClass(buttonName) {
		let defaultNavButtonClass = "nav-link btn border-0";
		let navButtonClass = activeNavButton === buttonName ? `${defaultNavButtonClass} active` : defaultNavButtonClass;

		return navButtonClass;
	}

	function handleClick({ target }) {
		const { name } = target;
		const section = name.split("-").at(-1);

		setActiveNavButton(name);

		switch (section) {
			case "brand":
			case "home":
				setPage(allPages.home);
				break;

			case "assessment":
				setPage(allPages.userDetails);
				break;

			case "contact":
				setPage(allPages.contact);
				break;

			default:
				throw new Error("Invalid button.");
		}
	}

	return (
		<header>
			{/* NAVBAR TOP */}
			<div className="container-fluid bg-success py-2 px-3">
				<div className="dropdown open">
					<button className="btn dropdown-toggle p-0 text-white border-0" type="button" id="languageDropdown"
						data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{translation.navbar.changeLanguage}
					</button>
					<div className="dropdown-menu" aria-labelledby="languageDropdown">
						<button className="dropdown-item" onClick={() => changeLanguage("en")}>
							English
						</button>
						<button className="dropdown-item" onClick={() => changeLanguage("ml")}>
							Malayalam (മലയാളം)
						</button>
					</div>
				</div>
			</div>

			{/* MAIN NAVBAR */}
			<nav className="navbar navbar-expand-lg navbar-light bg-white px-2">
				<div className="container-fluid">
					<button name="btn-nav-brand" className="navbar-brand btn border-0" onClick={handleClick}>
						<img src={`${process.env.PUBLIC_URL}/assets/images/rajagiri_logo.jpg`} width="70" height="70"
							name="btn-nav-brand" className="d-inline-block align-top" alt="logo" />
					</button>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
						aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<button name="btn-nav-home" className={getNavButtonClass("btn-nav-home")} aria-current="page"
									onClick={handleClick}>
									{translation.navbar.home}
								</button>
							</li>
							<li className="nav-item">
								<button name="btn-nav-assessment" className={getNavButtonClass("btn-nav-assessment")} onClick={handleClick}>
									{translation.navbar.startAssessment}
								</button>
							</li>
							<li className="nav-item">
								<button name="btn-nav-contact" className={getNavButtonClass("btn-nav-contact")} onClick={handleClick}>
									{translation.navbar.contact}
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
