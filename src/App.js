import Home from "./screens/Home";
import { Route, Routes } from 'react-router-dom'
import Profile from "./screens/Profile";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default App;
