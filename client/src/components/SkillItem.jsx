import { useState } from 'react';

function SkillItem({ skill, token, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: skill.name, level: skill.level });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5001/api/skills/${skill._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const updated = await res.json();
    onUpdate(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5001/api/skills/${skill._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      onDelete(skill._id);
    }
  };

  return (
    <li style={{ marginBottom: '1rem' }}>
      {editing ? (
        <div>
          <input name="name" value={form.name} onChange={handleChange} />
          <select name="level" value={form.level} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>{skill.name}</strong> — {skill.level}{' '}
          <button onClick={() => setEditing(true)}>Edit</button>{' '}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default SkillItem;
