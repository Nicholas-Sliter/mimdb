import nc from "next-connect";
import { getCourseByCourseName } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
    const { courseName }= req.query;
    const wholeCourse = await getCourseByCourseName(courseName);
  
    if (!wholeCourse || !Array.isArray(wholeCourse)) {
      res.status(500).json({
        error: "Could not retrieve whole course"
      });
      return;
    }2
    
    res.status(200).json(wholeCourse);
  });
  
  export default handler;
  