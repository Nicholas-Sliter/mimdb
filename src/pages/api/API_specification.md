# API specifiction
- All API impelentations will be migrated from using json to database later on.

- getting individual film in `/api/films`
    - Example usage:
        - `/api/films/35`
        - `/api/films/5`

- getting filtering film in `/api/films`
    - Example usage: 
        - `/api?class=Sight%20and%20Sound` (%20 is equivalent to a space)
        - `/api?class=Sight%20and%20Sound&director=Wayne%20Wang"`
    - Filter all movies and return the ones that match the filter. This differs from searching by requiring exact parameter and it retrieves directly from the json/database without going through the search engine.
    

- searching in `/api/search`
    - Example usage: 
        - `/api/search?generalTerm=Inception`
    - Search parameters should be provided in the query. e.g. "/api/search?generalTerm=Inception"
    - Currently supporting the following parameters:
        - generalTerm: a string of the search term that searches on all keys of a film(titles, actors, class ...) given the general search term.
