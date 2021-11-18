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



export function validateFilmTitle(title) {
  if (title.length < 1) {
    return "Title is required";
  }
  if (title.length > 100) {
    return "Title is too long";
  }
  //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
   if (!/^[a-zA-Z0-9 -]+$/.test(title)) {
      return "Title contains invalid characters";
   }

  return null;
}


export function validateFilmSemester(semester) {
  if (semester.length === 3) {
    return "A semester must have a length of 3";
  }
  //check that a semester is F, W, or S, followed by 2 numbers
   if (!/^[FWS][0-9][0-9]$/.test(semester)) {
      return "Semester must be in the format FYY or WYY or SYY";
   }
  //check that the semester year is valid (that is is not in the future)
   const year = parseInt(semester.substring(1, 3)) + 2000;
   if (year > new Date().getFullYear() + 1) { //not sure if we need this +1 but it might help on the edge cases
      return "Semester year must be in the past";
   }  

   return null;

}


export function validateFilmGenre(genre) {
   if (genre.length < 1) {
      return "Genre is required";
   }
   if (genre.length > 100) {
      return "Genre is too long";
   }
   //check for invalid characters with regex, allow letters and dashes
   if (!/^[a-zA-Z-]+$/.test(genre)) {
      return "Genre contains invalid characters";
   }

   return null;
}


export function validateFilmCourse(course) {
   if (course.length < 1) {
      return "Course is required";
   }
   if (course.length > 100) {
      return "Course is too long";
   }
   //check for invalid characters with regex, allow letters, spaces, dashes, and punctuation
   if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(course)) {
      return "Course contains invalid characters";
   }s

   return null;
}


export function validateFilmLogLine(logLine) {
   if (logLine.length < 1) {
      return "Log-Line is required";
   }
   if (logLine.length > 160) {
      return "Log-Line is too long";
   }
   //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
   if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(logLine)) {
      return "Log-Line contains invalid characters";
   }

   return null;
}



export function validateFilmOverview(overview) {
   if (overview.length < 1) {
      return "Overview is required";
   }
   if (overview.length > 1000) {
      return "Overview is too long";
   }
   //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
   if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(overview)) {
      return "Overview contains invalid characters";
   }

   return null;
}


export function validateFilmActors(actors) {
   if (actors.length < 1) {
      return "Actors are required";
   }
   if (actors.length > 1000) {
      return "Actors is too long";
   }
   //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
   if (!/^[a-zA-Z0-9 -,]+$/.test(actors)) {
      return "Actors contains invalid characters";
   }
   //require all names to be separated by a comma
   if (!/^[a-zA-Z0-9 -,]+(,[a-zA-Z0-9 -,]+)*$/.test(actors)) {
      return "Actors must be separated by commas";
   }

   return null;
}