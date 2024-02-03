import './App.css';
import Navbar from "./components/navbar"; 
import { Route ,Routes} from 'react-router-dom';
import { SearchPage } from './components/search_page.js';
import { ApplyPatent } from './components/apply.js';
import Form from './components/form';
const App = () => {
  return (
    <>
    <Navbar />
      <div>
      <Routes>
    <Route path='/home' element={<SearchPage />} /> 
    <Route path='/search' element={<SearchPage />} />
    <Route path='/apply' element={<ApplyPatent />} />
    <Route path='/profile' element={<SearchPage />} />
      <Route path='/form' element={<Form />} />
  </Routes>
      </div>
    </>
  );
  
};

export default App;