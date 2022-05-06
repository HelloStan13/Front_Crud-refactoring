import React, { useContext,  useRef, useState } from 'react';
import  { Store } from '../store';
import api from '../API/api';

/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* creacion de todo para las tareas
* 
*/
export default function Form(props) {
    const form = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
    const { group } = props;
/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* add tareas, name y se crea con las condiciones de completado
* 
*/
    const onAdd = async (event) => {

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
       form.current.reset();

      }catch (error){
        console.log(error)
      }
    }
 /*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* funcion para editar tareas
* 
*/ 
    const onEdit = async (event) => {
      
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
            form.current.reset();
        } catch(error) {
            console.log(error);
          }    
    }

/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* se retorna el input para solicitar la creacion de tareas y botones para el grupo proyecto
* 
*/
    return (
        <form className="container">
          <div className="row">
            <input
                  className="form-control form-control-sm col-10"
                  type="text"
                  name="name"
                  id='tarea'
                  placeholder="Tareas de proyecto"
                  defaultValue={item.groupListId === group ? item.name : ''}
                  onChange={(event) => {
                    setState({ ...state, name: event.target.value })
                  }} ></input>
                  <br></br>
            {item.id && item.groupListId === group && 
              <button className="btn btn-warning btn-sm col-2"  onClick={onEdit}>
                Actualizar tarea
              </button>
            }
            {item.id && item.groupListId !== group && 
              <button className="btn btn-success btn-sm col-2" onClick={onAdd}>
                Crear tarea
              </button>
            }
            <br></br>
            {!item.id && <button id="btn" className="btn btn-success btn-sm col-2" onClick={onAdd}>
              Crear tarea
              </button>
            }
            
          </div>
        </form>
    );
  }
