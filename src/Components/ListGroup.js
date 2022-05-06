import React, { useContext, useEffect } from 'react';
import  { Store } from '../store';
import Form from './Form_List';
import ListTodo from './ListTodo';
import api from '../API/api';

/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* funciones para listar y eliminar proyecto principal
* 
*/

export default function ListGroup() {
  const { dispatch, state: { groupList } } = useContext(Store);
  const currentGroupList = groupList.list;

  useEffect(() => {
      api.grouplist.all()
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list-group", list })
      })
  }, [dispatch]);

  const onDelete = (id) => {
    api.grouplist.deleteGroupList(id).then(() => {
      dispatch({ type: "delete-item-group", id })
    })
  };

  return (
      <div>
        {currentGroupList.map((groupList) => {
          return (
            <div key={groupList.id} className="border border-dark" style={{margin: '1%', padding:'3%'}}>
              <div>{groupList.name === null ? '' : groupList.name.toUpperCase() }
              <button className="btn btn-danger btn-sm ml-3" onClick={() => onDelete(groupList.id)}>
                  Eliminar proyecto principal
              </button>
              </div>
              <br></br>
              <Form group={groupList.id}/>
              <br></br>
              <ListTodo group={groupList.id} />
            </div>
          )
        })}
      </div>
  );
}