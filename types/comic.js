var fetchComic = function (comicId) {
    var queryParams = queryParamsToApi();
    var type = params.get("type") ? params.get("type") : "comics";
    var calcOffset = offset - limit === -limit ? 0 : offset - limit;
    console.log(comicId);
    return fetch("" + baseUrl + type + "/" + comicId + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + calcOffset + "&" + queryParams)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var data = rta.data.results[0];
        console.log(data);
        createComic(data);
    });
};
var createComic = function (info) {
    comicList.innerHTML = "";
    params.set("id", info.id);
    console.log("entra");
    var img = document.createElement("img");
    console.log(info.thumbnail.path);
    console.log(info.thumbnail.extension);
    img.setAttribute("src", info.thumbnail.path + "." + info.thumbnail.extension);
    document.body.appendChild(img);
};
