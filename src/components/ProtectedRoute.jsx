import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, user }) {
    return user ? children : <Navigate to="/inscription" replace />;
}