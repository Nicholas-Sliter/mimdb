
import DirectorSubmit from "../../components/DirectorSubmit";
import Layout from "../../components/Layouts/Layout";

export default function SubmitDirPage() {

  const submitDirComplete = async (content) => {
    const postSubmit = async () => {
      const response = await fetch("/api/directors/submit", {
        method: "POST",
        body: JSON.stringify(content), headers: new Headers({ "Content-Type": "application/json" })
      });
      let error = null;
      if (!response.ok) {
        error = new Error(response.statusText);
      }

      return {ok: response.ok, error};

    }
    return await postSubmit();
  }

  return (
    <Layout><DirectorSubmit complete={submitDirComplete} /></Layout>

  );
}