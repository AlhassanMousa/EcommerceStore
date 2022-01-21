import { Route , BrowserRouter, Routes } from 'react-router-dom';
import { Home } from './Components/Home';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Notfound } from './Components/Notfound';
import { AddProducts } from './Components/AddProducts';
import './App.css';
import { Cart } from './Components/Cart';


function App() {




  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="Signup" element={<Signup/>} />
      <Route path="Login" element={<Login/>} />
      <Route path="AddProducts" element={<AddProducts/>} />
      <Route path="/cart" element={<Cart />}/>       

      <Route path="Notfound" element={<Notfound/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
