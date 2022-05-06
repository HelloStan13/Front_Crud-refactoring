const HOST_API = "http://localhost:9095/api";

async function callApi(endpoint, options = {}) {
  
    options.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

    const url = HOST_API + endpoint;
    const response = await fetch(url, options);
    return await response.json();
    
  }

const api = {
    todo: {
        all(){
          return fetch(HOST_API + "/todos");
        },
        add(request) {
            return callApi(`/todo`, {
                method: 'POST',
                body: JSON.stringify(request),
              });
        },
        edit(request) {
            return callApi(`/todo`, {
                method: 'PUT',
                body: JSON.stringify(request),
              }); 
        },
        delete(id) {
          return fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE",
          });
        }
    },
    grouplist: {
        all(){
          return fetch(HOST_API + "/grouplists");
        },
        addGroupList(request) {
            return callApi(`/grouplist`, {
                method: 'POST',
                body: JSON.stringify(request),
              });
        },
        deleteGroupList(id) {
          return fetch(HOST_API + "/" + id + "/grouplist", {
            method: "DELETE",
          });
        }
    }
}

export default api;