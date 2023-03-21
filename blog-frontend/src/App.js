import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Err404 from './components/Err404';
import Guest from './components/Guest';
import GuestPrivate from './components/GuestPrivate';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Private from './components/Private';
import Signup from './components/Signup';
import UserState from './context/UserState';


function App() {

 
  return (
    <div className="App">
      <HashRouter>
        <UserState>
          <Navbar></Navbar>
        <Routes>
          <Route element={<Private></Private>}>  
          {/* create private routing */}

          <Route strict path='/home' element={<Home></Home>}></Route>
          </Route>
          <Route element={<GuestPrivate></GuestPrivate>}>
          <Route  path='/posts' element={<Posts></Posts>}></Route>

          </Route>

          <Route strict path='/' element={<Signup></Signup>}></Route>
          <Route strict path='/login' element={<Login></Login>}></Route>
          <Route strict path='/guest' element={<Guest></Guest>}></Route>
          <Route path='*' element={<Err404></Err404>}></Route>

          

        </Routes>
        </UserState>
      </HashRouter>
    </div>
  );
}

export default App;
