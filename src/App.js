import './App.css';
import Home from './home';
import { useRoutes } from 'react-router-dom';

function App () {


  
  const element = useRoutes([

    {
      path: "/",
      element:  <Home /> 
    },
   
  
  
  
  
  
   ]);
    return element;
  }

export default App;
