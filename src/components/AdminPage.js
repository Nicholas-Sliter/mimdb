
import { useState, useEffect } from "react";

export default function AdminPage() {
    const [filmData, setData] = useState([]);

    useEffect(() => {
        try {
            const resolveQuery = async () => {
            const res = await fetch("/api/films");

            if (!res.ok) {
                throw new Error("Could not complete request");
            }

            const data = await res.json();
            setData(data);
            };
            resolveQuery();
        } catch (err) {
        setData([]);
        }
    }, []);
    console.log(filmData)
    
    return (
        <div>
            <h1>Films in the MIMDB Database</h1>
            <table margin="2vw auto"
            fontSize="large"
            border="1px solid black">
                <thead>
                    <tr>
                    <th>Authorized</th>
                    <th>Title</th>
                    <th>Overview</th>
                    <th>Term</th>
                    <th>Duration</th>
                    <th>Genres</th>
                    <th>Course</th>
                    <th>Directors</th>
                    <th>Actors</th>
                    <th>Contributors</th>
                    </tr>
                </thead>
                <tbody>
                {filmData.map((film) => 
                    <tr key={film.id}>
                    <td>{film["authorized"]}</td>
                    <td>{film["title"]}</td>
                    <td>{film["overview"]}</td>
                    <td>{film["term"]}</td>
                    <td>{film["duration"]}</td>
                    <td>{film["genres"]}</td>
                    <td>{film["course"]}</td>
                    <td>{film["directors"]}</td>
                    <td>{film["actors"]}</td>
                    <td>{film["contributors"]}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}