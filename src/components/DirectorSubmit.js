import router from "next/router";
import { useState } from "react";
import styles from "../styles/SubmitPage.module.css";
//import AddedText from "./FilmSubmission/AddedText";
import OptionSelectCard from "./FilmSubmission/OptionSelectCard";
import Select from "./FilmSubmission/Select";
import TextArea from "./FilmSubmission/TextArea";
//import { validateFilmSemester } from "../lib/frontend-utils";
import TextInput from "./FilmSubmission/TextInput";
import { useContext } from "react";
import { GenreCourseContext } from "./context/GenreCourseContext";
import { validateFilmGenre } from "../lib/frontend-utils";


export default function DirectorSubmit({complete}) {
  const { genres, courses } = useContext(GenreCourseContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [middEmail, setMiddEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [grad, setGrad]= useState("");

  //const [inputContribList, setContribInputList] = useState([""]);

  async function createSubmission() {
    const submitDirector = {
      director_name: name,
      director_bio: bio,
      director_midd_email: middEmail,
      director_personal_email: personalEmail,
      director_graduation_year: grad,
    };
    complete(submitDirector);
  }

  return (
    <div className={styles.submitPage}>
      <h1 style={{ color: "#203569", marginLeft: "2vw" }}>Add Student Director to Mimdb</h1>
      <div className={styles.group}>
        <div>
          <TextInput name="Name" setFunc={setName} />
          <TextInput name="Grad" setFunc={setGrad} />
        </div>
        <div>
          <TextInput
            name={"Bio"}
            setFunc={setBio}
            moreText="Tell us a little bit about yourself!"
          />
        </div>
        <div>
          <TextInput
            name={"Middlebury Email"}
            setFunc={setMiddEmail}
            moreText="Ex: joeMiddlebury@middlebury.edu"
          />
        <TextInput
            name={"Personal Email"}
            setFunc={setPersonalEmail}
            moreText="Ex: joeMiddlebury@gmail.com"
          />
        </div>
      </div>
      {/* <div className={styles.group}>
        <TextArea name="Overview" setFunc={setOverview} />
      </div>
      <div className={styles.group}>
        <OptionSelectCard
          title="Course"
          useDropdown
          initialOptions={courses}
          selectedOptions={newCourse}
          onChangeFunction={addCourse}
          limit={2}
        />
        <OptionSelectCard
          title="Genres"
          allowCustom
          useDropdown
          initialOptions={genres}
          selectedOptions={newGenre}
          onChangeFunction={addGenre}
          limit={3}
          validator={validateFilmGenre}
        />
      </div>
      <div className={styles.group}>
        <OptionSelectCard
          title="Actors"
          allowCustom
          selectedOptions={inputActorList}
          useDropdown={false}
          onChangeFunction={setActorInputList}
          limit={20}
        />
        <OptionSelectCard
          title="Directors"
          allowCustom={false}
          initialOptions={[
            "Nicholas Sliter",
            "Jiaqi Li",
            "Wayne Wang",
            "Becca Hochman-Fisher",
            "Nicholas McKalip",
            "Katie Kosior",
          ]}
          selectedOptions={inputDirectorList}
          useDropdown
          onChangeFunction={setDirectorInputList}
        />
      </div> */}
      <div className={styles.groupButton}>
        <button
          className={styles.largeButton}
          onClick={() => createSubmission()}
        >
          Submit
        </button>
        <button
          className={styles.largeButton}
          onClick={() => {
            router.back();
          }}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
}
