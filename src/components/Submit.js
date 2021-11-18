import React, { useState } from "react";
import router from "next/router";
import { validateFilmSemester } from "../lib/frontend-utils";
import TextInput from "./FilmSubmission/TextInput";
import TextArea from "./FilmSubmission/TextArea";
import Checkboxes from "./FilmSubmission/Checkboxes";
import AddedText from "./FilmSubmission/AddedText";

import styles from "../styles/SubmitPage.module.css";

export default function Submit({ genres, courses }) {
    const [title, setTitle] = useState();
    const [logLine, setLogLine] = useState();
    const [overview, setOverview] = useState();
    const [newGenre, addGenre] = useState(false);
    const [newCourse, addCourse] = useState(false);

    return (
    <div className={styles.submitPage}>
        <div> 
            <TextInput name="Title" setFunc={setTitle}/>
        </div>
        <div> 
            <TextInput name="Log-Line" setFunc={setLogLine}/>
        </div>
        <div>
            <TextInput name={"Semester"} moreText="eg. F21, W22, S22, etc."/>
        </div>
        <div>
            <TextInput name={"Duration"} moreText="minutes"/>
        </div>
        <div className={styles.largeTextarea}> 
            <TextArea name="Overview" setFunc={setOverview}/>
        </div>
        <div>
            <Checkboxes name="Genre" array={genres} newVar={newGenre} setFunc={addGenre}/>
        </div>
        <div>
            <Checkboxes name="Course" array={courses} newVar={newCourse} setFunc={addCourse}/>
        </div>
        <div>
            <AddedText name="Director"/>
        </div>
        <div>
            <AddedText name="Actor"/>
        </div>
        <div>
            <AddedText name="Contributor"/>
        </div>
        <br />
        <button onClick={() => { router.push("/") }}> Cancel </button>
    </div>
    )
}