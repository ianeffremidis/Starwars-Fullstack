import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./navigation.js";
import { MobileNavigation } from "./mobileNavigation.js";
import classes from "./NavBar.module.css"

export const Navbar = () => {
	return(
		<div className={classes.Navbar}>
			<MobileNavigation />
		</div>
	)
};
