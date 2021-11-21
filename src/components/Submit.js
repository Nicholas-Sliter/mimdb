import React, { useState } from "react";
import router from "next/router";
//import { validateFilmSemester } from "../lib/frontend-utils";
import TextInput from "./FilmSubmission/TextInput";
import TextArea from "./FilmSubmission/TextArea";
import Select from "./FilmSubmission/Select";
import AddedText from "./FilmSubmission/AddedText";

import styles from "../styles/SubmitPage.module.css";

export default function Submit({ genres, courses }) {
    const [title, setTitle] = useState("");
    const [logLine, setLogLine] = useState("");
    const [semester, setSemester] = useState("");
    const [duration, setDuration] = useState("");
    const [courseId, setCourseId] = useState("");
    const [vimeoId, setVimeoId] = useState("");
    const [overview, setOverview] = useState("");
    const [newGenre, addGenre] = useState(false);
    const [newCourse, addCourse] = useState(false);
    const [genreList, setGenreList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [inputDirectorList, setDirectorInputList] = useState([""]);
    const [inputActorList, setActorInputList] = useState([""]);
    const [inputContribList, setContribInputList] = useState([""]);

    // const defaultSubmit = {title:"", logLine:"", semester:"", duration:0,
    //     overview:"", courseId:"", vimeoId:"", inputDirectorList:[],
    //     inputActorList:[], inputContribList:[], genreList:[],courseList:[]};
    // const [submitContent, setSubmitContent] = useState(defaultSubmit);

    function createSubission() {
        const submitContent = {title:title, logLine:logLine, semester:semester, 
            duration:duration, courseId:courseId, vimeoId:vimeoId, overview:overview, 
            inputDirectorList:inputDirectorList, inputActorList:inputActorList, 
            inputContribList:inputContribList, genreList:genreList, courseList:courseList};
        console.log(submitContent);
    }

    return (
        <div className={styles.submitPage}>
            <h1 style={{ color: "#203569", marginLeft: "2vw" }}>Submit Your Film</h1>
            <div className={styles.group}>
                <div>
                    <TextInput name="Title" setFunc={setTitle} />
                    <TextInput name="Log-Line" setFunc={setLogLine} />
                    <TextInput name="Course ID" setFunc={setCourseId} />
                </div>
                <div>
                    <TextInput name={"Semester"} setFunc={setSemester} moreText="eg. F21, W22, S22, etc." />
                    <TextInput name={"Duration"} setFunc={setDuration} moreText="Minutes" />
                    <TextInput name="Vimeo ID" setFunc={setVimeoId} />
                </div>
            </div>
            <div className={styles.group}>
                <TextArea name="Overview" setFunc={setOverview} />
            </div>
            <div className={styles.group}>
                <Select name="Genre" array={genres} newVar={newGenre} setFunc={addGenre} setCategoryList={setGenreList} />
                <Select name="Course" array={courses} newVar={newCourse} setFunc={addCourse} setCategoryList={setCourseList}/>
            </div>
            <div className={styles.group}>
                <AddedText name="Director" inputList={inputDirectorList} setInputList={setDirectorInputList} />
                <AddedText name="Actor" inputList={inputActorList} setInputList={setActorInputList} />
                <AddedText name="Contributor" inputList={inputContribList} setInputList={setContribInputList} />
            </div>
            <div className={styles.groupButton}>
                <button className={styles.largeButton} onClick={() => createSubission()}>Submit</button>
                <button className={styles.largeButton} onClick={() => { router.back() }}> Cancel </button>
            </div>
        </div>
    )
}