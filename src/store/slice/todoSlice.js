import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    todoLists: [],
}

const todoReducer = createSlice({
    name: 'todos',
    initialState: initialStates,
    reducers: {
        // combines all the actions that you need:
        addTodo(state, action){

            const newTodo = {
                id: state.todoLists.length==0 ? 1: state.todoLists.length+1,
                title: action.payload,
            }

            state.todoLists.push(newTodo);
            return state;
        },

        deleteTodo(state,action){
            state.todoLists=state.todoLists.filter((item)=> item.id!= action.payload);

            return state;
        },
        editTodo(state, action){

            let getTodos = state.todoLists;
            const getCurrTodoIdx = getTodos.findIndex((item)=> item.id=== action.payload.currEditedTodoId); 

            getTodos[getCurrTodoIdx] = {
                ...getTodos[getCurrTodoIdx],
                title: action.payload.currentTodo,
            }

            state.todoLists = getTodos;
            return state;
        }
    }
});

export const {addTodo, deleteTodo,editTodo}  = todoReducer.actions;
export default todoReducer.reducer;