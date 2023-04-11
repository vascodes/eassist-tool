import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

function Home() {
	const {allPages, setPage} = useContext(PageContext);
	return <h1>This is the Home page.</h1>;
}

export default Home;
