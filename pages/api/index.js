import nodemailer from "nodemailer";

export default function (req, res) {
  if (req.method === "POST") {
    try {
      const { msg, email } = req.body;
      if (!msg || !email) {
        throw new Error("Invalid request body");
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailData = {
        from: "servicio.notificaciones.compras@gmail.com",
        to: "matiascabralmendez@gmail.com",
        cc: email,
        // cco: [ownerEmail, "servicio.notificaciones.compras@gmail.com"],

        subject: `Contacto Matias Cabral`,

        html: `<p>De:${email}</p><p>${msg}</p>`,
      };

      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email enviado exitosamente: %s", info.messageId);
        }
      });
      res.status(200).json({ content: req.body, status: "entregado" });
    } catch (error) {
      console.log("ocurrió un error: ", error);
      res.status(400).json({ error });
    }
    // res.end();
  } else {
    res.redirect("/");
  }
}
