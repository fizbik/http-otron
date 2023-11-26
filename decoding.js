export const defaultTextPatterns = [/^text\//, /^application\/xml/, /^image\/svg/];
export const defaultJsonPatterns = [/^application\/json/];
export const defaultBlobPatterns = [
  /^image\//,
  /^application\/octet/,
  /^application\/pdf/,
  /^application\/zip/,
];

export function matchesContentType(ct, ctPatterns) {
  let matches = false;
  for (let p of ctPatterns) {
    if (p.test(ct)) {
      matches = true;
      break;
    }
  }
  return matches;
}
