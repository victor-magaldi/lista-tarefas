import React from "react";
import propTypes from "prop-types";

import "./Tarefas.css";
import { FaEdit, FaWindowClose } from "react-icons/fa";

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={tarefa}>
          {tarefa}
          <div>
            <FaEdit className="edit" onClick={(e) => handleEdit(e, index)} />
            <FaWindowClose
              onClick={(e) => handleDelete(e, index)}
              className="delete"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  tarefas: propTypes.array.isRequired,
  handleEdit: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
};
