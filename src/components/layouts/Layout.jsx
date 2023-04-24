import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";

function Layout({ children }) {
	return (
		<>
			<NavBar />

			<div className="container-fluid p-0 app-container">
				{children}
			</div>

			<Footer />
		</>
	);
}

export default Layout;
