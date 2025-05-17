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
    <li className="p-4 border border-gray-200 rounded shadow-sm">
      {editing ? (
        <div className="space-y-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <strong>{skill.name}</strong> — {skill.level}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default SkillItem;
