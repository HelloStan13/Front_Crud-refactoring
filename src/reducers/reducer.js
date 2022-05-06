export const reducer = (state, action) => {
    switch (action.type) {
      case 'update-item':
        const todoUpItem = state.todo;
        const listUpdateEdit = todoUpItem.list.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        });
        todoUpItem.list = listUpdateEdit;
        todoUpItem.item = {};
        return { ...state, todo: todoUpItem }
      case 'delete-item':
        const todoUpDelete = state.todo;
        const listUpdate = todoUpDelete.list.filter((item) => {
          return item.id !== action.id;
        });
        todoUpDelete.list = listUpdate;
        return { ...state, todo: todoUpDelete }
      case 'delete-item-group':
        const GroupUpDelete = state.groupList;
        const listGroupUpdate = GroupUpDelete.list.filter((item) => {
          return item.id !== action.id;
        });
        GroupUpDelete.list = listGroupUpdate;
        return { ...state, groupList: GroupUpDelete }
      case 'update-list':
        const todoUpList = state.todo;
        todoUpList.list = action.list;
        return { ...state, todo: todoUpList }
      case 'update-list-group':
        const groupUpList = state.groupList;
        groupUpList.list = action.list;
        return { ...state, groupList: groupUpList }
      case 'edit-item':
        const todoUpEdit = state.todo;
        todoUpEdit.item = action.item;
        return { ...state, todo: todoUpEdit }
      case 'add-item':
        const todoUp = state.todo.list;
        todoUp.push(action.item);
        return { ...state, todo: {list: todoUp, item: {}} }
      case 'add-item-group':
        const todoGroupUp = state.groupList.list;
        todoGroupUp.push(action.item);
        return { ...state, groupList: {list: todoGroupUp, item: {}} }
      default:
        return state;
    }
}