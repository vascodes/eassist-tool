import { useEffect, useState } from "react";
import QuestionBlock from "./components/QuestionBlock";

function App() {
	const [content, setContent] = useState(null);

	async function fetchData() {
		try {
			const response = await fetch("http://localhost:8000/e-assist");
			const responseJSON = await response.json();
			setContent(responseJSON);
		} catch (error) {
			console.log("Error! Could not fetch data." + error);
		}
	}

	useEffect(() => fetchData, []);

	return (
		<div className="app-container">
			<div className="questions-container">{content && <QuestionBlock questionText="Sample Question" />}</div>
		</div>
	);
}

export default App;
