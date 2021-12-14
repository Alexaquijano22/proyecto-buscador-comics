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
const search = <HTMLInputElement>document.getElementById("search");
const type = <HTMLInputElement>document.getElementById("type")
const orderBy = <HTMLInputElement>document.getElementById("orderBy")
const filterBtn = document.getElementById("filterBtn")


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

const createOptions = (type) => {
	orderBy.innerHTML = ""
	if (type === "comics") {
		comicsOrderBy.forEach(element => {
			const comicOption = document.createElement("option")
			const optionText = document.createTextNode(element)
			comicOption.setAttribute("value", element === "Más nuevo" ? "nuevo" : element === "Más viejo" ? "viejo" : element)
			comicOption.appendChild(optionText);
			orderBy.appendChild(comicOption)

		})
	} else {
		charactersOrderBy.forEach(element => {
			const characterOption = document.createElement("option")
			const optionText = document.createTextNode(element)
			characterOption.appendChild(optionText);
			orderBy.appendChild(characterOption)

		})
	}
}

const consultParams = () => {
	if (params.get("orderBy")) {
		orderBy.value = params.get("orderBy")
	}
	if (params.get("title")) {
		search.value = params.get("title")
	}
	if (params.get("type")) {
		type.value = params.get("type")
	}
}


const createTable = (comics) => {
	comicList.innerHTML = ""
	document.body.appendChild(comicList)
	comics.forEach((item, i) => {
		const Items = document.createElement("li")
		const itemsText = document.createTextNode(item.title)
		const itemsImg = document.createElement("img")
		itemsImg.setAttribute("width", "100px")
		const itemsDiv = document.createElement("div")
		itemsImg.src = `${item.thumbnail.path}.${item.thumbnail.extension}`
		itemsDiv.appendChild(itemsText)
		itemsDiv.appendChild(itemsImg)
		itemsDiv.addEventListener('click', () => {
			fetchComic(item.id)
		})
		Items.appendChild(itemsDiv)
		comicList.appendChild(Items)
	})

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

const defaultOrder = (queryType, queryOrder) => {
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

const generateUrlApi = (paramsObj) => {
	const searchParams: URLSearchParams = new URLSearchParams()
	let paramsOfApi = ""
	if (paramsObj.titleStartsWith) {
		searchParams.set("title", paramsObj.titleStartsWith)
	}
	searchParams.set("type", paramsObj.type)
	searchParams.set("orderBy", paramsObj.orderBy)
	for (const key of Object.keys(paramsObj)) {
		paramsOfApi = `${paramsOfApi}${key === "title" ? "titleStartsWith" : key}=${paramsObj[key]}&`
	}
	return searchParams.toString();
}

const queryParamsToApi = () => {
	let paramsOfApi = ""
	if(params.get("orderBy")){
		const param = {
			titleStartsWith: params.get("title"),
			orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
		}
		for (const key of Object.keys(param)) {
			if(param[key]){
				paramsOfApi = `${paramsOfApi}${key === "title" ? "titleStartsWith" : key}=${param[key]}&`
			}
		}
	}else{
		paramsOfApi = `orderBy=title`
	}
	return paramsOfApi
}


const fetchData = () => {
	const queryParams = queryParamsToApi()
	const type = params.get("type") ? params.get("type") : "comics"
	const calcOffset = offset - limit === -limit ? 0 : offset - limit
	return fetch(`${baseUrl}${type}?ts=1&apikey=${apiKey}&hash=${hash}&offset=${calcOffset}&${queryParams}`)
		.then((response) => {
			return response.json()
		})
		.then((rta) => {
			const comics = rta.data.results
			limit = rta.data.limit
			total = rta.data.total
			createTable(comics)

		})
}

const init = async () => {
	await fetchData()
	disableBtns()
	createOptions(type.value)
	consultParams()
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
type.addEventListener('change', (e) => {
	createOptions(e.target.value)
})


init()

