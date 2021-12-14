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
    if (type === "comics") {
        comicsOrderBy.forEach(function (element) {
            var comicOption = document.createElement("option");
            var optionText = document.createTextNode(element);
            comicOption.setAttribute("value", element === "Más nuevo" ? "nuevo" : element === "Más viejo" ? "viejo" : element);
            comicOption.appendChild(optionText);
            orderBy.appendChild(comicOption);
        });
    }
    else {
        charactersOrderBy.forEach(function (element) {
            var characterOption = document.createElement("option");
            var optionText = document.createTextNode(element);
            characterOption.appendChild(optionText);
            orderBy.appendChild(characterOption);
        });
    }
};
var consultParams = function () {
    if (params.get("orderBy")) {
        orderBy.value = params.get("orderBy");
    }
    if (params.get("title")) {
        search.value = params.get("title");
    }
    if (params.get("type")) {
        type.value = params.get("type");
    }
};
var createTable = function (comics) {
    comicList.innerHTML = "";
    document.body.appendChild(comicList);
    comics.forEach(function (item, i) {
        var Items = document.createElement("li");
        var itemsText = document.createTextNode(item.title);
        var itemsImg = document.createElement("img");
        itemsImg.setAttribute("width", "100px");
        var itemsDiv = document.createElement("div");
        itemsImg.src = item.thumbnail.path + "." + item.thumbnail.extension;
        itemsDiv.appendChild(itemsText);
        itemsDiv.appendChild(itemsImg);
        itemsDiv.addEventListener('click', function () {
            fetchComic(item.id);
        });
        Items.appendChild(itemsDiv);
        comicList.appendChild(Items);
    });
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
var generateUrlApi = function (paramsObj) {
    var searchParams = new URLSearchParams();
    var paramsOfApi = "";
    if (paramsObj.titleStartsWith) {
        searchParams.set("title", paramsObj.titleStartsWith);
    }
    searchParams.set("type", paramsObj.type);
    searchParams.set("orderBy", paramsObj.orderBy);
    for (var _i = 0, _a = Object.keys(paramsObj); _i < _a.length; _i++) {
        var key = _a[_i];
        paramsOfApi = "" + paramsOfApi + (key === "title" ? "titleStartsWith" : key) + "=" + paramsObj[key] + "&";
    }
    return searchParams.toString();
};
var queryParamsToApi = function () {
    var paramsOfApi = "";
    if (params.get("orderBy")) {
        var param = {
            titleStartsWith: params.get("title"),
            orderBy: defaultOrder(params.get("type"), params.get("orderBy"))
        };
        for (var _i = 0, _a = Object.keys(param); _i < _a.length; _i++) {
            var key = _a[_i];
            if (param[key]) {
                paramsOfApi = "" + paramsOfApi + (key === "title" ? "titleStartsWith" : key) + "=" + param[key] + "&";
            }
        }
    }
    else {
        paramsOfApi = "orderBy=title";
    }
    return paramsOfApi;
};
var fetchData = function () {
    var queryParams = queryParamsToApi();
    var type = params.get("type") ? params.get("type") : "comics";
    var calcOffset = offset - limit === -limit ? 0 : offset - limit;
    return fetch("" + baseUrl + type + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + calcOffset + "&" + queryParams)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var comics = rta.data.results;
        limit = rta.data.limit;
        total = rta.data.total;
        createTable(comics);
    });
};
var init = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData()];
            case 1:
                _a.sent();
                disableBtns();
                createOptions(type.value);
                consultParams();
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
type.addEventListener('change', function (e) {
    createOptions(e.target.value);
});
init();
