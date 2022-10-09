import connectMongo from "../../utils/connectMongo";
import Account from "../../models/accountModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function SignUp(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    Account.findOne({ email: req.body.email }, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        if (!account) {
          console.log("CREATING DOCUMENT");
          const account = new Account({
            email: req.body.email,
            password: req.body.password,
          });

          account.save();
          console.log("CREATED DOCUMENT");
          res.redirect("/");
          
        } else {
          res.json(400, {
            error: 1,
            msg: "Account already exists",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
