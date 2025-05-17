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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Find Skill Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-600">
          No matches found yet. Add some skills or check back later!
        </p>
      ) : (
        <ul className="space-y-6">
          {matches.map((match) => (
            <li
              key={match.user._id}
              className="border border-gray-200 p-4 rounded shadow-sm bg-white"
            >
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {match.user.name}
                </h3>
                <p className="text-sm text-gray-500">{match.user.email}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Shared Skills:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {match.skills.map((skill, index) => (
                    <li key={index}>
                      {skill.name}{' '}
                      <span className="italic text-gray-500">
                        ({skill.level})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindMatch;
