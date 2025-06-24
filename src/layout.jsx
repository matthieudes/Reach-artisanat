import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import ChatbotPopup from "./components/ChatbotPopup";

export default function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <ChatbotPopup/>
        </>
    );
}
