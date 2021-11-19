# API specifiction
- All API impelentations will be migrated from using json to database later on.

- getting individual film in `/api/films/[slug]`
    - Example usage:
        - `/api/films/justice-league-dark-apokolips-war`
        - `/api/films/spider-man-into-the-spider-verse`
    - Return value: a film object

- getting filtered films in `/api/films?[filter]=[value]`
    - Example usage: 
        - `/api?course=Sight%20and%20Sound` (%20 is equivalent to a space)
        - `/api?genre=Drama&director=Wayne%20Wang`
    - Return value: a list of film objects
    - Note: 
        - Now supports multiple filters per query
        - Supported fiels: "genre", "course", "director", "actor", "contributor".
        - MIND SINGULAR VS PLURAL!!
        - For performance, when the API is called, filters should be sequenced from the most specific to the most specific.
        - If a film has a field with a list of values, any match results in a positive match. For example, if a film has `directors: ["John", "Emily"]`, a filter `director=Emily` will result in a positive match for this film.
        

- searching in `/api/search?keyword=[search_term]`
    - Example usage: 
        - `/api/search?keyword=Inception`
        - `/api/search?keyword=drama`
        - `/api/search?keyword=love`
    - Return value: A list of all results
        - Each result is an object with three fields:
            - "item": the film object
            - "refIndex": the index of the result film in the searched films array
            - "score": the score Fuse gives to the result, ranging from 0 to 1 (a lower value means a more accurate match)
        - Example return: (film objects are replaced by filmObject1, filmObject2... to save space)
            - [{"item":{filmObject1},"refIndex":0,"score":2.220446049250313e-16},{"item":{filmObject2},"refIndex":5,"score":2.220446049250313e-16}
    - Note: Performs fuzzy search using Fuse.js on the given search term on all fields of a film object. "Fuzzy" indicates case-insensitive and typo-tolerable.

- Getting all genres present in the film database in `/api/genres`
    - Return value: a list of all genres present in all movies