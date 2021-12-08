// Approve API - reject film

import nc from "next-connect";
import { getSession } from "next-auth/client";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
  const { slug } = req.query;
  const session = await getSession({ req });

  // Testing place holder
  // TODO: if (!session) {
  if (!session) {
    res.status(403).json({
      message: "Only logged in administrator can approve film"
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