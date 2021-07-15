import React, {createContext, useEffect, useState} from "react";
// make new file contants instead of defining all in components each time
import {
    API_PREFIX,
    AppProps,
    DATA_MESSAGE,
    STATUS,
    StatusObject,
    TodoContextArray,
    TodoObject
} from "./contants";
import {Col, Row} from "react-flexbox-grid";
import Todo from './Todo';
import ContentWrapper from "./ContentWrapper";

// make context for todos
const TodoContext = createContext<TodoContextArray>({
    todos: [],
    status: {
        type: STATUS.PENDING,
        message: ""
    }
});

// make separated provider function for clearer implementation in return
function TodoProvider(props: AppProps) {

    // define todos for list and status for dynamic content of app with interfaces + initial values
    const [todos, setTodos] = useState<TodoObject[]>([]);
    const [status, setStatus] = useState<StatusObject>({type: STATUS.PENDING, message: ""});

    // make arrow function for clearly code in api call - message has empty string if we dont need display error message
    const apiStatus = (type: STATUS, message: string = "") => setStatus({
        type,
        message
    })

    // api call once when app is rendered, call apiStatus for dynamic content in phases of api call
    useEffect(() => {
        // apiStatus(STATUS.PENDING);
        fetch(`${API_PREFIX}/posts`)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return apiStatus(STATUS.REJECTED, error)
                }

                apiStatus(STATUS.SUCCEEDED)
                setTodos(data);
            })
            .catch(error => {
                apiStatus(STATUS.REJECTED, error.toString())
            });
    }, [])

    return (
        // with props.children we can use TodoProvider as a wrapper tag
        <TodoContext.Provider value={{todos, status}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default function TodoList() {

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={8}>
                    <h2 className="p-3 my-2">Todos list</h2>
                    <TodoProvider>
                        <TodoContext.Consumer>
                            {(context: TodoContextArray) => <ContentWrapper context={context}>
                                {context.todos.length > 0 ? context.todos.map((todo: TodoObject) => (
                                    <Todo key={todo.id} todo={todo}/>
                                )) : <p>{DATA_MESSAGE.NO_DATA}</p>
                                }
                            </ContentWrapper>
                            }
                        </TodoContext.Consumer>
                    </TodoProvider>
                </Col>
            </Row>
        </>
    );
}