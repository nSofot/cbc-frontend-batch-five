import{Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="bg-red-500">
            <h1>Crystal Beauty Clear</h1>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}