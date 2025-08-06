import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <NavLink to="/" className="flex items-center">
                    <img 
                        alt="meetUp logo" 
                        className="h-10 w-auto" 
                        src="/src/assets/meetUpLOGO.png"
                    />
                </NavLink>
                <NavLink 
                    to="/create"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                    Create Event
                </NavLink>
            </div>
        </nav>
    )
}