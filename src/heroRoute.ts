import { Request, Response } from 'express';
import { heroData } from './heroData';

/**
 * Handles dynamic hero route requests
 * @param req Express request object
 * @param res Express response object
 */
export const heroRoute = (req: Request, res: Response) => {
  // Extract hero name from request params and normalize
  const heroName = req.params.heroName.toLowerCase();

  // Check if hero exists (case-insensitive)
  const hero = heroData[heroName];

  // If hero not found, return appropriate error response
  if (!hero) {
    return res.status(404).json({
      error: 'Hero not found',
      message: `No hero found with name: ${req.params.heroName}`
    });
  }

  // Return hero information
  return res.status(200).json(hero);
};