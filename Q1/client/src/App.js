/**
 * Presentation Layer or Front-End of our application, routes are defined in this file
 * routing to the 3 pages(Home, AddEdit and View). Home page displays a table that 
 * has all the vehicle discharge elements previously added and CRUD actions. The  
 * table is populated by the '/api/get/post' API in index.js file in the server folder.
 * The AddEdit page adds('api/get/post') or updates('api/get/update') vehicle discharge 
 * elements and the View('api/get') page displays a summary of the data.
 */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/add' element={<AddEdit/>}></Route>
        <Route path='/update/:id' element={<AddEdit/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
      </Routes>
    </div>    
    </BrowserRouter> 
  );
}

export default App;
