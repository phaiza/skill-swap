import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function AddSkills() {
  const [form, setForm] = useState({ name: '', level: 'Beginner' });
  const { token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add skill');

      setMessage('✅ Skill added successfully!');
      setForm({ name: '', level: 'Beginner' });
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Add a New Skill
      </h2>

      {message && (
        <p
          className={`text-sm mb-4 ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <input
        name="name"
        placeholder="Skill name (e.g. JavaScript)"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 border border-gray-300 rounded"
      />

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
        className="w-full mb-4 p-3 border border-gray-300 rounded"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Add Skill
      </button>
    </form>
  );
}

export default AddSkills;
