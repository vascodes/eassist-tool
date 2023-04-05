import NavBar from "../ui/NavBar";

function Layout({ children }) {
	return (
		<>
			<NavBar />
			
			<div className="container pt-4 pb-5 app-container">
				{children}
			</div>

            {/* TODO: Add Footer */}
		</>
	);
}

export default Layout;
