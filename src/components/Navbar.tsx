import { Link } from "react-router-dom";
import HoverButton from "./Hover";
import { GoHome } from "react-icons/go";
import { LuArchive } from "react-icons/lu";
import { LuBookMinus } from "react-icons/lu";
import { LuUserCog } from "react-icons/lu";
const Navbar = () => {

  const token =localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "userId=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

   
    window.location.href = '/';
  };

  return (
    <div className="w-full flex justify-center border-b  backdrop-blur-md  sticky top-0 ">
      <div className=" flex justify-around pt-2  pb-5 w-[45%] h-12 rounded-lg  ">
        <div>
        <Link to="/">
          <HoverButton
            text="Home"
            icon={GoHome}
          />
        </Link>  
        </div>
      { token &&
      <>
      <div>
        <Link to="/campaigns">
          <HoverButton
            text="Campaign"
            icon={LuBookMinus}
          />
        </Link>  
        </div>
        <div>
        <Link to="/invoices">
          <HoverButton
            text="Invoice"
            icon={LuArchive}
          />
        </Link>  
        </div>
        <div>
        <Link to="/Myaccount">
          <HoverButton
            text="Profile"
            icon={LuUserCog}
          />
        </Link>  
        </div>
        </>}
       
      </div>
      {token && <button
       onClick={handleLogout}
      className="px-3 py-1 h-9 mt-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
    >
      Logout
    </button>}
    </div>
  );
};

export default Navbar;
