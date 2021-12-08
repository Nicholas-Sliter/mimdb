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
import ImageCrop from "./common/ImageCrop";
import Group from "./common/Group";
import FlexGroup from "./common/FlexGroup";

// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

export default function Submit({ complete }) {
  const { genres, courses } = useContext(GenreCourseContext);

  const [title, setTitle] = useState("");
  const [logLine, setLogLine] = useState("");
  const [semester, setSemester] = useState("");
  const [duration, setDuration] = useState("");
  const [courseId, setCourseId] = useState("");
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


  const handlePosterUploadChange = (e) => {
    setPoster(URL.createObjectURL(e.target.files[0]));
  };

    const handleBackdropUploadChange = (e) => {
      setBackdrop(URL.createObjectURL(e.target.files[0]));
    };

  const handleCropImageButton = () => {
    //console.log(crop);
    //setPoster(crop);
  };

  async function createSubmission() {
    const submitContent = {
      title: title,
      overview: logLine,
      term: semester,
      duration: duration,
      courseId: courseId,
      vimeoId: vimeoId,
      description: overview,
      inputDirectorList: inputDirectorList,
      inputActorList: inputActorList,
      //inputContribList: inputContribList,
      genreList: genreList,
      courseList: courseList,
    };
    complete(submitContent);
  }

  return (
    <div className={styles.submitPage}>
      <h1 style={{ color: "#203569", marginLeft: "2vw" }}>Submit Your Film</h1>
      <FlexGroup>
        <div>
          <TextInput name="Title" setFunc={setTitle} />
          <TextInput name="Log-Line" setFunc={setLogLine} />
          <TextInput name="Course ID" setFunc={setCourseId} />
        </div>
        <div>
          <TextInput
            name={"Semester"}
            setFunc={setSemester}
            moreText="eg. F21, W22, S22, etc."
          />
          <TextInput
            name={"Duration"}
            setFunc={setDuration}
            moreText="Minutes"
          />
          <TextInput name="Vimeo ID" setFunc={setVimeoId} />
        </div>
      </FlexGroup>
      <Group>
        <TextArea name="Overview" setFunc={setOverview} />
      </Group>
      <FlexGroup>
        <OptionSelectCard
          title="Course"
          useDropdown
          initialOptions={courses}
          selectedOptions={courseList}
          onChangeFunction={setCourseList}
          limit={2}
        />
        <OptionSelectCard
          title="Genres"
          allowCustom
          useDropdown
          initialOptions={genres}
          selectedOptions={genreList}
          onChangeFunction={setGenreList}
          limit={3}
          validator={validateFilmGenre}
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
