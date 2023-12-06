// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Layout from './layout/Layout';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Layout>
        <div className="h-screen w-screen">
          <img src={SFMap} alt="SF Map background" className="h-full w-full object-cover" />
        </div>
      </Layout> */}
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
