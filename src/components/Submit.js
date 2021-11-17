import React, { useState } from "react";
import router from "next/router";
import { validateFilmSemester } from "../lib/frontend-utils";

import styles from "../styles/SubmitPage.module.css";

export default function Submit({ genres, courses }) {
    const [title, setTitle] = useState();
    const [logLine, setLogLine] = useState();
    const [overview, setOverview] = useState();
    const [newGenre, addGenre] = useState(false);
    const [newCourse, addCourse] = useState(false);

    return (
        <div className={styles.submitPage}>
            <form>
                <label htmlFor="title"> Title: </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title must be set"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br /><br />
                <label htmlFor="logLine"> Log-Line: </label>
                <input
                    type="text"
                    id="logLine"
                    placeholder="Log-Line must be set"
                    onChange={(event) => setLogLine(event.target.value)}
                />
                <br /><br />
                <label htmlFor="overview"> Overview: </label><br />
                <textarea className={styles.textarea}
                    id="overview"
                    placeholder="Overview of Film"
                    onChange={(event) => setOverview(event.target.value)}

                />
                <br /><br />
                <label htmlFor="genres"> Genre: </label>
                <div id="genres">
                    {genres.map((genre) =>
                        <div key={genre}>
                            <input
                                type="checkbox"
                                id={genre}
                                name={genre}
                                value={genre}
                            />
                            <label htmlFor={genre}>{genre}</label><br />
                        </div>
                    )}
                    <input
                        type="checkbox"
                        id="other1"
                        name="other1"
                        value="other1"
                        onClick={() => addGenre(!newGenre)}
                    />
                    <label htmlFor="other1">Other</label>
                    {newGenre ? <input
                        type="text"
                        id="otherText1"
                        placeholder="Other"
                    />
                        : <div> </div>}
                </div>
                <br /><br />
                <label htmlFor="courses"> Course: </label>
                <div id="courses">
                    {courses.map((course) =>
                        <div key={course}>
                            <input
                                type="checkbox"
                                id={course}
                                name={course}
                                value={course}
                            />
                            <label htmlFor={course}>{course}</label><br />
                        </div>
                    )}
                    <input
                        type="checkbox"
                        id="other2"
                        name="other2"
                        value="other2"
                        onClick={() => addCourse(!newCourse)}
                    />
                    <label htmlFor="other2">Other</label>
                    {newCourse ? <input
                        type="text"
                        id="otherText2"
                        placeholder="Other"
                    />
                        : <div> </div>}
                </div>
                <br /> <br />
                <label htmlFor="directors"> Directors: </label><br />
                <textarea
                    id="directors"
                    placeholder="Directors (multiple director names separated by commas)"
                    onChange={(event) => setOverview(event.target.value)}
                    rows="5"
                    cols="100"
                />
                <br /><br />
                <label htmlFor="actors"> Actors: </label><br />
                <textarea
                    id="actors"
                    placeholder="Actors (multiple actor names separated by commas)"
                    //onChange={(event) => setOverview(event.target.value)}
                    rows="5"
                    cols="100"
                />
                <br /><br />
                <label htmlFor="contributors"> Contributors: </label><br />
                <textarea
                    id="contributors"
                    placeholder="Contributors (multiple contributor names separated by commas)"
                    //onChange={(event) => setOverview(event.target.value)}
                    rows="5"
                    cols="100"
                />
                <br /><br />
                <label htmlFor="semester"> Semester released: </label>
                <input
                    type="text"
                    id="semester"
                    placeholder="eg. F21, W22, S22, etc."
                />
                <br /><br />
                <label htmlFor="duration"> Duration: </label>
                <input
                    type="number"
                    id="duration"
                    placeholder="minutes"
                />
                <br /><br />

                <input
                    type="submit"
                    disabled={(title && logLine && overview) ? false : true}
                    value="Submit"
                    onClick={() => { }}
                />

                <br />
                <button onClick={() => { router.back() }}> Cancel </button>
            </form>
        </div>
    )
}