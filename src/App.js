
//--------------
// import React, { useState } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
// import Modal from 'react-modal';
// import './App.css';
// import { app, FirebaseProvider } from './context/Firebase';
// import TaskColumn from './components/TaskColumn'; // Importing the TaskColumn component
// import{getDatabase,ref,set} from "firebase/database";
// //import {app} from "./context/Firebase";

// Modal.setAppElement('#root');


// const db=getDatabase(app);

 
// const initialTasks = [
//   { id: '1', title: 'Task 1', status: 'todo' },
//   { id: '2', title: 'Task 2', status: 'in-progress' },
//   { id: '3', title: 'Task 3', status: 'completed' },
// ];

// const columns = [
//   { id: 'todo', title: 'TODO' },
//   { id: 'in-progress', title: 'IN PROGRESS' },
//   { id: 'completed', title: 'COMPLETED' }
// ];

// const App = () => {

// // const save=()=>{
// //   set(ref(db,"todo/tasks"),{
// //     todo:"wake up at 6",
// //     study:2,
// //   })
// // };

// const save = () => {
//   set(ref(db, "todo/tasks"), {
//     todo: "wake up at 6",
//     study: 2,
//   })
//   .then(() => {
//     console.log('Data saved successfully!');
//   })
//   .catch((error) => {
//     console.error('Error saving data:', error);
//   });
// };


//   const [tasks, setTasks] = useState(initialTasks);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ title: '', status: 'todo' });

//   const handleAddTask = () => {
//     if (!newTask.title) return;

//     const newId = (tasks.length + 1).toString();
//     setTasks([...tasks, { id: newId, ...newTask }]);
//     setNewTask({ title: '', status: 'todo' });
//     setModalIsOpen(false);
//   };

//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   const handleEditTask = (id, newTitle) => {
//     setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
//   };

//   const handleDragEnd = (result) => {
//     const { destination, source } = result;

//     if (!destination) return;

//     const updatedTasks = Array.from(tasks);
//     const [movedTask] = updatedTasks.splice(source.index, 1);
//     movedTask.status = destination.droppableId;
//     updatedTasks.splice(destination.index, 0, movedTask);

//     setTasks(updatedTasks);
//   };

//   return (
//     <div className="App">
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="columns-container">
//           {columns.map(column => (
//             <TaskColumn
//               key={column.id}
//               column={column}
//               tasks={tasks.filter(task => task.status === column.id)}
//               setModalIsOpen={setModalIsOpen}
//               setNewTask={setNewTask}
//               handleDeleteTask={handleDeleteTask}
//               handleEditTask={handleEditTask}
//             />
//           ))}
//         </div>
//       </DragDropContext>

//       {/* Modal for adding new tasks */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2>Add New Task</h2>
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           placeholder="Task title"
//           className="input-field"
//         />
//         <select
//           value={newTask.status}
//           onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//           className="input-field"
//         >
//           {columns.map(column => (
//             <option key={column.id} value={column.id}>{column.title}</option>
//           ))}
//         </select>
//         <button onClick={handleAddTask}>Create</button>
//         <button onClick={() => setModalIsOpen(false)}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Modal from "react-modal";
import "./App.css";
import TaskColumn from "./components/TaskColumn";
import { getDatabase, ref, set, push, remove, update } from "firebase/database"; // Import remove and update functions
import { app } from "./context/Firebase";

Modal.setAppElement("#root");

const db = getDatabase(app);

// Initial task data
const initialTasks = [
  { id: "1", title: "Task 1", status: "todo" },
  { id: "2", title: "Task 2", status: "in-progress" },
  { id: "3", title: "Task 3", status: "completed" },
];

const columns = [
  { id: "todo", title: "TODO" },
  { id: "in-progress", title: "IN PROGRESS" },
  { id: "completed", title: "COMPLETED" },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", status: "todo" });

  // Function to save tasks to Firebase
  const saveTaskToDatabase = (task) => {
    const newTaskRef = push(ref(db, `tasks/${task.status}`)); // Generate a new unique key
    set(newTaskRef, task)
      .then(() => {
        console.log("Task saved to Firebase");
      })
      .catch((error) => {
        console.error("Error saving task:", error);
      });
  };

  // Add task handler
  const handleAddTask = () => {
    if (!newTask.title) return;

    const newId = (tasks.length + 1).toString();
    const newTaskData = { id: newId, ...newTask };

    // Update the local state
    setTasks([...tasks, newTaskData]);

    // Save the new task to Firebase
    saveTaskToDatabase(newTaskData);

    // Reset task input
    setNewTask({ title: "", status: "todo" });
    setModalIsOpen(false);
  };

  // Delete task handler (local state and Firebase)
  const handleDeleteTask = (id, status) => {
    // Remove task from local state
    setTasks(tasks.filter((task) => task.id !== id));

    // Remove task from Firebase
    const taskRef = ref(db, `tasks/${status}/${id}`);
    remove(taskRef)
      .then(() => {
        console.log("Task deleted from Firebase");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Edit task handler (local state and Firebase)
  const handleEditTask = (id, newTitle, status) => {
    // Update the task title in local state
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );

    // Update task title in Firebase
    const taskRef = ref(db, `tasks/${status}/${id}`);
    update(taskRef, { title: newTitle })
      .then(() => {
        console.log("Task updated in Firebase");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
    // Optionally, update the task status in Firebase as well.
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              setModalIsOpen={setModalIsOpen}
              setNewTask={setNewTask}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Modal for adding new tasks */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add New Task</h2>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
          className="input-field"
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="input-field"
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <button onClick={handleAddTask}>Create</button>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
