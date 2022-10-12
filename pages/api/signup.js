import connectionCheck from "../../utils/connectionCheck";
import Account from "../../models/accountModel";
import bcrypt, { hash } from "bcrypt";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function SignUp(req, res) {
  try {
    await connectionCheck();

    Account.findOne({ email: req.body.email }, function (err, account) {
      if (err) {
        console.log(err);
      } else {
        if (!account) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            const account = new Account({
              email: req.body.email,
              password: hash,
            });

            account.save();

            res.redirect("/dashboard");
          });
        } else {
          res.status(400).send("Account already exists");
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
