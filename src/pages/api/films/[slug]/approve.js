// Approve API - approve film

import nc from "next-connect";
import {useSession} from "next-auth/client";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    const [session] = useSession();
    if (!session) {
      res.status(403).json({
        message: "Only logged in administrator can approve film"
      })
      return;
    }

    const success = await updateFilmApproval(slug, true);

    if (success) {
      res.status(200).json({
        message: "Successfully approved film",
        update: true
      })
    } else {
      res.status(500).json({
        error: "Could not approve film"
      });
    }
  });
  
  export default handler;