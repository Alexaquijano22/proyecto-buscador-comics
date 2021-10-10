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

type Comics ={
    characters: Characters;
    collectedIssues?: [];
    collections?:[];
    creators?:{};
    dates?:[];
    description?: string;
    diamondCode?: string;
    digitalID?: number;
    ean?: string;
    events?: {};
    format?: string;
    id?: number;
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
    thumbnail?: {};
    title?: string;
    upc?: string;
    urls?: [{}];
    variantDescription?: string;
    variants?: []    
}
type Events ={

}
type Series = {

}