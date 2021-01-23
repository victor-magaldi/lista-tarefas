import React, { Component } from "react";
import "./Main.css";

//Form
import { FaPlus } from "react-icons/fa";

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

        <form action="#" className="form">
          <input type="text" onChange={this.handleChange} value={novaTarefa} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>
      </div>
    );
  }
}
