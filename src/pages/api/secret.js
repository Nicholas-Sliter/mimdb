
import { getSession } from "next-auth/client";
import nc from "next-connect";

const handler = nc().get(async (req, res)=>{
    const session = await getSession({ req });
    if (session) {
        res.status(200).json({message:`${session.user.name}`});
      } else {
        res.status(401); // not signed in, reject
      }
    res.end();
});

export default handler;