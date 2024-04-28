import './App.css';

import Header from './Header.jsx';
import TaskContainer from './TaskContainer.jsx';




function App() {
  const title = "Your To-Do List"


  return (

    <>
      <Header h1text={title}/>
      <TaskContainer/>
      
    </>
  );
}

export default App;
