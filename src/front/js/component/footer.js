import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
	const {store, actions} = useContext(Context);
	const token = store.token
	const navigate = useNavigate();
	const logout = ()=>{
		actions.logout()
		window.location.reload(false);
	}

	return(
	<footer className="footer mt-auto py-3 text-center">
		{token && token!="" && token!=undefined ?
		<button type="button" className="btn btn-outline-danger me-5" onClick={logout}><i className="fa-solid fa-right-from-bracket">logout</i></button>
		:
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" Ian Effraimidis "}
		</p> 
		}
	</footer>
	)
	};
