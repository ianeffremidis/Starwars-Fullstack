import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";


const Characters = () => {
    const {store, actions} = useContext(Context);
    const mapFav = store.favorites.map(item=>item.name)
    const imageFromSw = "https://starwars-visualguide.com/assets/img/characters/"

    return(
        <div className="row d-flex flex-column" style={{height: "30rem", overflowX:"auto"}}>
          {store.people.map((value, i) => ( 
                <div key={i} className="card p-0 m-3" style={{width: '15rem'}}>
                    <ReactImageFallback
                    src={imageFromSw + value.uid + ".jpg"}
                    fallbackImage="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStick_figure&psig=AOvVaw2hYo5zYGFbOpZArIzVA5E-&ust=1676804849870000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDQnf72nv0CFQAAAAAdAAAAABAa"
                    initialImage=""
                    alt="cool image should be here"
                    className="card-img-topi"/>

                        <div className="card-body">
                            <h5 className="card-title">{value.name}</h5>
                                <div className="d-flex justify-content-between">
                                <Link to={`/charDetails/${value.uid}`}>
						                    <button href="#" className="btn btn-outline-dark">
							                Learn more!
						                 </button>
					                </Link>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => actions.addFavorites(value.name, value.uid, "character")} >
                                    
                                    {mapFav.includes(value.name) ? <i key={i} className="fa-solid fa fa-heart"></i> : <i key={i} className="far fa-heart"></i>}
                                    </button>
				                </div>
                        </div>
                </div>
        
            ))}
        </div>
    )
};

export default Characters;