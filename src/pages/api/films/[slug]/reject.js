// Approve API - reject film

import nc from "next-connect";
import {useSession} from "next-auth/client";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    //console.log(req)
    const [session] = useSession();
    console.log("if")
    if (!session) {
      res.status(403).json({
        message: "Only logged in administrator can reject film"
      })
      return;
    }
    console.log("after if")
    
    const success = await updateFilmApproval(slug, false);

    console.log("if2")
    if (success) {
      res.status(200).json({
        message: "Successfully rejected film",
        update: false
      })
    } else {
      res.status(500).json({
        error: "Could not reject film"
      });
    }
    console.log("after if2")
  });
  
  export default handler;