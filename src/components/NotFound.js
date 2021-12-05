import router from "next/router";

export default function NotFound({children}) {
   return (
      <div className="not-found">
         <h1>{children}</h1>
         <button onClick={() => router.push("/")}>Go to homepage</button>
         <button onClick={() => router.back()}>Go back</button>
      </div>
   );
}
   
   