import React, { useContext,  useRef, useState } from 'react';
import  { Store } from '../store';
import api from '../API/api';



export default function FormList() {
    const form = useRef(null);
    const { dispatch, state: { groupList } } = useContext(Store);
    const item = groupList.item;
    const [state, setState] = useState(item);
  
    const onAdd = async (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null
      };

      try {
        const groupList = await api.grouplist.addGroupList(request);
        dispatch({ type: "add-item-group", item: groupList });
        setState({ name: "" });
        form.current.reset();

      }catch (error){
        console.log(error)
      }
    }
  
    const onEdit = async (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
        try {
            const todo = await api.todo.edit(request);
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            form.current.reset();
        } catch(error) {
            console.log(error);
        }
    }
    

    return (
        <form className="container">
            <img src="https://webassets.mongodb.com/_com_assets/cms/logo_baja-9r83aqmpo0.png" alt="Sofka" class="center"/>
            <br></br>
            <h2 className='center'>Gestión de Proyectos</h2>
            <br></br>
          <div className="row">
            <input
                  className="form-control col-10"
                  type="text"
                  name="name"
                  required="required" 
                  placeholder="Nombre de proyecto"

                  defaultValue={item.name}
                  onChange={(event) => {
                  setState({ ...state, name: event.target.value })
                  }} ></input>
            {item.id && <button className='btn btn-primary' onClick={onEdit}>Actualizar</button>}
            {!item.id && 
              <button class="btn btn-success btn-sm col-2" onClick={onAdd}>
                Crear proyecto
              </button>}
          </div>
        </form>
    );
  }
