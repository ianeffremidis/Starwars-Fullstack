import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

const PlanetsDetails = () => {
    const {store, actions} = useContext(Context);
    const {id} = useParams();
    const imageFromSw = "https://starwars-visualguide.com/assets/img/planets/"
    
    useEffect(() => {
        console.log(id);
        actions.getSinglePlanet(id);
      }, []);

    if (store.singlePlanet) {
        return (

            <div className="container">
                <div className="w-100 mt-4">
                    <h1 className="text-dark">{store.singlePlanet.properties.name}</h1>
                 </div>
                <div className="card mb-3" style={{maxwidth: "540px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                           
                            <ReactImageFallback
                                src={imageFromSw + + id + ".jpg"}
                                fallbackImage="https://png.pngitem.com/pimgs/s/170-1707876_panda-rounded-face-svg-clip-arts-funny-cartoon.png"
                                initialImage=""
                                alt="cool image should be here"
                                className="img-fluid rounded-start"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title text-dark fs-1"></h1>
                                <p className="card-text text-dark fs-5"><strong>Diameter: </strong>{store.singlePlanet.properties.diameter}</p>
                                <p className="text-dark fs-5"><strong>Rotation period: </strong>{store.singlePlanet.properties.rotation_period}</p>
                                <p className="text-dark fs-5"><strong>Orbital period: </strong>{store.singlePlanet.properties.orbital_period}</p>
                                <p className="text-dark fs-5"><strong>Gravity: </strong>{store.singlePlanet.properties.gravity}</p>
                                <p className="text-dark fs-5"><strong>Population: </strong>{store.singlePlanet.properties.population}</p>
                                <p className="text-dark fs-5"><strong>Climate: </strong>{store.singlePlanet.properties.climate}</p>
                                <p className="text-dark fs-5"><strong>Terrain: </strong>{store.singlePlanet.properties.terrain}</p>
                                <p className="text-dark fs-5"><strong>Surface Water: </strong>{store.singlePlanet.properties.surface_water}</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
            )} 
        else {
        return <div className="text-center mt-5">Loading please wait...</div>;
      }
}

export default PlanetsDetails;