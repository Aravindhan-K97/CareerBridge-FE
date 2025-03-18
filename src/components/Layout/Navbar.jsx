import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import "./Navbar.css";

import logo from "./jobdekho.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://careerbridge-be.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      
      toast.success(response.data.message);
      
      // ✅ Clear authentication state
      setIsAuthorized(false);
      setUser(null); // Ensure user state is reset
      sessionStorage.removeItem("greetingShown");

      // ✅ Redirect to login after logout
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    // ✅ Close sidebar when user logs out
    if (!isAuthorized) {
      setShow(false);
    }
  }, [isAuthorized]);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <div>
      {isAuthorized && (
        <div className="hamburgerMenu" onClick={() => setShow(!show)}>
          {show ? <FiX /> : <GiHamburgerMenu />}
        </div>
      )}
      <motion.nav
        className={`sidebar ${isAuthorized ? "navbarShow" : "navbarHide"}`}
        animate={show ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="sidebarContainer">
          <img src={logo} alt="JobDekho" className="sidebarLogo" />
          <ul className="sidebarMenu">
            <li>
              <Link to="/" onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/job/getall" onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to="/applications/me" onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user?.role === "Employer" && (
              <>
                <li>
                  <Link to="/job/post" onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to="/job/me" onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
            <li>
              <button className="logoutButton" onClick={handleLogout}>
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
