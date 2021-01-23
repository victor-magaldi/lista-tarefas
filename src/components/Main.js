import React, { Component } from "react";
import "./Main.css";

//Form
import { FaPlus } from "react-icons/fa";

//tarefas
import { FaEdit, FaWindowClose } from "react-icons/fa";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
  };

  handleChange = (evt) => {
    this.setState({
      novaTarefa: evt.target.value,
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();

    const { tarefas } = this.state;
    let { novaTarefa } = this.state;

    //essa é um estado que é atualizado sempre quando digita
    novaTarefa = novaTarefa.trim();
    //verifica se a tarefa já existe
    if (tarefas.indexOf(novaTarefa) !== -1) {
      return;
    }
    const tarefaAnteriores = [...tarefas];

    this.setState({
      tarefas: [...tarefaAnteriores, novaTarefa],
    });
    // limpa o estado do campo
    this.setState({
      novaTarefa: "",
    });
  };

  handleEdit = (evt, index) => {
    console.log(evt);
    console.log("delete", index);
  };
  handleDelete = (evt, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  };
  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas:{novaTarefa} </h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input type="text" onChange={this.handleChange} value={novaTarefa} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit className="edit" />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
