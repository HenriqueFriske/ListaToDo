import React, { useState } from 'react';

//componentes
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

//css
import styles from './App.module.css'

//Interface
import { ITask } from './interfaces/Task';


function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpadate] = useState<ITask | null>(null);

  const deleteTask = (id: number)=>{
    setTaskList(
      taskList.filter(task =>{
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
  const modal = document.querySelector("#modal")
  if(display){
    modal!.classList.remove("hide")
  }else{
    modal!.classList.add("hide")
  }
  };

  const editTask = (task: ITask): void =>{
    hideOrShowModal(true);
    setTaskToUpadate(task);
  };

  const updateTask = (id: number, title: string, difficulty:number) => {
    const updatedTask: ITask = {id, title, difficulty};

    const updatedItens = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })
    setTaskList(updatedItens);
    

    hideOrShowModal(false);

  }

  return (
    <div>
      <Modal 
        children = {
          <TaskForm 
            btnText='Editar tarefa' 
            taskList={taskList}
            task={taskToUpdate} 
            handleUpdate={updateTask}
      />}
      />
      <Header/>
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm 
          btnText='Criar Tarefa'
          taskList={taskList}
          setTaskList={setTaskList}
          /> 
        </div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}
/>
        <div></div>
      </main>

      <Footer/>

    </div>
  );
}

export default App;
