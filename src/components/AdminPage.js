
import { useState } from "react";

export default function AdminPage({ films, adminFunc }) {
    const [update, refresh] = useState(true);

    return (
        <div style={{padding:"40px"}}>
            <h1>Films in the MIMDB Database</h1>
            <table margin="2 auto"
            fontSize="large"
            border="1px solid black">
                <thead>
                    <tr>
                    <th>Approved</th>
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
                {films.map((film) => 
                    <tr key={film.id}>
                    {//onchange will be updated when merged with the new api calls
                        film.approveBoolean ? 
                        <td>
                        <p style={{color: "green"}}>Approved</p>
                        <button onClick={() => {adminFunc("reject", film); refresh(!update)}}>Reject</button>
                        </td> :
                        <td>
                        <p style={{color: "red"}}>Not approved</p>
                        <button onClick={() => {adminFunc("approve", film); refresh(!update)}}>Approve</button>
                        </td>
                    }
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