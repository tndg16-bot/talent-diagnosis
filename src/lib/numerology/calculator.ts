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
