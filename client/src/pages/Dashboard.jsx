import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <p>
        You are not logged in. Please <a href="/login">Login</a>.
      </p>
    );
  }

  return (
    <div>
      <h2>Hello, {user.name} 👋</h2>
      <p>Welcome to your SkillSwap dashboard!</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/profile')}>View Profile</button>{' '}
        <button onClick={() => navigate('/add-skills')}>Add Skills</button>{' '}
        <button onClick={() => navigate('/find-match')}>Find Matches</button>
      </div>
    </div>
  );
}

export default Dashboard;
