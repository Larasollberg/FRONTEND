import LOCALSTORAGE_KEYS from "../constants/localstorage"

export const HTTP_METHODS = {
    GET:'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const HEADERS = {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization'
}

export const CONTENT_TYPE_VALUES = {
    JSON: 'application/json'
}

export function getAuthorizationToken (){
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    console.log('Token obtenido:', auth_token);
    return auth_token
}