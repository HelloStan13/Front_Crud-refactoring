import React, { useContext, useEffect } from 'react';
import  { Store } from '../store';
import api from '../API/api';

const ListTodo = (props) => {
  const { group } = props;
  const { dispatch, state: { todo } } = useContext(Store);
  var currentList = todo.list.filter(todo => todo.groupListId === group);


  useEffect(() => {
    api.todo.all()
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);

  const onDelete = (id) => {
    api.todo.delete(id).then(() => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = async (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked,
      groupListId: group
    };
    
    try {
      const todo = await api.todo.edit(request);
      dispatch({ type: "update-item", item: todo });

    }catch (error){
      console.log(error)
    }
  };

  const decorationDone = {
    textDecoration: 'line-through'
  };
  return <div>
    <table className='table'>
      <thead>
        <tr>
          
          <td>Tarea</td>
          <td>¿Completado?</td>
          <td>Acciones</td>
        </tr>
      </thead>
      <tbody>
        {currentList.map((todo) => {
          return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            
            <td>{todo.name}</td>
            <td>
              <input type="checkbox" id='decoration' defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}>
              </input>
            </td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
                Eliminar
              </button>
            
              <button className="btn btn-warning btn-sm " onClick={() => onEdit(todo)}>
                Editar
              </button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}
  export default ListTodo;