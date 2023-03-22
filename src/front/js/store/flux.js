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
			token:null,
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
				  fetch("https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/all_characters", opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					   console.log(data, "fetch people")
					   setStore({people: data})
					})
					.catch((error) => {
					  console.error("There was an error fetching people", error);			
					});
			},

			getPlanets: () => {
				try {
					return fetch("https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/all_planets", {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ planets: data}));
				} catch (error) {
					return [];
				}
			},

			getVehicles: () => {
				try {
					return fetch("https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/all_vehicles", {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ vehicles: data}));
				} catch (error) {
					return [];
				}
			},

			getPerson: id => {
				try {
					return fetch(`https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/character/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => 
							setStore({ person: data}));
				} catch (error) {
					return [];
				}
			},

			getSinglePlanet: (id) => {
				try {
					return fetch(`https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/planet/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ singlePlanet: data}));
				} catch (error) {
					return [];
				}
			},

			getSingleVehicle: (id) => {
				try {
					return fetch(`https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/vehicle/${id}`, {
						method: "GET",
						redirect: "follow"
					})
						.then(resp => resp.json())
						.then(data => setStore({ singleVehicle: data}));
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

			logIn: (email, password) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json"
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				};
				fetch("https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/login", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
				  })
				  .catch((error) => {
					console.error("There was an error", error);
					
				  });
			  },
			  syncTokenFromLocal: () =>{
				const token = sessionStorage.getItem("token")
				if (token && token!="" && token != undefined){
					setStore({ token: token})
					console.log("token updated from session storage")
				} 
			},
			logout: () =>{
				sessionStorage.removeItem("token")
				setStore({ token: null})
				console.log("logged out")
				 
			},

			registerUser: (name, last_name, email, password, phone) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json",
				  },
				  body: JSON.stringify({
					name: name,
					last_name: last_name,
					email: email,
					password: password,
					phone: phone
				  }),
				};
				fetch("https://3001-ianeffremid-starwarsful-wj9idm3y5l9.ws-eu90.gitpod.io/api/register", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					console.log(data)
				  })
				  .catch((error) => {
					console.error("There was an error", error);
				  });
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
