// Approve API - reject film

import nc from "next-connect";
import {useSession} from "next-auth/client";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    const [session] = useSession();
    if (!session) {
      res.status(403).json({
        message: "Only logged in administrator can reject film"
      })
      return;
    }
    const success = await updateFilmApproval(slug, false);

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
  });
  
  export default handler;