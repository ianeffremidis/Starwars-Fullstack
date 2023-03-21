import { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			vehicles: [],
			person: null,
			singlePlanet: null,
			singleVehicle: null,
			favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			getPeople: () =>{
				const opts = {
					method: "GET",
					headers: {
					  "Content-Type": "application/json"
					}	
				  };
				  fetch("https://www.swapi.tech/api/people?page=1&limit=100", opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					   console.log(data, "fetch people")
					   setStore({people: data.results})
					})
					.catch((error) => {
					  console.error("There was an error fetching people", error);			
					});
			},

			getPlanets: () => {
				try {
					return fetch("https://www.swapi.tech/api/planets?page=1&limit=100", {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ planets: data.results}));
				} catch (error) {
					return [];
				}
			},

			getVehicles: () => {
				try {
					return fetch("https://www.swapi.tech/api/vehicles?page=1&limit=100", {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ vehicles: data.results}));
				} catch (error) {
					return [];
				}
			},

			getPerson: id => {
				try {
					return fetch(`https://www.swapi.tech/api/people/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => 
							setStore({ person: data.result}));
				} catch (error) {
					return [];
				}
			},

			getSinglePlanet: (id) => {
				try {
					return fetch(`https://www.swapi.tech/api/planets/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ singlePlanet: data.result}));
				} catch (error) {
					return [];
				}
			},

			getSingleVehicle: (id) => {
				try {
					return fetch(`https://www.swapi.tech/api/vehicles/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ singleVehicle: data.result}));
				} catch (error) {
					return [];
				}
			},
			addFavorites: (itemName, itemUid, type) => {

				const {favorites} = getStore();
				
				function removeObjectWithId(arr, nam){
					const filterFav = arr.filter((obj) => obj.name !== nam)
						return setStore({favorites: filterFav})
					}  
				const mapFav = favorites.map(item=>item.name)
				
				if (!mapFav.find(i => i == itemName )){
					favorites.push({name: itemName, id: itemUid, type: type })
					console.log("not on the list, added")
				}
				else{
					console.log("on the list, removed")
					return removeObjectWithId(favorites, itemName)
				}
				
				console.log(favorites, "final favorites")
				setStore({favorites: favorites})
				// getActions().changeColor(0, "green");

			}, 

			deleteFavorites: itemIndex => {
				const {favorites} = getStore();
				const newFav = [...favorites]
				newFav.splice(itemIndex,1)
				setStore({favorites: newFav})
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
