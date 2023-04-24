import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Footer() {
    const {translation} = useContext(AppContext);
    
    return (
        <>
            <footer className="footer mt-auto">
                <div className="container-fluid bg-success text-white p-3 text-center">
                    <p>{translation.footer.text}</p>
                </div>
            </footer>
        </>
    );
}