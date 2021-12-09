// Approve API - approve film

import nc from "next-connect";
import { getSession } from "next-auth/client";
import { updateFilmApproval } from "../../../../lib/backend-utils";


const handler = nc().put( async (req, res) => {
    const { slug } = req.query;
    const session = await getSession({ req });

    // Toggle here for tests from postman without authentication
    // Testing place holder
    // TODO: if (!session) {
    if (!session) {
      res.status(403).json({
        error: "Only logged in administrator can approve film"
      })
      return;
    }
    console.log(slug);
    const success = await updateFilmApproval(slug, true);
    console.log(success);
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