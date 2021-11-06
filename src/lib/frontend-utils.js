//https://stackoverflow.com/a/1054862
export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

//uri component that returns null if a string cannot be converted to a valid URI
export function decodeURIComponentSafe(str) {
   try {
      return decodeURIComponent(str);
   } catch (e) {
      return null;
   }
}

