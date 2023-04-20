import NavBar from "../ui/NavBar";

function Layout({ children }) {
	return (
		<>
			<NavBar />

			<div className="container-fluid p-0 app-container">
				{children}
			</div>

			<footer>
				<div className="container-fluid bg-success text-white p-3 text-center">
					<p>Designed &amp; Developed by Nikhil &amp; Sweaba at RCSS.</p>
				</div>
			</footer>

		</>
	);
}

export default Layout;
