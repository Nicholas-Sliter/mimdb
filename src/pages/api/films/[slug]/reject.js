// Approve API - reject film

import nc from "next-connect";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    // const update = JSON.parse(req.body).approval;
    // if (!update && update !== 0 && update !== "0"){
    //   res.status(400);
    //   return;
    // }
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