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
var createCardOfType = function (info, type) {
    containerData.innerHTML = "";
    params.set("id", info.id);
    if (type === "comics") {
        createComicCard(info);
    }
    else {
        createCharacterCard(info);
    }
    results.innerHTML = "";
};
var fetchInfo = function (info) {
    var queryParams = queryParamsToApi();
    var type = params.get("type") ? params.get("type") : "comics";
    var calcOffset = offset - limit === -limit ? 0 : offset - limit;
    var infoId = info.id ? "/" + info.id : "";
    createLoader(true);
    return fetch("" + baseUrl + type + infoId + "/" + (type == "characters" ? "comics" : "characters") + "?ts=1&apikey=" + apiKey + "&hash=" + hash)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        createLoader(false);
        contPagination.innerHTML = "";
        return rta.data.results;
    });
};
var createComicCard = function (info) { return __awaiter(_this, void 0, void 0, function () {
    var dataOfCharacters, listCreators, creators;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchInfo(info)];
            case 1:
                dataOfCharacters = _a.sent();
                listCreators = "";
                creators = info.creators.items.map(function (item) {
                    if (listCreators === "") {
                        listCreators = item.name;
                    }
                    else {
                        listCreators = listCreators + ", " + ("" + item.name);
                    }
                });
                containerData.innerHTML = "\n\t<div class=\"flex-column cardDescription\">\n\t\t<div class=\"cardDescription__title\">\n\t\t\t<div class=\"flex\" style=\"justify-content:center; align-items:flex-start;\">\n\t\t\t\t<img class=\"cardDescription__img\" src=\"" + info.thumbnail.path + "." + info.thumbnail.extension + "\"/>\n\t\t\t</div>\n\t\t\t<div class=\"flex-column cardDescription__contInfo\">\n\t\t\t\t<h2 style=\"font-weight: 700; margin-bottom:10px;\">" + info.title + "</h2>\n\t\t\t\t<div class=\"flex-column cardDescription__info\">\n\t\t\t\t\t<h3>Publicado: </h3>\n\t\t\t\t\t<label class=\"cardDescription__text\">" + changeDateFormat(info.dates[0].date) + "</label>\n\t\t\t\t</div>\n\t\t\t\t" + (listCreators ? "<div class=\"flex-column cardDescription__info\" >\n\t\t\t\t<h3>Guionistas: </h3>\n\t\t\t\t<label class=\"cardDescription__text\">" + listCreators + "</label>\n\t\t\t\t</div>" : "") + "\n\t\t\t\t" + (info.description ? "<div class=\"flex-column cardDescription__info\">\n\t\t\t\t<h3>Descripci\u00F3n: </h3>\n\t\t\t\t<label class=\"cardDescription__text\">" + info.description + "</label>\n\t\t\t\t</div>" : "") + "\n\t\t\t</div>\n\t\t</div>\n\t\t<div>\n\t\t\t<h2 style=\"font-weight: 700;\">Personajes</h2>\n\t\t\t<p class=\"margin-bottom: 0.5em;\">" + dataOfCharacters.length + " " + (dataOfCharacters.length == 0 || dataOfCharacters.length != 1 ? "Resultados" : "Resultado") + "</p>\n\t\t\t<div class=\"container-cards\" style=\"justify-content:flex-start\">\n\t\t\t\t" + (dataOfCharacters.length > 0 ?
                    dataOfCharacters.map(function (character) {
                        return "<div class=\"card-characters\"  onclick=\"window.location.href= '/index.html?id=" + character.id + "&type=characters'\">\n\t\t\t\t\t\t\t<div class=\"card-characters__contImg\">\n\t\t\t\t\t\t\t\t<img class=\"img-character\" src=\"" + character.thumbnail.path + "." + character.thumbnail.extension + "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class=\"card-characters__text\">" + character.name + "</p>\n\t\t\t\t\t\t</div>";
                    }).join('')
                    : "") + "\n\t\t\t</div>\n\t\t</div>\n\t</div>";
                return [2 /*return*/];
        }
    });
}); };
var createCharacterCard = function (info) { return __awaiter(_this, void 0, void 0, function () {
    var dataOfComics;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchInfo(info)];
            case 1:
                dataOfComics = _a.sent();
                containerData.innerHTML = "\n\t<div class=\"flex-column cardDescription\">\n\t\t<div class=\"cardDescription__title\" style=\"margin-bottom:2em;\">\n\t\t\t<div class=\"flex\" style=\"justify-content:center;\">\n\t\t\t\t<img class=\"cardDescription__img\" src=\"" + info.thumbnail.path + "." + info.thumbnail.extension + "\"/>\n\t\t\t</div>\n\t\t\t<div class=\"flex-column cardDescription__contInfo\">\n\t\t\t\t<h2 style=\"font-weight: 700; margin-bottom:10px;\">" + info.name + "</h2>\n\t\t\t\t<h3>Descripci\u00F3n: </h3>\n\t\t\t\t<label class=\"cardDescription__text\">" + info.description + "</label>\n\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t<h2 style=\"font-weight: 700;\">Comics: </h2>\n\t\t\t<p>" + dataOfComics.length + " " + (dataOfComics.length == 0 || dataOfComics.length != 1 ? "Resultados" : "Resultado") + "</p>\n\t\t\t<div class=\"container-cards\" style=\"justify-content:flex-start; gap: 26px 0px;\">\n\t\t\t\t" + (dataOfComics.length > 0 ?
                    dataOfComics.map(function (comic) {
                        return "<div id=\"cardComicOfCharacter\" class=\"card\" onclick=\"window.location.href= '/index.html?id=" + comic.id + "&type=comics'\">\n\t\t\t\t\t\t\t<div class=\"card__contImg\">\n\t\t\t\t\t\t\t\t<img class=\"img\" src=\"" + comic.thumbnail.path + "." + comic.thumbnail.extension + "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class=\"card__text\">" + comic.title + "</p>\n\t\t\t\t\t\t</div>";
                    }).join('')
                    : "") + "\n\t\t\t</div>\n\t\t</div>\n\t</div>";
                return [2 /*return*/];
        }
    });
}); };
