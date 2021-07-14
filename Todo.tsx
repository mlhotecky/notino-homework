import React from "react";

class Todo extends React.Component<any> {
	shouldComponentUpdate(prevProps: any) {
		return this.props != prevProps;
	}

	handleOnClick() {
		window.location.href = '/detail'
	}

	render() {

	return (
		<div>
			<div onClick={this.handleOnClick}>
			{this.props.todo.title}
			</div>
		</div>
	);
	}
}

export default Todo;
