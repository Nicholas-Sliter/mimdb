const fs = require("fs");

exports.seed = async function (knex) {
  // Loading database "Course", "Directors"
  const courseContents = fs.readFileSync("./data/courses.json");
  const courses = JSON.parse(courseContents);

  await knex("Course").del();
  await knex.batchInsert("Course", courses, 100);
};