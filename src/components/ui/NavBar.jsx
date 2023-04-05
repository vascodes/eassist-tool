function NavBar() {
	return (
		<header>
			<nav
				className="navbar navbar-expand-lg navbar-light"
				style={{ backgroundColor: "#158852" }}
			>
				<div className="container-fluid">
					<a
						className="navbar-brand"
						href="/"
					>
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/rajagiri_logo.jpg`}
							width="70"
							height="70"
							className="d-inline-block align-top"
							alt="logo"
						/>
					</a>

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
								<a
									className="nav-link text-white active"
									href="/"
								>
									Home
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-white"
									href="/"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default NavBar;
