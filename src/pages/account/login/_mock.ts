import { Request, Response } from "express";

function getFakeCaptcha(req: Request, res: Response) {
  return res.json("captcha-xxx");
}

export default {
  "POST  /api/login/account": (req: Request, res: Response) => {
    const { password, userName } = req.body;
    console.log(req, "req！！！！！", req.body);
    if (password === "ant.design" && userName === "admin") {
      res.send({
        status: "ok",
        currentAuthority: "admin"
      });
      return;
    }
    if (password === "ant.design" && userName === "user") {
      res.send({
        status: "ok",
        currentAuthority: "user"
      });
      return;
    }
    res.send({
      status: "error",
      currentAuthority: "guest"
    });
  },
  "GET  /api/login/captcha": getFakeCaptcha
};
