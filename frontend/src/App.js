import './App.css';
import UserPage from './component/userPage/user';
import Teampage from './component/teamPage/teampage';
import { BrowserRouter, Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<UserPage />} />
          <Route path="/Teampage" exact element={<Teampage />} />
          </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
