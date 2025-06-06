import { describe, it, expect } from 'vitest';
import { heroRoute } from './heroRoute';
import { heroData } from './heroData';

// Mock Express request and response
const createMockReq = (heroName: string) => ({
  params: { heroName }
});

const createMockRes = () => {
  const res: any = {
    status: (code: number) => {
      res.statusCode = code;
      return res;
    },
    json: (data: any) => {
      res.body = data;
      return res;
    }
  };
  return res;
};

describe('Hero Route', () => {
  it('should return Spider-Man details with correct case', () => {
    const req = createMockReq('spiderman');
    const res = createMockRes();

    heroRoute(req as any, res as any);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(heroData['spiderman']);
  });

  it('should return Spider-Man details with mixed case', () => {
    const req = createMockReq('SpiderMAN');
    const res = createMockRes();

    heroRoute(req as any, res as any);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(heroData['spiderman']);
  });

  it('should return 404 for non-existent hero', () => {
    const req = createMockReq('Batman');
    const res = createMockRes();

    heroRoute(req as any, res as any);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Hero not found');
  });
});