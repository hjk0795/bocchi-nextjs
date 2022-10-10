import connectionCheck from "../../utils/connectionCheck";
import Account from "../../models/accountModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function SignUp(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    connectionCheck();
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
          res.redirect("/dashboard");
          
        } else {
          res.status(400).send('Account already exists');
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
