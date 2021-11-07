//https://stackoverflow.com/a/1054862
export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

//uri component that returns null if a URI cannot be converted to a valid string
export function decodeURIComponentSafe(str) {
   try {
      return decodeURIComponent(str);
   } catch (e) {
      return null;
   }
}

