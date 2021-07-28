import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { AppProps } from "./contants";

function areEqual(prevProps: AppProps, nextProps: AppProps) {
  /*
	return true if passing nextProps to render would return
	the same result as passing prevProps to render,
	otherwise return false
	*/
  return prevProps === nextProps;
}

function Todo(props: AppProps) {
  //destructuring of props
  const { todo } = props;

  const handleOnClick = () => {
    props.history.push(`/todos/${todo?.id}`);
  };

  return (
    // use classNames from bootstrap library
    <div className="todo-item">
      <Row onClick={handleOnClick}>
        <Col md={4}>{todo?.title}</Col>
        <Col md={8}>{todo?.body}</Col>
      </Row>
    </div>
  );
}

export default React.memo(Todo, areEqual);
