// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  res.status(200).json({ email: email, password: password })
}
