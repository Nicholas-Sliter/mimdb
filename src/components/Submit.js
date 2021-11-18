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
        <div className={styles.group2}>
            <div className={styles.largeInput}> 
                <TextInput name="Title" setFunc={setTitle}/>
            </div>
            <div className={styles.largeInput}> 
                <TextInput name="Log-Line" setFunc={setLogLine}/>
            </div>
            <div className={styles.largeInput}>
                <TextInput name={"Semester"} moreText="eg. F21, W22, S22, etc."/>
            </div>
            <div className={styles.largeInput}>
                <TextInput name={"Duration"} moreText="minutes"/>
            </div>
        </div>
        <div className={styles.largeTextarea}> 
            <TextArea name="Overview" setFunc={setOverview}/>
        </div>
        <div className={styles.group2}>
            <div>
                <Checkboxes name="Genre" array={genres} newVar={newGenre} setFunc={addGenre}/>
            </div>
            <div>
                <Checkboxes name="Course" array={courses} newVar={newCourse} setFunc={addCourse}/>
            </div>
        </div>
        <div className={styles.group3}>
            <div className={styles.smallInput}>
                <AddedText name="Director"/>
            </div>
            <div className={styles.smallInput}>
                <AddedText name="Actor"/>
            </div>
            <div className={styles.smallInput}>
                <AddedText name="Contributor"/>
            </div>
        </div>
        <br />
        <button onClick={() => { router.push("/") }}> Cancel </button>
    </div>
    )
}