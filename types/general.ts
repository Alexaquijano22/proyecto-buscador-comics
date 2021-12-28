const baseUrl: string = "https://gateway.marvel.com:443/v1/public/"

const apiKey: string = "21e9721ecd3caa5524429be6d8c1e57d"
const hash: string = "ec72458ece65a340f304d0411e0fe2a4"

const urlComics: string = `${baseUrl}comics?ts=1&apikey=${apiKey}&hash=${hash}&offset=${0}`
const urlCharacters: string = `${baseUrl}characters?ts=1&apikey=${apiKey}&hash=${hash}`

const params: URLSearchParams = new URLSearchParams(window.location.search)
const page = Number(params.get("page"))

const nextButton = document.getElementById("NextButton")
const backButton = document.getElementById("BackButton")
const comicList = document.getElementById("comicList")
const linkButton = document.getElementById("link")
const firstPageBtn = document.getElementById("firstPageBtn")
const lastPageBtn = document.getElementById("lastPageBtn")
const search = <HTMLInputElement>document.getElementById("search")
const type = <HTMLInputElement>document.getElementById("type")
const orderBy = <HTMLInputElement>document.getElementById("orderBy")
const filterBtn = document.getElementById("filterBtn")
const loadingData = document.getElementById("loading-data")
const containerData = document.getElementById("container-data")
const results = document.getElementById("results")
const contPagination = document.getElementById("pagination")
const cardComicOfCharacter = document.getElementById("cardComicOfCharacter")



let limit = 20
let total = 0
let offset = page * limit

const comicsOrderBy = [
	"A-Z",
	"Z-A",
	"Más nuevo",
	"Más viejo"
]

const charactersOrderBy = [
	"A-Z",
	"Z-A",
]

const createOptions = (type: string) => {
	orderBy.innerHTML = ""
	if (type === "characters") {
		charactersOrderBy.forEach((element: string) => {
			const characterOption = document.createElement("option")
			const optionText = document.createTextNode(element)
			characterOption.setAttribute("value", element)
			characterOption.appendChild(optionText)
			orderBy.appendChild(characterOption)
		})
	} else {
		comicsOrderBy.forEach((element: string) => {
			const comicOption = document.createElement("option")
			const optionText = document.createTextNode(element)
			comicOption.setAttribute("value", element === "Más nuevo" ? "nuevo" : element === "Más viejo" ? "viejo" : element)
			comicOption.appendChild(optionText)
			orderBy.appendChild(comicOption)
		})
	}
}

const consultParams = () => {
	if (params.get("orderBy")) {
		orderBy.value = params.get("orderBy")
	}
	if (params.get("title") || params.get("name")) {
		search.value = params.get("title") || params.get("name")
	}
	if (params.get("type")) {
		type.value = params.get("type")
	}
}


const createTable = (comicsOrCharacter: Comics[] | Characters[], type: string) => {
	containerData.innerHTML = ""
	comicsOrCharacter.map((item) => {
		const items = document.createElement("div")
		const itemsElementText = document.createElement("p")
		const divImg = document.createElement("div")
		const itemsText = document.createTextNode(item.title)
		const itemsImg = document.createElement("img")
		items.classList.add(type == "comics" ? "card" : "card-characters")
		divImg.classList.add(type === "comics" ? "card__contImg" : "card-characters__contImg")
		itemsImg.classList.add(type === "comics" ? "img" : "img-character")
		itemsElementText.classList.add(type == "comics" ? "card__text" : "card-characters__text")
		itemsImg.src = `${item.thumbnail.path}.${item.thumbnail.extension}`
		divImg.appendChild(itemsImg)
		items.appendChild(divImg)
		if(type == "characters"){
			const divTextCharacter = document.createElement("div")
			const nodeCharacterText = document.createTextNode(item.name)
			const contCharacterText = document.createElement("p")
			divTextCharacter.classList.add("card-characters__text")
			contCharacterText.appendChild(nodeCharacterText)
			divTextCharacter.appendChild(contCharacterText)
			items.appendChild(divTextCharacter)
		}else{
			itemsElementText.appendChild(itemsText)
			items.appendChild(itemsElementText)
		}
		containerData.appendChild(items)
		divImg.addEventListener('click', () => {
			window.location.href = "/index.html?" + `id=${item.id}&type=${type}` 
		})
	})
	results.innerHTML = `<h2 style="font-weight: 600;">Resultados</h2>
	<p id="results-parag">${total} Resultados</p>`
	

}

const nextPage = () => {
	if (!page) {
		params.set("page", JSON.stringify(2))
	} else {
		if (page < Math.round(total / limit)) {
			params.set("page", JSON.stringify(page + 1))
		}
	}
	window.location.href = "index.html?" + params

}

const backPage = () => {
	if (page) {
		params.set("page", JSON.stringify(page - 1))
		window.location.href = "index.html?" + params
	}
}

const firstPage = () => {
	params.set("page", JSON.stringify(1))
	window.location.href = "/index.html?" + params
}

const lastPage = () => {
	params.set("page", JSON.stringify(Math.round(total / limit)))
	window.location.href = "/index.html?" + params
}

const filter = () => {
	const paramsObj = {
		titleStartsWith: search.value,
		type: type.value,
		orderBy: orderBy.value,
	}
	offset = 0;
	for (const key of Object.keys(paramsObj)) {
		if (paramsObj[key] === "") {
			delete paramsObj[key];
		}
	}
	const urlApi = generateUrlApi(paramsObj);
	window.location.href = "/index.html?" + urlApi;
}

const defaultOrder = (queryType: string, queryOrder: string) => {
	let orderValue;
	switch (queryType) {
		case "comics":
			if (queryOrder === "Z-A") {
				orderValue = "-title"
			} else if (queryOrder === "nuevo") {
				orderValue = "-focDate"
			} else if (queryOrder === "viejo") {
				orderValue = "focDate"
			} else {
				orderValue = "title"
			}
			break;
		case "characters":
			if (queryOrder === "Z-A") {
				orderValue = "-name"
			} else {
				orderValue = "name"
			}
			break;
	}
	return orderValue

}

const changeDateFormat = (date: string) => {
	return date.split("T")[0]
}

const generateUrlApi = (paramsObj) => {
	const searchParams: URLSearchParams = new URLSearchParams()
	let paramsOfApi = ""
	if(paramsObj.type === "comics"){
		if (paramsObj.titleStartsWith) {
			searchParams.set("title", paramsObj.titleStartsWith)
		}
		searchParams.set("type", paramsObj.type)
		searchParams.set("orderBy", paramsObj.orderBy)
		for (const key of Object.keys(paramsObj)) {
			paramsOfApi = `${paramsOfApi}${key === "title" ? "titleStartsWith" : key}=${paramsObj[key]}&`
		}
	}else{
		if (paramsObj.titleStartsWith) {
			searchParams.set("name", paramsObj.titleStartsWith)
		}
		searchParams.set("type", paramsObj.type)
		searchParams.set("orderBy", paramsObj.orderBy)
		for (const key of Object.keys(paramsObj)) {
			paramsOfApi = `${paramsOfApi}${key === "title" ? "nameStartsWith" : key}=${paramsObj[key]}&`
		}
	}
	return searchParams.toString();
}

const queryParamsToApi = () => {
	let paramsOfApi = ""
	let param;
	if (params.get("orderBy")) {
		if(params.get("name")){
			param = {
				nameStartsWith: params.get("name"),
				orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
			}
		}else{
			param = {
				titleStartsWith: params.get("title"),
				orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
			}
		}
		for (const key of Object.keys(param)) {
			if (param[key]) {
				paramsOfApi = `${paramsOfApi}${key}=${param[key]}&`
			}
		}
	} else {
		paramsOfApi = `${params.get("type") == "characters" ? "orderBy=name" : "orderBy=title"}`
	}
	return paramsOfApi
}


const fetchData = (id: string) => {
	const queryParams = queryParamsToApi()
	const type = params.get("type") ? params.get("type") : "comics"
	const calcOffset = offset - limit === -limit ? 0 : offset - limit
	const infoId = id ? `/${id}`: ""
	createLoader(true);
	return fetch(`${baseUrl}${type}${infoId}?ts=1&apikey=${apiKey}&hash=${hash}&offset=${calcOffset}&${queryParams}`)
		.then((response) => {
			return response.json()
		})
		.then((rta) => {
			createLoader(false);
			if(infoId){
				const data = rta.data.results[0]
				createCardOfType(data, type)
				contPagination.innerHTML = ""
			}else{
				const comics = rta.data.results
				limit = rta.data.limit
				total = rta.data.total
				createTable(comics, type)
			}
		}).catch(() => {
			window.alert("Ha ocurrido un error con el servicio, intentalo mas tarde")
		})
}

const createLoader = (toCreate: boolean) => {
	if (toCreate) {
		loadingData.innerHTML = "";
		const item = document.createElement("div");
		item.classList.add("loader__container")
		item.innerHTML = `<div class="loader"></div> <label>Cargando...</label>`;
		loadingData.appendChild(item)
	} else {
		loadingData.innerHTML = "";
	}
}

const init = async () => {
	if(params.get("id")){
		await fetchData(params.get("id"))
	}else{
		await fetchData("")
	}
	createOptions(params.get("type"))
	consultParams()
	disableBtns()
}

const disableBtns = () => {
	if (!page || page === 1) {
		backButton.setAttribute("disabled", "true")
		firstPageBtn.setAttribute("disabled", "true")
	}
	if (page == Math.round(total / limit)) {
		nextButton.setAttribute("disabled", "true")
		lastPageBtn.setAttribute("disabled", "true")
	}
}


backButton.addEventListener('click', backPage)
nextButton.addEventListener('click', nextPage)
firstPageBtn.addEventListener('click', firstPage)
lastPageBtn.addEventListener('click', lastPage)
filterBtn.addEventListener('click', filter)
type.addEventListener('change', () => {
	createOptions(type.value)
})


init()

