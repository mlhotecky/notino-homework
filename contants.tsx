
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