const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { bcrypt } = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateIdenticon = require("../utils/generateIdenticon");

const prisma = new PrismaClient();

/*
router.post("/regiter", async (req, res) => {
  const { username, email, password } = req.body;

  //const hashedPassword = bcrypt.hash(password, 10);
  //const saltValue = bcrypt.genSaltSync(10);
  //const hashed = bcrypt.hashSync(password, saltValue);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      //password: hashedPassword
      //password: password
      password
    },
  });

  return res.json({ user });

  //return res.json({ username, email, password });
})
*/
//新規ユーザー登録API
router.post("/regiter", async (req, res) => {
  const { username, email, password } = req.body;

  const defaultIconImage = generateIdenticon(email);

  //const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      //password: hashedPassword,
      password,
      profile: {
        create: {
          bio: "はじめまして",
          profileImageUrl: defaultIconImage,
          //profileImageUrl: "sample.png",
        },
      },
    },
    include: {
      profile: true,
    },
  });

  return res.json({ user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ email: "メールアドレスに誤りがあります" });
  }

  //bcryptが利用出来ないため、コメントアウト
  /*const isPasswordVaild = await bcrypt.compare(password, user.password);

  if (!isPasswordVaild) {
    return res.status(401).json({ password: "パスワードに誤りがあります" });
  }*/

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

  return res.json({ token });

})

module.exports = router;