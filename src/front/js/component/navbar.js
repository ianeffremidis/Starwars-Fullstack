import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	

	return (
		<div className="sticky-top">
			<nav className="navbar navbar-light bg-light mb-3">
				<Link to="/">
					<img src="https://logodix.com/logo/581257.gif" alt="Star Wars" height="70" className="d-inline-block  ms-5"></img>
				</Link>

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

								
								<button className="btn btn-outline-dark border-0 btn-sm" > <i className="fa-solid fa fa-trash" onClick={()=> actions.deleteFavorites(i)}></i></ button>
								</a>
							</li>
							)
						})
						}
					</ul>
				</div>
			</nav>
		</div>
	);
};
