import React, { useContext,  useRef, useState } from 'react';
import  { Store } from '../store';
import api from '../API/api';


export default function Form(props) {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
    const { group } = props;

    
    const onAdd = async (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false,
        groupListId: group
      };

      try {
        const todo = await api.todo.add(request);
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();

      }catch (error){
        console.log(error)
      }
    }
  
    const onEdit = async (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted,
        groupListId: group
      };

      console.log(request);
  
        try {
            const todo = await api.todo.edit(request);
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();
        } catch(error) {
            console.log(error);
        }
    }
  
    return (
        <form ref={formRef} className="container">
          <div className="row">
            <input
                  className="form-control form-control-sm col-10"
                  type="text"
                  name="name"
                  placeholder="Tareas de proyecto"
                  defaultValue={item.groupListId === group ? item.name : ''}
                  onChange={(event) => {
                    setState({ ...state, name: event.target.value })
                  }} ></input>
            {item.id && item.groupListId === group && 
              <button class="btn btn-warning btn-sm col-2"  onClick={onEdit}>
                Actualizar tarea
              </button>
            }
            {item.id && item.groupListId !== group && 
              <button class="btn btn-success btn-sm col-2" onClick={onAdd}>
                Crear tarea
              </button>
            }
            {!item.id && <button class="btn btn-success btn-sm col-2" onClick={onAdd}>
              Crear tarea
              </button>
            }
          </div>
        </form>
    );
  }
