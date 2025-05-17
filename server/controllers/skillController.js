import Skill from '../models/Skill.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const findMatches = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get logged-in user's skills
    const mySkills = await Skill.find({ userId: decoded.id });

    const skillNames = mySkills.map((s) => s.name);

    // Find other users with matching skill names
    const matches = await Skill.find({
      name: { $in: skillNames },
      userId: { $ne: decoded.id }, // exclude current user
    }).populate('userId', 'name email'); // bring user info

    // Group matches by user
    const usersMap = {};
    matches.forEach((match) => {
      const uid = match.userId._id;
      if (!usersMap[uid]) {
        usersMap[uid] = {
          user: match.userId,
          skills: [],
        };
      }
      usersMap[uid].skills.push({ name: match.name, level: match.level });
    });

    const result = Object.values(usersMap);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
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

export const getUserSkills = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const skills = await Skill.find({ userId: decoded.id }).sort({
      createdAt: -1,
    });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token or server error' });
  }
};
export const deleteSkill = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      userId: decoded.id,
    });

    if (!skill) return res.status(404).json({ msg: 'Skill not found' });

    res.json({ msg: 'Skill deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
export const updateSkill = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, level } = req.body;

    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: decoded.id },
      { name, level },
      { new: true }
    );

    if (!updatedSkill) return res.status(404).json({ msg: 'Skill not found' });

    res.json(updatedSkill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
