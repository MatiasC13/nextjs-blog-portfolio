import nodemailer from "nodemailer";
export default function (req, res) {
  const { msg, email } = req.body;
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
    // cco: [ownerEmail, "servicio.notificaciones.compras@gmail.com"],

    subject: `Contacto Portfolio`,

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
  // res.end();
}
