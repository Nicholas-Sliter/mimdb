
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
  .createTable("Language", table => {
    table.integer("film_id");
    table.string("lang_name");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Course", table => {
    table.integer("film_id");
    table.string("course_name");
    table.foreign("film_id").references("Film.id").onDelete("CASCADE");
  })
  .createTable("Directors", table => {
    table.integer("film_id");
    table.string("director_name");
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
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Film")
                    .dropTableIfExists("Genre")
                    .dropTableIfExists("Language")
                    .dropTableIfExists("Course")
                    .dropTableIfExists("Directors")
                    .dropTableIfExists("Actors")
                    .dropTableIfExists("Contributors");
};
