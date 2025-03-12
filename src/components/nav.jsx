
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";

const NavBar = () => {
    return (
        <div className="px-18 py-4 bg-blue-950 flex m-auto justify-between items-center">
            <h1 className="text-2xl text-white">Logo Here</h1>
            <ul className="text-white flex gap-x-8">
                <li><a href="">Home</a></li>
                <li><a href="">Wheelchair</a></li>
                <li><a href="">How it works</a></li>
                <li><a href="">Support</a></li>
                <li><a href="">About Us</a></li>
            </ul>
            <button className="">
                Login
            </button>
        </div>
    );
}

export default NavBar;