const fetchComic = (comicId) => {
	const queryParams = queryParamsToApi()
	const type = params.get("type") ? params.get("type") : "comics"
	const calcOffset = offset - limit === -limit ? 0 : offset - limit
	console.log(comicId);
	return fetch(`${baseUrl}${type}/${comicId}?ts=1&apikey=${apiKey}&hash=${hash}&offset=${calcOffset}&${queryParams}`)
	.then((response) => {
		return response.json()
	})
	.then((rta) => {
		const data = rta.data.results[0]
		console.log(data);
		createComic(data)
	}).catch(() => {
		console.log("Error consumiendo el servicio, intentelo de nuevo");
	})
}

const createComic = (info) => {
	comicList.innerHTML = ""
	params.set("id", info.id)
	console.log("entra");
	const img = document.createElement("img")
	console.log(info.thumbnail.path);
	console.log(info.thumbnail.extension);
	img.setAttribute("src", `${info.thumbnail.path}.${info.thumbnail.extension}`)
	document.body.appendChild(img)
}