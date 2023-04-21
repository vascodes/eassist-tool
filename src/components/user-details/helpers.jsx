export function getIsValidAge(age) {
    const isValid = false;

    if (typeof age !== "number") return isValid;
    if (age > 100) return isValid;

    return true;
}