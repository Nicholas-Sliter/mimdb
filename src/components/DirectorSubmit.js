import router from "next/router";
import { useState } from "react";
import styles from "../styles/SubmitPage.module.css";
import TextArea from "./FilmSubmission/TextArea";
import TextInput from "./FilmSubmission/TextInput";
import { useContext } from "react";
import { GenreCourseContext } from "./context/GenreCourseContext";


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
          <TextInput name="Name" setFunc={setName} moreText="Ex: John Middlebury"/>
          <TextInput name="Grad Year" setFunc={setGrad} moreText="Ex: 2022" />
        </div>
      </div>
      <div className={styles.group}>
        <div>
          <TextArea
            name={"Bio"}
            setFunc={setBio}
            moreText="Tell us a little bit about yourself!"
          />
        </div>
      </div>
      <div className={styles.group}>
        <div>
          <TextInput
            name={"Middlebury Email"}
            setFunc={setMiddEmail}
            moreText="Ex: johnMidd@middlebury.edu"
          />
          <input type="checkbox" id="pubDisplayMidd" name="makePub" value="insertValue"/>
          <label htmlfor="pubDisplayMidd"> Make Public </label><br></br>
        <br></br>
        <br></br>
        <TextInput
            name={"Personal Email"}
            setFunc={setPersonalEmail}
            moreText="Ex: johnMidd@gmail.com"
          />
            <input type="checkbox" id="pubDisplayE" name="makePublic" value="insertValue"/>
            <label htmlfor="pubDisplayE"> Make Public </label><br></br>
        </div>
      </div>
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
