const createCardOfType = (info: Comics & Characters, type: string) => {
	containerData.innerHTML = ""
	params.set("id", info.id)
	if(type === "comics"){
		createComicCard(info)
	}else{
		createCharacterCard(info)
	}
	results.innerHTML = "";
}

const fetchInfo = (info) => {
	const queryParams = queryParamsToApi()
	const type = params.get("type") ? params.get("type") : "comics"
	const calcOffset = offset - limit === -limit ? 0 : offset - limit
	const infoId = info.id ? `/${info.id}`: ""
	createLoader(true);
	return fetch(`${baseUrl}${type}${infoId}/${type == "characters" ? "comics" : "characters"}?ts=1&apikey=${apiKey}&hash=${hash}`)
		.then((response) => {
			return response.json()
		})
		.then((rta) => {
			createLoader(false);
			contPagination.innerHTML = ""
			return  rta.data.results
		})
}

const createComicCard = async (info) => {
	const dataOfCharacters = await fetchInfo(info)
	let listCreators = ""
	const creators = info.creators.items.map((item) => {
		if (listCreators === "") {
			listCreators = item.name
		} else {
			listCreators = listCreators + ", " + `${item.name}`
		}
	})
	containerData.innerHTML = `
	<div class="flex-column cardDescription">
		<div class="cardDescription__title">
			<div class="flex" style="justify-content:center; align-items:flex-start;">
				<img class="cardDescription__img" src="${info.thumbnail.path}.${info.thumbnail.extension}"/>
			</div>
			<div class="flex-column cardDescription__contInfo">
				<h2 style="font-weight: 700; margin-bottom:10px;">${info.title}</h2>
				<div class="flex-column cardDescription__info">
					<h3>Publicado: </h3>
					<label class="cardDescription__text">${changeDateFormat(info.dates[0].date)}</label>
				</div>
				${listCreators ? `<div class="flex-column cardDescription__info" >
				<h3>Guionistas: </h3>
				<label class="cardDescription__text">${listCreators}</label>
				</div>` : ""}
				${info.description ? `<div class="flex-column cardDescription__info">
				<h3>Descripción: </h3>
				<label class="cardDescription__text">${info.description}</label>
				</div>` : ""}
			</div>
		</div>
		<div>
			<h2 style="font-weight: 700;">Personajes</h2>
			<p class="margin-bottom: 0.5em;">${dataOfCharacters.length} ${dataOfCharacters.length == 0 || dataOfCharacters.length != 1 ? "Resultados" : "Resultado"}</p>
			<div class="container-cards" style="justify-content:flex-start">
				${dataOfCharacters.length > 0 ?
					dataOfCharacters.map((character) => {
						return `<div class="card-characters"  onclick="window.location.href= '/index.html?id=${character.id}&type=characters'">
							<div class="card-characters__contImg">
								<img class="img-character" src="${character.thumbnail.path}.${character.thumbnail.extension}">
							</div>
							<p class="card-characters__text">${character.name}</p>
						</div>`
					}).join('')
				: ""}
			</div>
		</div>
	</div>`
}



const createCharacterCard = async (info: Comics & Characters) => {
	const dataOfComics = await fetchInfo(info)
	containerData.innerHTML = `
	<div class="flex-column cardDescription">
		<div class="cardDescription__title" style="margin-bottom:2em;">
			<div class="flex" style="justify-content:center;">
				<img class="cardDescription__img" src="${info.thumbnail.path}.${info.thumbnail.extension}"/>
			</div>
			<div class="flex-column cardDescription__contInfo">
				<h2 style="font-weight: 700; margin-bottom:10px;">${info.name}</h2>
				<h3>Descripción: </h3>
				<label class="cardDescription__text">${info.description}</label>
			</div>
			
			</div>
			<h2 style="font-weight: 700;">Comics: </h2>
			<p>${dataOfComics.length} ${dataOfComics.length == 0 || dataOfComics.length != 1 ? "Resultados" : "Resultado"}</p>
			<div class="container-cards" style="justify-content:flex-start; gap: 26px 0px;">
				${dataOfComics.length > 0 ?
					dataOfComics.map((comic) => {
						return `<div id="cardComicOfCharacter" class="card" onclick="window.location.href= '/index.html?id=${comic.id}&type=comics'">
							<div class="card__contImg">
								<img class="img" src="${comic.thumbnail.path}.${comic.thumbnail.extension}">
							</div>
							<p class="card__text">${comic.title}</p>
						</div>`
					}).join('')
				: ""}
			</div>
		</div>
	</div>`
}
