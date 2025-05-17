import express from 'express';
import {
  addSkill,
  getUserSkills,
  deleteSkill,
  updateSkill,
} from '../controllers/skillController.js';
import { findMatches } from '../controllers/skillController.js';

const router = express.Router();
router.post('/', addSkill);
router.get('/', getUserSkills); // GET /api/skills
router.delete('/:id', deleteSkill); // DELETE /api/skills/:skillId
router.put('/:id', updateSkill); // PUT /api/skills/:skillId
router.get('/matches', findMatches); // GET /api/skills/matches
export default router;
