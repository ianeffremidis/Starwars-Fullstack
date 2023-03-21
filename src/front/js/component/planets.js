import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

const Planets = () => {
    const {store, actions} = useContext(Context);
    const mapFav = store.favorites.map(item=>item.name)
    const imageFromSw = "https://starwars-visualguide.com/assets/img/planets/"
    const placeholderImage ='https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fau%2Fsearch%3Fk%3Dtomato&psig=AOvVaw33uIHLPXfXI-fzXl3KZkyF&ust=1676757938716000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOChkJ3Inf0CFQAAAAAdAAAAABAD'

    return(
        <div className="row d-flex flex-column" style={{height: "28rem", overflowX:"auto"}}>
            {store.planets.map((value, i) => ( 
        <div key={i} className="card p-0 m-3" style={{width: '15rem'}}>
        
        <ReactImageFallback
                    src={imageFromSw + value.uid + ".jpg"}
                    fallbackImage="https://png.pngitem.com/pimgs/s/170-1707876_panda-rounded-face-svg-clip-arts-funny-cartoon.png"
                    initialImage=""
                    alt="cool image should be here"
                    className="card-img-top"/>
        <div className="card-body">
        <h5 className="card-title">{value.name}</h5>
     
        <div className="d-flex justify-content-between">
					<Link to={`/planetDetails/${value.uid}`}>
						<button href="#" className="btn btn-outline-dark">
                            Learn more!
						</button>
					</Link>
        <button key={i} type="button" className="btn btn-outline-danger" onClick={() => actions.addFavorites(value.name, value.uid, "planet")}>
        {mapFav.includes(value.name) ? <i key={i} className="fa-solid fa fa-heart"></i> : <i key={i} className="far fa-heart"></i>}
        </button>
				</div>
        </div>
        </div>
        
        ))}
        </div>
    )
};

export default Planets;