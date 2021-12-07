
import { useState, useEffect } from "react";

export default function AdminPage() {
    const [filmData, setData] = useState([]);

    const adminFunc = async(apiCall, film) => {
        if(film) {
            const response = await fetch(`/api/films/${film.slug}/${apiCall}`, {
            method: "PUT",
            body: JSON.stringify(film),
            headers: new Headers({ "Content-Type": "application/json" })
            })
            console.log("here")

            if (!response.ok) {
                throw new Error(response.statusText)
            }
        }
    }


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
                {filmData.map((film) => 
                    <tr key={film.id}>
                    {//onchange will be updated when merged with the new api calls
                        film.approveBoolean ? 
                        <td>
                        <p style={{color: "green"}}>Approved</p>
                        <button onChange={() => adminFunc("approve", film)}>Reject</button>
                        </td> :
                        <td>
                        <p style={{color: "red"}}>Not approved</p>
                        <button onChange={() => adminFunc("reject", film)}>Approve</button>
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