// Approve API - update film approval

import nc from "next-connect";
import { updateFilmApproval } from "../../../lib/backend-utils";

const approval = true;

const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    const success = await updateFilmApproval(slug, approval);

    if (success) {
      res.status(200).json({
        message:"Successfully Registered"
      })
    } else {
      res.status(500).json({
        error: "Could not retrieve genres"
      });
    }
  });
  
  export default handler;