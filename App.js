import './App.css';
import Navbar from "./components/navbar"; 
import { Route ,Routes} from 'react-router-dom';
import { SearchPage } from './components/search_page.js';
import { ApplyPatent } from './components/apply.js';
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
  </Routes>
      </div>
    </>
  );
  
};

export default App;