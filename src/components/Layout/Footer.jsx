import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={`footer ${isAuthorized ? "footerShow" : "footerHide"}`}>
      <div className="footerContent">
        <div>&copy; All Rights Reserved By - Team CareerBridge ❤️</div>
        <div className="connectText">Connect with us:</div>
        <div className="socialLinks">
          <Link
            to={"https://www.linkedin.com/in/aravindhan-k-351394312/"}
            target="_blank"
            className="socialIcon linkedin"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={"https://github.com/Aravindhan-K97"}
            target="_blank"
            className="socialIcon github"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
