import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";


const Vehicles = () => {
    const {store, actions} = useContext(Context);
    const mapFav = store.favorites.map(item=>item.name)
    const imageFromSw = "https://starwars-visualguide.com/assets/img/vehicles/"
    return(
        <div className="row d-flex flex-column" style={{height: "28rem", overflowX:"auto"}}>
            {store.vehicles.map((value, i) => ( 
        <div key={i} className="card p-0 m-3" style={{width: '15rem'}}>
            <ReactImageFallback
                    src={imageFromSw + value.uid + ".jpg"}
                    fallbackImage="https://media.istockphoto.com/id/1152232977/photo/crashed-car-in-front-side-car-insurance-concept.jpg?s=612x612&w=0&k=20&c=Oyz_YgXOoK4Ayd7N7IuSgBCXFfSTgyyNAkhGTeZq3Uo="
                    initialImage=""
                    alt="cool image should be here"
                    className="card-img-top"/>
        <div className="card-body">
        <h5 className="card-title">{value.name}</h5>
       
        <div className="d-flex justify-content-between">
					<Link to={`/vehicledetails/${value.uid}`}>
						<button href="#" className="btn btn-outline-dark" >
                            Learn more!
						</button>
					</Link>
        <button key={i} type="button" className="btn btn-outline-danger" onClick={() => actions.addFavorites(value.name, value.uid, "vehicle")}>
        {mapFav.includes(value.name) ? <i key={i} className="fa-solid fa fa-heart"></i> : <i key={i} className="far fa-heart"></i>}
        </button>
				</div>
        </div>
        </div>
        
        ))}
        </div>
    )
};

export default Vehicles