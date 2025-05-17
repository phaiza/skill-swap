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
      <div className="text-center mt-10">
        <p className="text-gray-700">
          You are not logged in. Please{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-2">
        Hello, {user.name} 👋
      </h2>
      <p className="text-gray-600 mb-6">Welcome to your SkillSwap dashboard!</p>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
        >
          View Profile
        </button>
        <button
          onClick={() => navigate('/add-skills')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Skills
        </button>
        <button
          onClick={() => navigate('/find-match')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Find Matches
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Your Skills</h3>

        {skills.length === 0 ? (
          <p className="text-gray-500">You haven’t added any skills yet.</p>
        ) : (
          <ul className="space-y-4">
            {skills.map((skill) => (
              <SkillItem
                key={skill._id}
                skill={skill}
                token={token}
                onUpdate={(updated) =>
                  setSkills(
                    skills.map((s) => (s._id === updated._id ? updated : s))
                  )
                }
                onDelete={(id) => setSkills(skills.filter((s) => s._id !== id))}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
