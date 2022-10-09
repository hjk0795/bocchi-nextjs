import connectMongo from "../../utils/connectMongo";
import Account from "../../models/accountModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function Login(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    Account.findOne({ email: req.body.email }, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        if (!account) {
          res.status(400).send("Account not exists");
        } else {
          if (account.password === req.body.password) {
            res.redirect("/dashboard");
          } else {
            res.status(400).send("Wrong password");
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
