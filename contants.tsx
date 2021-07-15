
// api prefix - shorter definition in usages
export const API_PREFIX = "https://jsonplaceholder.typicode.com";

// enum for dynamic content according to api call phase
export enum STATUS {
    PENDING = "PENDING",
    SUCCEEDED = "SUCCEEDED",
    REJECTED = "REJECTED",
}

// enum for display message about data according to api call phase
export enum DATA_MESSAGE {
    LOADING = "Loading...",
    NO_DATA = "No data.",
    ERROR = "Error ocurred:"
}

// interface of basic item in list - expected object
export interface TodoObject {
    id: number;
    title: string,
    body: string
}

// interface for status of calling api
export interface StatusObject {
    type: STATUS,
    // optional value of interface - we need message only if api call throws error
    message?: string
}

// interface for context object in list
export interface TodoContextArray {
    todos: TodoObject[],
    status: StatusObject
}

// interface for context object in detail
export interface TodoContextDetail {
    todo: TodoObject,
    status: StatusObject
}