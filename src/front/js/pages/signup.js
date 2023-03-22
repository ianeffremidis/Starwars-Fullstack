import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import Signupform from "../component/signupForm";



export const Signup = () => (
	<div className="container-fluid mt-5">
		<Signupform/>
	</div>
);
