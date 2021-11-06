import './App.css';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPanel from './Components/SearchPanel/SearchPanel';
import BasicExport from './Components/Reports/BasicExport';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <SearchPanel></SearchPanel> 
    </>
  );
}

export default App;
