import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo,editTodo } from '../store/slice/todoSlice';

const TodoList = () => {

    const [currentTodo, setCurrentTodo] = useState('');
    const [currEditedTodoId,setCurrEditedTodoId] = useState(null);

    // dispatch action for components to slice:
    const dispatch = useDispatch();

    // get the state from slice:
    const {todoLists} = useSelector(state=> state.todo);
    // console.log(todoLists);

    function handleAddTodo(){
        // call method or reducers defined in todoSlice:
        dispatch(addTodo(currentTodo));
        setCurrentTodo("");
    }

    function handleDeleteTodo(todoId){
        dispatch(deleteTodo(todoId));
    }

    function handleUpdateTodo(todo){
        setCurrEditedTodoId(todo.id);
        setCurrentTodo(todo.title);
    }

    function handleEditTodo(){
        dispatch(editTodo({currEditedTodoId, currentTodo}));
        setCurrentTodo("");
    }


  return (

    <div className='flex-col items-center justify-center mt-10 gap-4'>

        <div className='flex items-center justify-center mt-10 gap-4'>
            <input 
            type="text" 
            name='todo'
            value={currentTodo}
            onChange={(e)=> setCurrentTodo(e.target.value)}
            placeholder='Enter a Todo...'
            className='px-4 py-2 border border-gray-300 rounded-md w-[400px]'

            />

            <button 
            className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800'
            onClick={currEditedTodoId!=null ? handleEditTodo : handleAddTodo}
            disabled={currentTodo===""}
            >
                {currEditedTodoId!=null ? "Edit Todo": "Add Todo"}
            </button>   

        </div> 

        <div className='mx-auto mt-10 flex items-center justify-center'>
            <ul className='flex-col space-y-3 min-w-max'>
                {
                    todoLists && todoLists.length>0 ? 
                    todoLists.map((items) => 
                        <li key={items.id} className='flex justify-between gap-10 border border-gray-300 px-4 py-2 rounded'>

                            <p className=''>{items.title}</p>

                            <button 
                            className='bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800'
                            onClick={()=>handleUpdateTodo(items)}
                            >
                                Update Todo
                            </button>  
                            <button 
                            className='bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800'
                            onClick={()=>handleDeleteTodo(items.id)}
                            >
                                Delete Todo
                            </button>  
                            
                        </li>
                    ) : null
                }
            </ul>
        </div>
    </div>
  )
}

export default TodoList