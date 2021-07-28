import React from "react";
import { AppProps, DATA_MESSAGE, STATUS } from "./contants";

export default function ContentWrapper(props: AppProps) {
  // function for dynamic content according to api call phases
  const { context } = props;
  switch (context.status.type) {
    case STATUS.PENDING:
      return <p>{DATA_MESSAGE.LOADING}</p>;
    case STATUS.SUCCEEDED:
      return props.children;
    case STATUS.REJECTED:
      return (
        <p>
          `${DATA_MESSAGE.ERROR} ${context.status.message}`
        </p>
      );
    default:
      return <p>{DATA_MESSAGE.NO_DATA}</p>;
  }
}
