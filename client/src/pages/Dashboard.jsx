import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SkillItem from '../components/SkillItem';
function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/skills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      }
    };

    if (token) fetchSkills();
  }, [token]);

  if (!user) {
    return (
      <p>
        You are not logged in. Please <a href="/login">Login</a>.
      </p>
    );
  }

  return (
    <div className="dashboard">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Hello, {user.name} 👋
      </h2>

      <p>Welcome to your SkillSwap dashboard!</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/profile')}>View Profile</button>{' '}
        <button onClick={() => navigate('/add-skills')}>Add Skills</button>{' '}
        <button onClick={() => navigate('/find-match')}>Find Matches</button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Your Skills</h3>
      {skills.length === 0 ? (
        <p>You haven’t added any skills yet.</p>
      ) : (
        <ul>
          {skills.map((skill) => (
            <SkillItem
              key={skill._id}
              skill={skill}
              token={token}
              onUpdate={(updated) => {
                setSkills(
                  skills.map((s) => (s._id === updated._id ? updated : s))
                );
              }}
              onDelete={(id) => {
                setSkills(skills.filter((s) => s._id !== id));
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
