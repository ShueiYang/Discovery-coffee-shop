
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function upvoteFoundIn(obj) {
    return Object.hasOwn(obj[0], "voting")
}

// fix issue from Fourquare API sometimes Unicode is showed in the string
export function fixFrenchSpecialFont(str) {
    const chars = {
        '\\u00e9': 'é',
        '\\u00e0': 'à',
        '\\u00e7': 'ç',
        '\\u00e8': 'è',
        '\\u00f9': 'ù',
    }
    return str?.replace(/\\u00e9|\\u00e0|\\u00e7|\\u00e8|\\u00f9/g, u => chars[u]);
}