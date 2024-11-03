import createHttpError from "http-errors";
import { findUserById } from "../services/auth.js";

export const themeController = async (req,res) =>{
  const {userId} = req.params;
  const {body} =req;
  const user = await findUserById(userId);
  if(!user) throw createHttpError(401, 'Unauthorized');
  // console.log(user);
  console.log(body.theme);



res.status(200).json({
  status: 200,
  message: 'Successfully patched a user!',

});
};
