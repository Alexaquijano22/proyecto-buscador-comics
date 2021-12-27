var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "21e9721ecd3caa5524429be6d8c1e57d";
var hash = "ec72458ece65a340f304d0411e0fe2a4";
var urlComics = baseUrl + "comics?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + 0;
var urlCharacters = baseUrl + "characters?ts=1&apikey=" + apiKey + "&hash=" + hash;
var params = new URLSearchParams(window.location.search);
var page = Number(params.get("page"));
var nextButton = document.getElementById("NextButton");
var backButton = document.getElementById("BackButton");
var comicList = document.getElementById("comicList");
var linkButton = document.getElementById("link");
var firstPageBtn = document.getElementById("firstPageBtn");
var lastPageBtn = document.getElementById("lastPageBtn");
var search = document.getElementById("search");
var type = document.getElementById("type");
var orderBy = document.getElementById("orderBy");
var filterBtn = document.getElementById("filterBtn");
var loadingData = document.getElementById("loading-data");
var containerData = document.getElementById("container-data");
var results = document.getElementById("results");
var contPagination = document.getElementById("pagination");
var cardComicOfCharacter = document.getElementById("cardComicOfCharacter");
var limit = 20;
var total = 0;
var offset = page * limit;
var comicsOrderBy = [
    "A-Z",
    "Z-A",
    "Más nuevo",
    "Más viejo"
];
var charactersOrderBy = [
    "A-Z",
    "Z-A",
];
var createOptions = function (type) {
    orderBy.innerHTML = "";
    if (type === "characters") {
        charactersOrderBy.forEach(function (element) {
            var characterOption = document.createElement("option");
            var optionText = document.createTextNode(element);
            characterOption.setAttribute("value", element);
            characterOption.appendChild(optionText);
            orderBy.appendChild(characterOption);
        });
    }
    else {
        comicsOrderBy.forEach(function (element) {
            var comicOption = document.createElement("option");
            var optionText = document.createTextNode(element);
            comicOption.setAttribute("value", element === "Más nuevo" ? "nuevo" : element === "Más viejo" ? "viejo" : element);
            comicOption.appendChild(optionText);
            orderBy.appendChild(comicOption);
        });
    }
};
var consultParams = function () {
    if (params.get("orderBy")) {
        orderBy.value = params.get("orderBy");
    }
    if (params.get("title") || params.get("name")) {
        search.value = params.get("title") || params.get("name");
    }
    if (params.get("type")) {
        type.value = params.get("type");
    }
};
var createTable = function (comicsOrCharacter, type) {
    containerData.innerHTML = "";
    comicsOrCharacter.map(function (item) {
        var items = document.createElement("div");
        var itemsElementText = document.createElement("p");
        var divImg = document.createElement("div");
        var itemsText = document.createTextNode(item.title);
        var itemsImg = document.createElement("img");
        items.classList.add(type == "comics" ? "card" : "card-characters");
        divImg.classList.add(type === "comics" ? "card__contImg" : "card-characters__contImg");
        itemsImg.classList.add(type === "comics" ? "img" : "img-character");
        itemsElementText.classList.add(type == "comics" ? "card__text" : "card-characters__text");
        itemsImg.src = item.thumbnail.path + "." + item.thumbnail.extension;
        divImg.appendChild(itemsImg);
        items.appendChild(divImg);
        if (type == "characters") {
            var divTextCharacter = document.createElement("div");
            var nodeCharacterText = document.createTextNode(item.name);
            var contCharacterText = document.createElement("p");
            divTextCharacter.classList.add("card-characters__text");
            contCharacterText.appendChild(nodeCharacterText);
            divTextCharacter.appendChild(contCharacterText);
            items.appendChild(divTextCharacter);
        }
        else {
            itemsElementText.appendChild(itemsText);
            items.appendChild(itemsElementText);
        }
        containerData.appendChild(items);
        divImg.addEventListener('click', function () {
            window.location.href = "/index.html?" + ("id=" + item.id + "&type=" + type);
        });
    });
    results.innerHTML = "<h2 style=\"font-weight: 600;\">Resultados</h2>\n\t<p id=\"results-parag\">" + total + " Resultados</p>";
};
var nextPage = function () {
    if (!page) {
        params.set("page", JSON.stringify(2));
    }
    else {
        if (page < Math.round(total / limit)) {
            params.set("page", JSON.stringify(page + 1));
        }
    }
    window.location.href = "index.html?" + params;
};
var backPage = function () {
    if (page) {
        params.set("page", JSON.stringify(page - 1));
        window.location.href = "index.html?" + params;
    }
};
var firstPage = function () {
    params.set("page", JSON.stringify(1));
    window.location.href = "/index.html?" + params;
};
var lastPage = function () {
    params.set("page", JSON.stringify(Math.round(total / limit)));
    window.location.href = "/index.html?" + params;
};
var filter = function () {
    var paramsObj = {
        titleStartsWith: search.value,
        type: type.value,
        orderBy: orderBy.value
    };
    offset = 0;
    for (var _i = 0, _a = Object.keys(paramsObj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (paramsObj[key] === "") {
            delete paramsObj[key];
        }
    }
    var urlApi = generateUrlApi(paramsObj);
    window.location.href = "/index.html?" + urlApi;
};
var defaultOrder = function (queryType, queryOrder) {
    var orderValue;
    switch (queryType) {
        case "comics":
            if (queryOrder === "Z-A") {
                orderValue = "-title";
            }
            else if (queryOrder === "nuevo") {
                orderValue = "-focDate";
            }
            else if (queryOrder === "viejo") {
                orderValue = "focDate";
            }
            else {
                orderValue = "title";
            }
            break;
        case "characters":
            if (queryOrder === "Z-A") {
                orderValue = "-name";
            }
            else {
                orderValue = "name";
            }
            break;
    }
    return orderValue;
};
var changeDateFormat = function (date) {
    return date.split("T")[0];
};
var generateUrlApi = function (paramsObj) {
    var searchParams = new URLSearchParams();
    var paramsOfApi = "";
    if (paramsObj.type === "comics") {
        if (paramsObj.titleStartsWith) {
            searchParams.set("title", paramsObj.titleStartsWith);
        }
        searchParams.set("type", paramsObj.type);
        searchParams.set("orderBy", paramsObj.orderBy);
        for (var _i = 0, _a = Object.keys(paramsObj); _i < _a.length; _i++) {
            var key = _a[_i];
            paramsOfApi = "" + paramsOfApi + (key === "title" ? "titleStartsWith" : key) + "=" + paramsObj[key] + "&";
        }
    }
    else {
        if (paramsObj.titleStartsWith) {
            searchParams.set("name", paramsObj.titleStartsWith);
        }
        searchParams.set("type", paramsObj.type);
        searchParams.set("orderBy", paramsObj.orderBy);
        for (var _b = 0, _c = Object.keys(paramsObj); _b < _c.length; _b++) {
            var key = _c[_b];
            paramsOfApi = "" + paramsOfApi + (key === "title" ? "nameStartsWith" : key) + "=" + paramsObj[key] + "&";
        }
    }
    return searchParams.toString();
};
var queryParamsToApi = function () {
    var paramsOfApi = "";
    var param;
    if (params.get("orderBy")) {
        if (params.get("name")) {
            param = {
                nameStartsWith: params.get("name"),
                orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
            };
        }
        else {
            param = {
                titleStartsWith: params.get("title"),
                orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
            };
        }
        for (var _i = 0, _a = Object.keys(param); _i < _a.length; _i++) {
            var key = _a[_i];
            if (param[key]) {
                paramsOfApi = "" + paramsOfApi + key + "=" + param[key] + "&";
            }
        }
    }
    else {
        paramsOfApi = "" + (params.get("type") == "characters" ? "orderBy=name" : "orderBy=title");
    }
    return paramsOfApi;
};
var fetchData = function (id) {
    var queryParams = queryParamsToApi();
    var type = params.get("type") ? params.get("type") : "comics";
    var calcOffset = offset - limit === -limit ? 0 : offset - limit;
    var infoId = id ? "/" + id : "";
    createLoader(true);
    return fetch("" + baseUrl + type + infoId + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + calcOffset + "&" + queryParams)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        createLoader(false);
        if (infoId) {
            var data = rta.data.results[0];
            createCardOfType(data, type);
            contPagination.innerHTML = "";
        }
        else {
            var comics = rta.data.results;
            limit = rta.data.limit;
            total = rta.data.total;
            createTable(comics, type);
        }
    });
};
var createLoader = function (toCreate) {
    if (toCreate) {
        loadingData.innerHTML = "";
        var item = document.createElement("div");
        item.classList.add("loader__container");
        item.innerHTML = "<div class=\"loader\"></div> <label>Cargando...</label>";
        loadingData.appendChild(item);
    }
    else {
        loadingData.innerHTML = "";
    }
};
var init = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!params.get("id")) return [3 /*break*/, 2];
                return [4 /*yield*/, fetchData(params.get("id"))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, fetchData("")];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                createOptions(params.get("type"));
                consultParams();
                disableBtns();
                return [2 /*return*/];
        }
    });
}); };
var disableBtns = function () {
    if (!page || page === 1) {
        backButton.setAttribute("disabled", "true");
        firstPageBtn.setAttribute("disabled", "true");
    }
    if (page == Math.round(total / limit)) {
        nextButton.setAttribute("disabled", "true");
        lastPageBtn.setAttribute("disabled", "true");
    }
};
backButton.addEventListener('click', backPage);
nextButton.addEventListener('click', nextPage);
firstPageBtn.addEventListener('click', firstPage);
lastPageBtn.addEventListener('click', lastPage);
filterBtn.addEventListener('click', filter);
type.addEventListener('change', function () {
    createOptions(type.value);
});
init();
