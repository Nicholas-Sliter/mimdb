import React, { useState } from "react";
import router from "next/router";
import { validateFilmSemester } from "../lib/frontend-utils";
import TextInput from "./FilmSubmission/TextInput";
import TextArea from "./FilmSubmission/TextArea";
import Checkboxes from "./FilmSubmission/Checkboxes";

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
        <div> 
            <TextInput name="Title" setFunc={setTitle}/>
        </div>
        <div> 
            <TextInput name="Log-Line" setFunc={setLogLine}/>
        </div>
        <br /><br />
        <div className={styles.largeTextarea}> 
            <TextArea name="Overview" setFunc={setOverview}/>
        </div>
        <br /><br />
        <div>
            <Checkboxes name="Genre" array={genres} newVar={newGenre} setFunc={addGenre}/>
        </div>
        <br /><br />
        <div>
            <Checkboxes name="Course" array={courses} newVar={newCourse} setFunc={addCourse}/>
        </div>
        
    
       <br /> <br />
       <label htmlFor="directors"> Directors: </label><br />
        <textarea className={styles.smallTextarea}
            id="directors"
            placeholder="Directors (multiple director names separated by commas)"
            onChange={(event) => setOverview(event.target.value)}
            rows="5"
            cols="100"
            />
        <br /><br /> 
        <label htmlFor="actors"> Actors: </label><br />
        <textarea className={styles.smallTextarea}
            id="actors"
            placeholder="Actors (multiple actor names separated by commas)"
            //onChange={(event) => setOverview(event.target.value)}
            rows="5"
            cols="100"
            />
        <br /><br /> 
        <label htmlFor="contributors"> Contributors: </label><br />
        <textarea className={styles.smallTextarea}
            id="contributors"
            placeholder="Contributors (multiple contributor names separated by commas)"
            //onChange={(event) => setOverview(event.target.value)}
            rows="5"
            cols="100"
            />
        <br /><br />  
        <div>
            <TextInput name={"Semester"} moreText="eg. F21, W22, S22, etc."/>
        </div>
        <div>
            <TextInput name={"Duration"} moreText="minutes"/>
        </div>
        <br />
        <button onClick={() => { router.back() }}> Cancel </button>
        </form>
    </div>
    )
}