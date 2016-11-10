// "_id": "581111d1742f8379c0f7b8f3",
// "name": "Item 8",
// "seller": "idramirezs10",
// "__v": 0,
// "created": "2016-10-26T20:28:01.303Z",
// "attributes": [
// "581111d1742f8379c0f7b8f2"
// ],
// "categories": [
// "580faff81ced8e9a25ddc3b6"
// ],
// "description": "No description of the product",
// "pictures": [
// "www.google.com",
// "www.youtube.com"
// ]

export interface Product {
    "_id": string,
    "name": string,
    "seller": string,
    "created": string,
    "attributes": ProductAttribute[],
    "categories": string[],
    "description": string,
    "pictures": string[]
}

export interface ProductAttribute{
    "_id": string,
    "price": number,
    "discount": number,
    "stock": number,
    "state": number,
    "style": number,
    "color": string,
    "size": string
}

export interface ProductCategory{
    "_id": string,
    "name": string
}