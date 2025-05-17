import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;
  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      {!isLoggedIn && (
        <>
          {' '}
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>{' '}
          |
        </>
      )}{' '}
      <Link to="/profile">Profile</Link> |{' '}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
