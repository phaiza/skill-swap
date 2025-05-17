import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function FindMatch() {
  const { token } = useSelector((state) => state.auth);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch('http://localhost:5001/api/skills/matches', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMatches(data);
    };

    if (token) fetchMatches();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>🔍 Find Skill Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found yet. Add some skills or check back later!</p>
      ) : (
        <ul>
          {matches.map((m) => (
            <li key={m.user._id} style={{ marginBottom: '1.5rem' }}>
              <strong>{m.user.name}</strong> — {m.user.email}
              <ul>
                {m.skills.map((s, index) => (
                  <li key={index}>
                    {s.name} ({s.level})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindMatch;
