import connectionCheck from "../../utils/connectFirestore";
import Account from "../../models/accountModel";
import bcrypt, { compare } from "bcrypt";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function Login(req, res) {
  try {
    await connectionCheck();

    Account.findOne({ email: req.body.email }, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        if (!account) {
          res.status(400).send("Account not exists");
        } else {
          bcrypt.compare(
            req.body.password,
            account.password,
            function (err, result) {
              if (result === true) {
                res.redirect("/dashboard");
              } else {
                res.status(400).send("Wrong password");
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
