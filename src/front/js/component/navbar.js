import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const token = store.token
	const user_id = store.user_id
	const navigate = useNavigate();
	const goLogin = () =>{
		navigate("/login")
	}

	useEffect(() => {
        actions.getFavourites(user_id)
      }, [user_id]);
	

	return (
		<div className="sticky-top">
			<nav className="navbar navbar-light bg-light mb-3">
				<Link to="/">
					<img src="https://logodix.com/logo/581257.gif" alt="Star Wars" height="70" className="d-inline-block  ms-5"></img>
				</Link>


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
						
					</div>
					 
					 : 
					<div>
					<button type="button" className="btn btn-outline-dark me-5" onClick={goLogin}>
						Log in to add Favorites
					</button>
					<a href="/signup" className="text-primary fw-bold me-5">
					Register
				 	 </a></div>  }
			</nav>
		</div>
	);
};
