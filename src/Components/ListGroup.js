import React, { useContext, useEffect } from 'react';
import  { Store } from '../store';
import Form from './Form';
import ListTodo from './ListTodo';
import api from '../API/api';

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
            <div key={groupList.id} className="border border-warning" style={{margin: '2%', padding:'2%'}}>
              <div>{groupList.name === null ? '' : groupList.name.toUpperCase() }
              <button className="btn btn-outline-danger btn-sm ml-3" onClick={() => onDelete(groupList.id)}>
                  Eliminar tarea principal
              </button>
              </div>
              <br/>
              <Form group={groupList.id}/>
              <ListTodo group={groupList.id} />
            </div>
          )
        })}
      </div>
  );
}