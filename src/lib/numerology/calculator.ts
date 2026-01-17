export function calcLifePathNumber(birthDate: string): number {
    // YYYY-MM-DD or YYYY/MM/DD format
    const digits = birthDate.replace(/[-/]/g, '').split('').map(Number);

    // Calculate initial sum
    let sum = digits.reduce((a, b) => a + b, 0);

    // Reduce recursively until single digit or master number (11, 22, 33)
    while (sum > 9 && ![11, 22, 33].includes(sum)) {
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return sum;
}

/**
 * Calculates current year cycle number (Personal Year Number)
 * Formula: Birth Month + Birth Day + Current Year -> Reduced
 */
export function calcPersonalYearNumber(birthDate: string, targetYear: number): number {
    const date = new Date(birthDate);
    // Note: getMonth() is 0-indexed, but for numerology we just need the number (e.g. Jan = 1)
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const numString = `${month}${day}${targetYear}`;
    const digits = numString.split('').map(Number);

    let sum = digits.reduce((a, b) => a + b, 0);

    while (sum > 9 && ![11, 22, 33].includes(sum)) {
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return sum;
}

// Letter to number mapping for numerology (Pythagorean system)
const LETTER_VALUES: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/**
 * Reduces a number to single digit or master number (11, 22, 33)
 */
function reduceToSingleOrMaster(num: number): number {
    while (num > 9 && ![11, 22, 33].includes(num)) {
        num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return num;
}

/**
 * Calculates Soul Number (Heart's Desire Number) from name
 * Uses only VOWELS (A, E, I, O, U)
 * Represents inner desires, motivations, and what the soul yearns for
 */
export function calcSoulNumber(name: string): number | null {
    if (!name || name.trim().length === 0) return null;

    const upperName = name.toUpperCase().replace(/[^A-Z]/g, '');
    if (upperName.length === 0) return null;

    let sum = 0;
    for (const letter of upperName) {
        if (VOWELS.has(letter)) {
            sum += LETTER_VALUES[letter] || 0;
        }
    }

    if (sum === 0) return null;
    return reduceToSingleOrMaster(sum);
}

/**
 * Calculates Personality Number (Outer Personality) from name
 * Uses only CONSONANTS (all letters except vowels)
 * Represents how others perceive you, your outward expression
 */
export function calcPersonalityNumber(name: string): number | null {
    if (!name || name.trim().length === 0) return null;

    const upperName = name.toUpperCase().replace(/[^A-Z]/g, '');
    if (upperName.length === 0) return null;

    let sum = 0;
    for (const letter of upperName) {
        if (!VOWELS.has(letter)) {
            sum += LETTER_VALUES[letter] || 0;
        }
    }

    if (sum === 0) return null;
    return reduceToSingleOrMaster(sum);
}

