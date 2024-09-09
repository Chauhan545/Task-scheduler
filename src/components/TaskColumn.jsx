// import React from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';

// const TaskColumn = ({ column, tasks, setModalIsOpen, setNewTask, handleDeleteTask, handleEditTask }) => {
//   return (
//     <Droppable droppableId={column.id}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           className="column"
//         >
//           <h2>{column.title}</h2>
//           {tasks.map((task, index) => (
//             <Draggable key={task.id} draggableId={task.id} index={index}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   className="task"
//                 >
//                   <span>{task.title}</span>
//                   <div className="task-actions">
//                     <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//                     <button onClick={() => {
//                       const newTitle = prompt('Edit task title:', task.title);
//                       if (newTitle) handleEditTask(task.id, newTitle);
//                     }}>Edit</button>
//                   </div>
//                 </div>
//               )}
//             </Draggable>
//           ))}
//           {provided.placeholder}
//           <button
//             className="add-task-btn"
//             onClick={() => {
//               setNewTask({ title: '', status: column.id });
//               setModalIsOpen(true);
//             }}
//           >
//             + Add Task
//           </button>
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default TaskColumn;


import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskColumn = ({
  column,
  tasks,
  setModalIsOpen,
  setNewTask,
  handleDeleteTask,
  handleEditTask,
}) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="column"
        >
          <h2>{column.title}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="task"
                >
                  <span>{task.title}</span>
                  <div className="task-actions">
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        const newTitle = prompt("Edit task title:", task.title);
                        if (newTitle) handleEditTask(task.id, newTitle);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button
            className="add-task-btn"
            onClick={() => {
              setNewTask({ title: "", status: column.id });
              setModalIsOpen(true);
            }}
          >
            + Add Task
          </button>
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;