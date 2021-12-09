import router from "next/router";
import { useState } from "react";
import styles from "../styles/SubmitPage.module.css";
import OptionSelectCard from "./FilmSubmission/OptionSelectCard";
import TextArea from "./FilmSubmission/TextArea";
//import { validateFilmSemester } from "../lib/frontend-utils";
import TextInput from "./FilmSubmission/TextInput";
import { useContext } from "react";
import { GenreCourseContext } from "./context/GenreCourseContext";
import { validateFilmGenre } from "../lib/frontend-utils";
import ImageCrop from "./FilmSubmission/ImageCrop";
import Group from "./common/Group";
import FlexGroup from "./common/FlexGroup";
import imageCompression from "browser-image-compression";
import ImageSelector from "./FilmSubmission/ImageSelector";
import ImageSelectorTabs from "./FilmSubmission/ImageSelectorTabs";


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

  const images = [
    "/defaults/pink-pink.svg",
    "/defaults/purple-pink.svg",
    "/defaults/green-blue.svg",
    "/defaults/blue-lightblue.svg",
    "/defaults/posters/deep-blue.svg",
    "/defaults/posters/sunny-morning.svg",
    "/defaults/posters/saint-petersburg.svg",
  ];

  const [selectedPoster, setSelectedPoster] = useState(images[0]);
  const [selectedBackdrop, setSelectedBackdrop] = useState(images[0]);

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
      poster: croppedPoster,
      backdrop: croppedBackdrop,
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
          ></ImageSelector>
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

      <Group>
        <ImageSelector
          images={images}
          selectedImage={selectedPoster}
          onImageSelect={handleSelectGradientPoster}
        ></ImageSelector>
        {poster ? <img src={poster} /> : null}
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
