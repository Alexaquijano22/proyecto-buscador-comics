type Characters = {
    comics: Comics;
    description: string;
    events?: Events
    id: number;
    modified?: string,
    name: string;
    resourceURI?: string;
    series?: Series;
    stories?: {};
    thumbnail?:{};
    urls?:[];
}

type ComicCharacters = {
    available: number;
    collectionURI: string;
    items: CharactersOfComic[];
    returned: number;
}

type CharactersOfComic = {
    name: string;
    resourceURI: string;
}

type Comics ={
    characters: Characters & ComicCharacters; 
    collectedIssues?: [];
    collections?:[];
    creators?: Creators;
    dates?: DatesComics[];
    description?: string;
    diamondCode?: string;
    digitalID?: number;
    ean?: string;
    events?: {};
    format?: string;
    id?: string;
    images?: [];
    isbn?: string;
    issn?: string;
    issueNumber?: number;
    modfied?: string;
    pageCount?: number;
    prices?: [{}];
    resourceURI?: string;
    series?: {};
    stories?: {};
    textObjects?: [];
    thumbnail?: Thumbnail;
    title?: string;
    upc?: string;
    urls?: [{}];
    variantDescription?: string;
    variants?: []    
}

type Thumbnail = {
    extension: string;
    path: string
}

type DatesComics = {
    type: string;
    date: string
}

type Creators = {
    items: CreatorsItems[];
}

type CreatorsItems = {
    name: string;
    resourceURI: string;
    role: string;
}

type Events ={

}
type Series = {

}