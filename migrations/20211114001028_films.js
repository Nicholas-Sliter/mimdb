
exports.up = function(knex) {
  return knex.schema.createTable("Film", table => {
    table.string("backdrop_path");
    table.string("title").unique().notNullable();
    table.integer("id").unique().notNullable();
    table.string("slug").unique().notNullable();
    table.text("overview");
    table.string("description");
    table.string("poster_path");
    table.string("release_date").notNullable();
    table.boolean("video");
    table.string("vimeo_id");
    table.string("duration").notNullable();

    // table.specificType("genre", "string ARRAY");
    // table.specificType("language", "string ARRAY");
    // table.specificType("course", "string ARRAY");
    // table.specificType("directors", "string ARRAY");
    // table.specificType("actors", "string ARRAY");
    // table.specificType("contributors", "string ARRAY");
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
    table.string("course_name");
    table.string("course_number");
    table.string("course_description");
  })
  .createTable("Directors", table => {
    table.string("director_name");
    table.string("director_bio");
    table.string("director_midd_email");
    table.string("director_personal_email");
    table.string("director_graduation_year");
  })
  .createTable("CourseFilm", table => {
    // Affiliation table for Course and Film, two foreign keys
    table.string("course_name");
    table.integer("film_id");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
    table.foreign("course_name").references("Course.course_name").onDelete("CASCADE");
  })
  .createTable("DirectorsFilm", table => {
    // Affiliation table for Directors and Film, two foreign keys
    table.string("director_name");
    table.integer("film_id");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
    table.foreign("director_name").references("Director.director_name").onDelete("CASCADE");
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Film")
                    .dropTableIfExists("Genre")
                    .dropTableIfExists("Course")
                    .dropTableIfExists("Directors")
                    .dropTableIfExists("Actors")
                    .dropTableIfExists("Contributors");
};
