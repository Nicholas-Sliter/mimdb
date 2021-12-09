import router from "next/router";
import { useState } from "react";
import styles from "../styles/SubmitPage.module.css";
import OptionSelectCard from "./FilmSubmission/OptionSelectCard";
import TextArea from "./FilmSubmission/TextArea";
import TextInput from "./FilmSubmission/TextInput";
import { useContext } from "react";
import { GenreCourseContext } from "./context/GenreCourseContext";
import {
  validateFilmTitle,
  validateFilmGenre,
  validateFilmActors,
  validateFilmLogLine,
  validateFilmOverview,
  validateFilmSemester,
  validateFilmCourse,
  validateFilmDuration,
  validateFilmVimeoId
} from "../lib/frontend-utils";
import ImageCrop from "./common/ImageCrop";
import Group from "./common/Group";
import FlexGroup from "./common/FlexGroup";
import imageCompression from "browser-image-compression";


// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

export default function Submit({ complete }) {
  const [errorObject, setErrorObject] = useState(
    {
      title: false,
      logLine: false,
      semester: false,
      duration: false,
      vimeoId: false,
      overview: false,
      genreList: false,
      courseList: false,
      inputActorList: false
    })

  const { genres, courses } = useContext(GenreCourseContext);

  const [title, setTitle] = useState("");
  const [logLine, setLogLine] = useState("");
  const [semester, setSemester] = useState("");
  const [duration, setDuration] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [overview, setOverview] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [inputDirectorList, setDirectorInputList] = useState([]);
  const [inputActorList, setActorInputList] = useState([]);

  //state for uploaded poster and backdrop before cropping
  const [poster, setPoster] = useState("");
  const [backdrop, setBackdrop] = useState("");

  const [croppedPoster, setCroppedPoster] = useState(null);
  const [croppedBackdrop, setCroppedBackdrop] = useState(null);



  const handlePosterUploadChange = async (e) => {
    const options = {
      maxSizeMB: 1.5
    }
    const orig = e.target.files[0];
    const compressed = await imageCompression(orig, options);
    setPoster(URL.createObjectURL(compressed));
  };

  const handleBackdropUploadChange = async (e) => {
    const options = {
      maxSizeMB: 3
    }
    const orig = e.target.files[0];
    const compressed = await imageCompression(orig, options);
    setBackdrop(URL.createObjectURL(compressed));
  };

  async function createSubmission() {
    const submitContent = {
      title: title,
      overview: logLine,
      term: semester,
      duration: `${duration} min`,
      vimeoId: vimeoId,
      description: overview,
      inputDirectorList: inputDirectorList,
      inputActorList: inputActorList,
      genreList: genreList,
      courseList: courseList,
      poster: croppedPoster,
      backdrop: croppedBackdrop
    };
    complete(submitContent);
  }

  const checkErrors = (id) => {

  }

  return (
    <div className={styles.submitPage}>
      <h1 style={{ color: "#203569", marginLeft: "2vw" }}>Submit Your Film</h1>
      <FlexGroup>
        <div>
          <TextInput 
            name="Title" 
            setFunc={setTitle} 
            id={"title"} 
            validator={validateFilmTitle} 
            errorObject={errorObject} 
            setErrorObject={setErrorObject} 
          />
          <TextInput 
            name="Log-Line" 
            setFunc={setLogLine} 
            id={"logLine"} 
            validator={validateFilmLogLine} 
            errorObject={errorObject} 
            setErrorObject={setErrorObject} 
          />
          <TextInput 
            name="Vimeo ID"
            setFunc={setVimeoId}
            validator={validateFilmVimeoId} 
            errorObject={errorObject} 
            setErrorObject={setErrorObject} 
          />
        </div>
        <div>
          <TextInput
            name={"Semester"}
            setFunc={setSemester}
            moreText="eg. F21, W22, S22, etc."
            id={"semester"}
            validator={validateFilmSemester}
            errorObject={errorObject}
            setErrorObject={setErrorObject}
          />
          <TextInput
            name={"Duration"}
            setFunc={setDuration}
            moreText="Minutes"
            id={"duration"}
            validator={validateFilmDuration}
            errorObject={errorObject}
            setErrorObject={setErrorObject}
          />
        </div>
      </FlexGroup>
      <Group>
        <TextArea name="Overview" setFunc={setOverview} id={"overview"} validator={validateFilmOverview} errorObject={errorObject} setErrorObject={setErrorObject} />
      </Group>
      <FlexGroup>
        <OptionSelectCard
          title="Course"
          useDropdown
          initialOptions={courses}
          selectedOptions={courseList}
          onChangeFunction={setCourseList}
          limit={2}
          id={"courseList"}
          validator={validateFilmCourse}
          errorObject={errorObject}
          setErrorObject={setErrorObject}
        />
        <OptionSelectCard
          title="Genres"
          allowCustom
          useDropdown
          initialOptions={genres}
          selectedOptions={genreList}
          onChangeFunction={setGenreList}
          limit={3}
          id={"genreList"}
          validator={validateFilmGenre}
          errorObject={errorObject}
          setErrorObject={setErrorObject}
        />
      </FlexGroup>
      <FlexGroup>
        <OptionSelectCard
          title="Actors"
          allowCustom
          selectedOptions={inputActorList}
          useDropdown={false}
          onChangeFunction={setActorInputList}
          limit={20}
          id={"inputActorList"}
          validator={validateFilmActors}
          errorObject={errorObject}
          setErrorObject={setErrorObject}
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
      </FlexGroup>
      <Group>
        <h3> Upload poster </h3>
        <input
          id="poster-upload"
          type="file"
          onChange={handlePosterUploadChange}
        />
        <ImageCrop
          image={poster}
          aspect={2 / 3}
          croppedImage={croppedPoster}
          setCroppedImage={setCroppedPoster}
          large
        ></ImageCrop>
      </Group>
      <Group>
        <h3> Upload backdrop </h3>
        <input
          id="backdrop-upload"
          type="file"
          onChange={handleBackdropUploadChange}
        />
        <ImageCrop
          image={backdrop}
          aspect={21 / 9}
          croppedImage={croppedBackdrop}
          setCroppedImage={setCroppedBackdrop}
        ></ImageCrop>
      </Group>
      <div className={styles.groupButton}>
        <button
          className={styles.largeButton}
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          className={styles.largeButton}
          onClick={() => createSubmission()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
