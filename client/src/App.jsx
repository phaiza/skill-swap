import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddSkills from './pages/AddSkills';
import FindMatch from './pages/FindMatch';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        import AddSkills from './pages/AddSkills';
        <Route
          path="/add-skills"
          element={
            <PrivateRoute>
              <AddSkills />
            </PrivateRoute>
          }
        />
        <Route
          path="/find-match"
          element={
            <PrivateRoute>
              <FindMatch />
            </PrivateRoute>
          }
        />
        <Route
          path="/find-match"
          element={
            <PrivateRoute>
              <FindMatch />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
