import React, { useEffect, useState, useCallback } from 'react';
import useHttp from "./hooks/use-http";
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback(tasksObj => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({id: taskKey, text: tasksObj[taskKey].text});
    }
    setTasks(loadedTasks);
  }, []);

  const  httpData = useHttp();
  const {isLoading, error, sendRequest:fetchTasks} = httpData;

  useEffect(() => {
    fetchTasks({
      url: 'https://react-learner-ec3b8-default-rtdb.firebaseio.com/tasks.json'},
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
