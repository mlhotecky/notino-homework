import React, { createContext, useEffect, useState } from "react";
import { Col, Row } from "react-flexbox-grid";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  API_PREFIX,
  AppProps,
  STATUS,
  StatusObject,
  TodoContextDetail,
  TodoObject,
} from "./contants";
import ContentWrapper from "./ContentWrapper";

// make context for todos
const TodoContext = createContext<TodoContextDetail>({
  todo: { id: 0, title: "", body: "" },
  status: {
    type: STATUS.PENDING,
    message: "",
  },
});

// make separated provider function for clearer implementation in return
function TodoProvider(props: AppProps) {
  // define todos for list and status for dynamic content of app with interfaces + initial values
  const [todo, setTodo] = useState<TodoObject>({ id: 0, title: "", body: "" });
  const [status, setStatus] = useState<StatusObject>({
    type: STATUS.PENDING,
    message: "",
  });

  // make arrow function for clearly code in api call - message has empty string if we dont need display error message
  const apiStatus = (type: STATUS, message: string = "") =>
    setStatus({
      type,
      message,
    });

  // api call once when app is rendered, call apiStatus for dynamic content in phases of api call
  useEffect(() => {
    // apiStatus(STATUS.PENDING);
    fetch(`${API_PREFIX}/posts/${props.id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return apiStatus(STATUS.REJECTED, error);
        }

        apiStatus(STATUS.SUCCEEDED);
        setTodo(data);
      })
      .catch((error) => {
        apiStatus(STATUS.REJECTED, error.toString());
      });
  }, [props.id]);

  return (
    // with props.children we can use TodoProvider as a wrapper tag
    <TodoContext.Provider value={{ todo, status }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default function TodoDetail(props: AppProps) {
  const goBack = () => props.history.push("/");

  return (
    <div className="todo-detail">
      <TodoProvider id={props.match.params.id}>
        <TodoContext.Consumer>
          {(context: TodoContextDetail) => (
            <ContentWrapper context={context}>
              <Row className="d-flex justify-content-center">
                <Col md={8}>
                  <Row className="mb-3">
                    <Col md={10}>
                      <h2>{context.todo.title}</h2>
                    </Col>
                    <Col md={2} className="d-flex justify-content-end">
                      <FontAwesomeIcon
                        title="Back"
                        className="cursor-pointer"
                        icon={faTimesCircle}
                        onClick={goBack}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>{context.todo.body}</Col>
                  </Row>
                </Col>
              </Row>
            </ContentWrapper>
          )}
        </TodoContext.Consumer>
      </TodoProvider>
    </div>
  );
}
