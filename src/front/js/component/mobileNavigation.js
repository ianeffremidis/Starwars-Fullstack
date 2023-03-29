import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css"
//import * from "react-bootstrap";

export const MobileNavigation = () => {
	const {store, actions} = useContext(Context);
	const token = store.token
	const user_id = store.user_id
	const navigate = useNavigate();
	const goLogin = () =>{
		navigate("/login")
	}
	const logout = ()=>{
		actions.logout()
		window.location.reload(false);
	}


	useEffect(() => {
        actions.getFavourites(user_id)
      }, [user_id]);
	

	return (
		<React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light m-4">
                <div className="container-fluid">
				<Link to="/">
					<img src="https://logodix.com/logo/581257.gif" alt="Star Wars" height="40vw" className="d-inline-block ms-1"></img>
				</Link>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="d-flex justify-content-end nav-item m-3">
							{token && token!="" && token!=undefined ?
					<div className="btn-group dropstart">
						<button type="button" className="btn btn-outline-dark dropdown-toggle me-5" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites <span className="badge bg-danger">{store.favorites.length}</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
						
							{store.favorites.map((item,i) => {
							return (
								
								<li key={i}><a className="dropdown-item d-flex justify-content-between">
				
									{item.type==="character" && <Link to={`/charDetails/${item.id}`}>{item.name}</Link>}
									{item.type==="planet" && <Link to={`/planetDetails/${item.id}`}>{item.name}</Link>}
									{item.type==="vehicle" && <Link to={`/vehicleDetails/${item.id}`}>{item.name}</Link>}

									
									<button className="btn btn-outline-dark border-0 btn-sm" > <i className="fa-solid fa fa-trash" onClick={()=> actions.deleteFavorites(i, item.id, user_id, item.type)}></i></ button>
									</a>
								</li>
								)
							})
							}
							
						</ul>	
						<button type="button" className="btn btn-outline-danger me-5" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i></button>				
					</div>
					 
					 : 
					<div>
					<button type="button" className="btn btn-outline-dark me-5" onClick={goLogin}>
						Log in to add Favorites
					</button>
					<a href="/signup" className="text-primary fw-bold me-5">
					Register
				 	 </a></div>  }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>


	);
};
