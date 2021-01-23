import React, { Component } from "react";
import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "",
  };

  handleChange = (evt) => {
    this.setState({
      novaTarefa: evt.target.value,
    });
  };
  render() {
    const { novaTarefa } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas:{novaTarefa} </h1>

        <form action="#">
          <input type="text" onChange={this.handleChange} />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}
