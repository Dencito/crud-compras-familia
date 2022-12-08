import './App.css';

//importamos nuestros componentes
import Show from './components/show';
import Edit from './components/edit';
import Create from './components/create';

//importamos router
import { BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App mt-2">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show/>} />
          <Route path='/crear-hosting' element={<Create/>} />
          <Route path='/editar/:id' element={<Edit/>} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
