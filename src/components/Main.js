import React, { Component } from "react";
import "./Main.css";

import Form from "./Form/";
import Tarefas from "./Tarefas/";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
    time: "",
  };
  // esse metódo é executado quando o componente é renderizado na página
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefas) {
      this.setState({ tarefas: tarefas });
    }
    this.intervalID = setInterval(() => this.tick(), 1000);
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

    if (index === -1) {
      this.setState({
        tarefas: [...tarefaAnteriores, novaTarefa],
        novaTarefa: "",
      });
    } else {
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
  };
  handleDelete = (evt, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString("pt-Br"),
    });
  }
  render() {
    const { novaTarefa, tarefas, time } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas:{novaTarefa} </h1>
        <h3> horas:{time} </h3>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
