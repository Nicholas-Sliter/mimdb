
import DirectorSubmit from "../../components/DirectorSubmit";
import Layout from "../../components/Layouts/Layout";

export default function SubmitDirPage() {

  const submitDirComplete = (content) => {
    console.log(JSON.stringify(content));
    const postSubmit = async () => {
      const response = await fetch("/api/directors/submit", {
        method: "POST",
        body: JSON.stringify(content), headers: new Headers({ "Content-Type": "application/json" })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
    postSubmit();
  }

  return (
    <Layout><DirectorSubmit complete={submitDirComplete} /></Layout>

  );
}