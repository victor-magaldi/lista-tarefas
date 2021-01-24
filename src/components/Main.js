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
    index: -1,
  };
  // esse metódo é executado quando o componente é renderizado na página
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefas) {
      this.setState({ tarefas: tarefas });
    }
  }
  //esse metodo é chamado sempre que componente tem alguma mudança
  componentDidUpdate(prevProps, prevStates) {
    const { tarefas } = this.state;
    if (prevStates.tarefas === tarefas) return;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleChange = (evt) => {
    this.setState({
      novaTarefa: evt.target.value,
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();

    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;

    //essa é um estado que é atualizado sempre quando digita
    novaTarefa = novaTarefa.trim();
    //verifica se a tarefa já existe
    if (tarefas.indexOf(novaTarefa) !== -1) {
      return;
    }
    const tarefaAnteriores = [...tarefas];
    console.log(this.state);

    if (index === -1) {
      this.setState({
        tarefas: [...tarefaAnteriores, novaTarefa],
        novaTarefa: "",
      });
    } else {
      console.log("entrou");
      tarefaAnteriores[index] = novaTarefa;
      this.setState({
        tarefas: [...tarefaAnteriores],
        index: -1,
      });
    }
  };

  handleEdit = (evt, index) => {
    const { tarefas } = this.state;
    this.setState({ index: index, novaTarefa: tarefas[index] });
    console.log("edit", index);
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
                <FaEdit
                  className="edit"
                  onClick={(e) => this.handleEdit(e, index)}
                />
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
