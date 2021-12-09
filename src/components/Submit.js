import router from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/SubmitPage.module.scss";
import OptionSelectCard from "./FilmSubmission/OptionSelectCard";
import TextArea from "./FilmSubmission/TextArea";
import TextInput from "./FilmSubmission/TextInput";
import { useContext } from "react";
import { GenreCourseContext } from "./context/GenreCourseContext";
import { DirectorNameContext } from "./context/DirectorNameContext";
import {
  validateFilmTitle,
  validateFilmGenre,
  validateFilmActors,
  validateFilmLogLine,
  validateFilmOverview,
  validateFilmSemester,
  validateFilmCourse,
  validateFilmDuration,
  validateFilmVimeoId,
} from "../lib/frontend-utils";
import ImageCrop from "./FilmSubmission/ImageCrop";
import Group from "./common/Group";
import FlexGroup from "./common/FlexGroup";
import imageCompression from "browser-image-compression";
import ImageSelector from "./FilmSubmission/ImageSelector";
import ImageSelectorTabs from "./FilmSubmission/ImageSelectorTabs";

export default function Submit({ complete }) {
  const [errorObject, setErrorObject] = useState({
    title: false,
    logLine: false,
    semester: false,
    duration: false,
    vimeoId: false,
    overview: false,
    genreList: false,
    courseList: false,
    inputActorList: false,
  });

  const { genres, courses } = useContext(GenreCourseContext);
  const { director_names } = useContext(DirectorNameContext);

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

  const [isValid, setIsValid] = useState(false);

  //state for uploaded poster and backdrop before cropping
  const [poster, setPoster] = useState("");
  const [backdrop, setBackdrop] = useState("");

  const [croppedPoster, setCroppedPoster] = useState(null);
  const [croppedBackdrop, setCroppedBackdrop] = useState(null);

  const images = [
    "/defaults/pink-pink.svg",
    "/defaults/purple-pink.svg",
    "/defaults/green-blue.svg",
    "/defaults/blue-lightblue.svg",
    "/defaults/posters/deep-blue.svg",
    "/defaults/posters/sunny-morning.svg",
    "/defaults/posters/saint-petersburg.svg",
  ];

  //used to select the defualt poster and backdrop and store their url
  const [selectedPoster, setSelectedPoster] = useState(images[0]);
  const [selectedBackdrop, setSelectedBackdrop] = useState(images[0]);

  const reduceErrorObject = (errorObj) => {
    let bool = false;
    for (const value of Object.values(errorObj)) {
      if (value) {
        bool = true;
        break;
      }
    }
    return bool;
  };
  
  const updateValid = (emptyBool) => {
    setIsValid(!reduceErrorObject(errorObject) && !emptyBool);
  };

  const getEmpty = () => {
    //check if any of the state fields are empty

    return (
      title === "" ||
      logLine === "" ||
      semester === "" ||
      duration === "" ||
      vimeoId === "" ||
      overview === "" ||
      genreList.length === 0 ||
      courseList.length === 0 ||
      inputDirectorList.length === 0 ||
      croppedPoster === null ||
      croppedBackdrop === null
    );
  };

  useEffect(() => {
    updateValid(getEmpty());
  }, [title, logLine, semester, duration, vimeoId, overview, genreList, courseList, inputDirectorList, inputActorList, croppedBackdrop, croppedPoster]);

  const setErrorObjectWrapper = (errorObj) => {
    setErrorObject(errorObj);
    updateValid(getEmpty());
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const convertImageToBase64 = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "selected.svg", { type: blob.type });
    //base64 encode the file
    const base64 = await fileToBase64(file);
    return base64;
  };

  const handleSelectGradientBackdrop = async (image) => {
    setSelectedBackdrop(image);
    //base64 encode the svg
    const base64svg = await convertImageToBase64(image);
    setSelectedBackdrop(image);
    setBackdrop(base64svg);
  };

  const handleSelectGradientPoster = async (image) => {
    //base64 encode the svg
    setSelectedPoster(image);
    const base64svg = await convertImageToBase64(image);
    setSelectedPoster(image);
    setPoster(base64svg);
  };

  const handlePosterUploadChange = async (e) => {
    const options = {
      maxSizeMB: 1.5,
    };
    const orig = e.target.files[0];
    const compressed = await imageCompression(orig, options);
    setPoster(URL.createObjectURL(compressed));
  };

  const handleBackdropUploadChange = async (e) => {
    const options = {
      maxSizeMB: 3,
    };
    const orig = e.target.files[0];
    const compressed = await imageCompression(orig, options);
    setBackdrop(URL.createObjectURL(compressed));
  };

  async function createSubmission() {
    //validate all fields
    if (!isValid) {
      return;
    }

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
      backdrop: croppedBackdrop,
    };
    const {ok, error} = await complete(submitContent);
    if (ok) {
      alert("Submission successful!", router.push("/"));
    }
    else {
      alert("Submission not successful due to error: ", error);
    }

  }

  return (
    <div className={styles.submitPage}>
      <h1 style={{ color: "#203569", marginLeft: "2vw" }}>Submit Your Film</h1>
      <FlexGroup>
        <div className={styles.inputGroup}>
          <TextInput
            name="Title"
            setFunc={setTitle}
            id={"title"}
            validator={validateFilmTitle}
            errorObject={errorObject}
            setErrorObject={setErrorObjectWrapper}
          />
          <TextInput
            name="Log-Line"
            setFunc={setLogLine}
            id={"logLine"}
            moreText={"A short sentence describing the film"}
            validator={validateFilmLogLine}
            errorObject={errorObject}
            setErrorObject={setErrorObjectWrapper}
          />
          <TextInput
            name="Vimeo ID"
            setFunc={setVimeoId}
            id={"vimeoId"}
            validator={validateFilmVimeoId}
            errorObject={errorObject}
            setErrorObject={setErrorObjectWrapper}
          />
        </div>
        <div className={styles.inputGroup}>
          <TextInput
            name={"Semester"}
            setFunc={setSemester}
            moreText="eg. F21, W22, S22, etc."
            id={"semester"}
            validator={validateFilmSemester}
            errorObject={errorObject}
            setErrorObject={setErrorObjectWrapper}
          />
          <TextInput
            name={"Duration"}
            setFunc={setDuration}
            moreText="Minutes"
            id={"duration"}
            validator={validateFilmDuration}
            errorObject={errorObject}
            setErrorObject={setErrorObjectWrapper}
          />
        </div>
      </FlexGroup>
      <Group>
        <TextArea
          name="Overview"
          setFunc={setOverview}
          id={"overview"}
          validator={validateFilmOverview}
          errorObject={errorObject}
          setErrorObject={setErrorObjectWrapper}
        />
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
          setErrorObject={setErrorObjectWrapper}
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
          setErrorObject={setErrorObjectWrapper}
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
          setErrorObject={setErrorObjectWrapper}
          allowEmpty
        />
        <OptionSelectCard
          title="Directors"
          allowCustom={false}
          initialOptions={director_names}
          selectedOptions={inputDirectorList}
          useDropdown
          onChangeFunction={setDirectorInputList}
        />
      </FlexGroup>
      <Group>
        <h3> Upload poster or select a default gradient </h3>
        <ImageSelectorTabs name="Poster">
          <input
            id="poster-upload"
            type="file"
            onChange={handlePosterUploadChange}
          />
          <ImageSelector
            images={images}
            selectedImage={selectedPoster}
            onImageSelect={handleSelectGradientPoster}
          />
        </ImageSelectorTabs>
      </Group>
      <Group>
        <h3> Crop your poster </h3>
        <ImageCrop
          image={poster}
          aspect={2 / 3}
          croppedImage={croppedPoster}
          setCroppedImage={setCroppedPoster}
          large
        />
      </Group>
      <Group>
        <h3> Upload backdrop or select a default gradient </h3>
        <ImageSelectorTabs name="Backdrop">
          <input
            id="backdrop-upload"
            type="file"
            onChange={handleBackdropUploadChange}
          />
          <ImageSelector
            images={images}
            selectedImage={selectedBackdrop}
            onImageSelect={handleSelectGradientBackdrop}
          />
        </ImageSelectorTabs>
      </Group>

      <Group>
        <h3> Crop your backdrop </h3>
        <ImageCrop
          image={backdrop}
          aspect={21 / 9}
          croppedImage={croppedBackdrop}
          setCroppedImage={setCroppedBackdrop}
        />
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
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
