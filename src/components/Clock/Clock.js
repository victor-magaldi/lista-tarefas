import React from "react";

export default class Main extends React.Component {
  state = {
    time: new Date().toLocaleTimeString("pt-Br"),
  };
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString("pt-Br"),
    });
  }
  render() {
    let { time } = this.state;
    return <div>{time}</div>;
  }
}
