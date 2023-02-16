import Home from "./screens/Home";
import { Route, Routes } from 'react-router-dom'
import Profile from "./screens/Profile";
import TestApi from "./screens/TestApi";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/test" element={<TestApi/>}/>
      </Route>
    </Routes>
  );
}

export default App;
