import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
      const res = await fetch('http://localhost:5001/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add skill');

      setMessage('Skill added successfully!');
      setForm({ name: '', level: 'Beginner' });
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Skill</h2>
      {message && <p>{message}</p>}
      <input
        name="name"
        placeholder="Skill name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <select name="level" value={form.level} onChange={handleChange}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>
      <button type="submit">Add Skill</button>
    </form>
  );
}

export default AddSkills;
