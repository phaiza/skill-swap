import Skill from '../models/Skill.js';
import jwt from 'jsonwebtoken';

export const addSkill = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, level } = req.body;

    const skill = await Skill.create({
      userId: decoded.id,
      name,
      level,
    });

    res.status(201).json(skill);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token or server error' });
  }
};
