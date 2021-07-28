import React from "react";

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
  ERROR = "Error ocurred:",
}

// interface of basic item in list - expected object
export interface TodoObject {
  id: number;
  title: string;
  body: string;
}

// interface for status of calling api
export interface StatusObject {
  type: STATUS;
  // optional value of interface - we need message only if api call throws error
  message?: string;
}

// interface for context object in list
export interface TodoContextArray {
  todos: TodoObject[];
  status: StatusObject;
}

// interface for context object in detail
export interface TodoContextDetail {
  todo: TodoObject;
  status: StatusObject;
}

// type of component props
export declare interface AppProps {
  id?: number;
  children?: any; // React.FunctionComponentElement<any>; - JSX element type 'Element | undefined' is not a constructor function for JSX elements.
  context?: any; // TodoContextArray || TodoContextDetail
  match?: any; // RouteComponentProps; - Object is possibly 'undefined'.  TS2532
  history?: any; // RouteComponentProps; - Object is possibly 'undefined'.  TS2532
  functionChildren?: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onClick?: React.MouseEvent<HTMLElement>;
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events the generic parameter is the type of event.target
  todo?: TodoObject;
}
