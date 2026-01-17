import {
  calcLifePathNumber,
  calcSoulNumber,
  calcPersonalityNumber,
  calcPersonalYearNumber,
} from '../calculator';

describe('Numerology Calculator', () => {
  // --- calcLifePathNumber ---
  describe('calcLifePathNumber', () => {
    it('calculates a standard life path number', () => {
      // 1+9+9+0+0+1+0+1 = 21 => 2+1=3
      expect(calcLifePathNumber('1990-01-01')).toBe(3);
    });

    it('correctly identifies master number 11', () => {
      // 1+9+8+2+0+1+0+7 = 28. Oops, my math was wrong. Let's find a real one.
      // 1983-05-02 => 1+9+8+3+5+2 = 28 => 10 => 1.
      // Let's try 1974-09-01 => 1+9+7+4+9+1 = 31 => 4
      // Let's try a known example: 1982-02-07 => 1+9+8+2+2+7 = 29. still not 11.
      // Ok, let's force it: 1955-01-03 => 1+9+5+5+1+3 = 24 => 6
      // Let's use a known famous person with 11: 1981-02-17 (Harry Styles) => 1+9+8+1+2+1+7 = 29 => 11
      expect(calcLifePathNumber('1981-02-17')).toBe(11);
    });

    it('correctly identifies master number 22', () => {
      // Paul McCartney: 1942-06-18 => 1+9+4+2+6+1+8 = 31 => 4. Not 22.
      // Let's find one. 1966-10-26 -> 1+9+6+6+1+0+2+6 = 31 => 4.
      // Let's try another: 1975-04-28 -> 1+9+7+5+4+2+8 = 36 -> 9
      // Ok, I'll construct one: sum needs to be 22, 31, 40 etc.
      // 1980-01-03 => 1+9+8+0+0+1+0+3 = 22
      expect(calcLifePathNumber('1980-01-03')).toBe(22);
    });
    
    it('correctly identifies master number 33', () => {
      // Sum needs to be 33.
      // 1989-03-03 => 1+9+8+9+3+3 = 33
      expect(calcLifePathNumber('1989-03-03')).toBe(33);
    });

    it('handles multiple reduction steps', () => {
      // 1999-12-29 => 1+9+9+9+1+2+2+9 = 42 => 4+2=6
      expect(calcLifePathNumber('1999-12-29')).toBe(6);
    });
  });

  // --- calcSoulNumber ---
  describe('calcSoulNumber', () => {
    it('calculates a standard soul number', () => {
      // TARO YAMADA -> Vowels: A, O, A, A, A -> 1+6+1+1+1 = 10 => 1
      expect(calcSoulNumber('TARO YAMADA')).toBe(1);
    });

    it('handles names with no vowels', () => {
      expect(calcSoulNumber('Rhythm')).toBe(null); // Y is not a vowel in this system
    });

    it('returns null for empty or invalid names', () => {
      expect(calcSoulNumber('')).toBe(null);
      expect(calcSoulNumber('   ')).toBe(null);
      expect(calcSoulNumber('123')).toBe(null);
    });
    
    it('calculates a master number soul number', () => {
        // Name with vowels summing to 11. E, I, A -> 5 + 9 + 1 = 15.
        // Let's try: A, I, A -> 1+9+1 = 11
        expect(calcSoulNumber('AIA')).toBe(11);
    });
  });

  // --- calcPersonalityNumber ---
  describe('calcPersonalityNumber', () => {
    it('calculates a standard personality number', () => {
      // TARO YAMADA -> T, R, Y, M, D -> 2+9+7+4+4 = 26 => 8
      expect(calcPersonalityNumber('TARO YAMADA')).toBe(8);
    });

    it('handles names with no consonants', () => {
      expect(calcPersonalityNumber('AIAEO')).toBe(null);
    });

    it('returns null for empty or invalid names', () => {
      expect(calcPersonalityNumber('')).toBe(null);
      expect(calcPersonalityNumber('   ')).toBe(null);
       expect(calcPersonalityNumber('123')).toBe(null);
    });

     it('calculates a master number personality number', () => {
        // Name with consonants summing to 22.
        // K, L, J -> 2+3+1=6.
        // Let's try: D, D, D, D, C, C, C, C -> 4*4 + 3*4 = 16+12=28.
        // Let's try just summing to 22. L, K, J -> 3,2,1 = 6.
        // D, D, G, G -> 4+4+7+7 = 22
        expect(calcPersonalityNumber('DD GG')).toBe(22);
    });
  });

  // --- calcPersonalYearNumber ---
  describe('calcPersonalYearNumber', () => {
    it('calculates a standard personal year number', () => {
        // 1990-01-01 in year 2024
        // Month=1, Day=1, Year=2024
        // 1 + 1 + 2 + 0 + 2 + 4 = 10 => 1
        expect(calcPersonalYearNumber('1990-01-01', 2024)).toBe(1);
    });
  });
});
