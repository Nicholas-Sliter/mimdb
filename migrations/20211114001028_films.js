
exports.up = function(knex) {
  return knex.schema.createTable("Film", table => {
    table.string("backdrop_path");
    table.string("title").unique().notNullable();
    table.increments("id");
    table.string("slug").unique().notNullable();
    table.text("overview");
    table.string("description");
    table.string("poster_path");
    table.string("term");
    table.string("release_date");
    table.boolean("video");
    table.string("vimeo_id");
    table.string("duration").notNullable();
  })
  .createTable("Genre", table => {
    table.integer("film_id");
    table.string("genre_name");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Actors", table => {
    table.integer("film_id");
    table.string("actor_name");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Contributors", table => {
    table.integer("film_id");
    table.string("contributor_name");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Course", table => {
    table.string("course_name").unique().notNullable();
    table.string("course_number").unique().notNullable();
    table.text("course_description");
  })
  .createTable("Directors", table => {
    table.string("director_name");
    table.integer("director_id").unique().notNullable();
    table.string("director_bio");
    table.string("director_midd_email");
    table.string("director_personal_email");
    table.string("director_graduation_year");
  })
  .createTable("CourseFilm", table => {
    // Affiliation table for Course and Film, two foreign keys
    table.integer("film_id");
    table.string("course_number");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
    table.foreign("course_number").references("Course.course_number").onDelete("CASCADE");
  })
  .createTable("DirectorsFilm", table => {
    // Affiliation table for Directors and Film, two foreign keys
    table.integer("film_id");
    table.integer("director_id");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
    table.foreign("director_id").references("Directors.director_id").onDelete("CASCADE");
  })
  .createTable("Poster", table => {
    table.integer("film_id").unique().notNullable();
    table.string("poster_data").notNullable();
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Backdrop", table => {
    table.integer("film_id").unique().notNullable();
    table.string("Backdrop_data").notNullable();
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Film")
                    .dropTableIfExists("Genre")
                    .dropTableIfExists("Actors")
                    .dropTableIfExists("Contributors")
                    .dropTableIfExists("Course")
                    .dropTableIfExists("Directors")
                    .dropTableIfExists("CourseFilm")
                    .dropTableIfExists("DirectorsFilm")
                    .dropTableIfExists("Poster")
                    .dropTableIfExists("Backdrop");
};
