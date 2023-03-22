import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import Loginform from "../component/loginForm";



export const Login = () => (
	<div className="container-fluid mt-5">
		<Loginform/>
	</div>
);
