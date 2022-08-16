import React from "react";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import Layout from "../components/Layout";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const recaptchaRef = React.createRef();
  const [user, setUser] = useState({ email: "", msg: "" });
  const [error, setError] = useState({
    error: false,
    msg: "",
  });

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    alert(`Hey, ${email}`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();
  };

  const onChangeInput = (e) => {
    if (error) {
      setError((prev) => ({ ...prev, error: false }));
    }
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(user);
  };

  const sendEmail = () => {
    if (validateEmail(user.email) && user.msg.length > 0) {
      recaptchaRef.current.execute();
      setError(() => ({ msg: "Mensaje enviado", error: true }));
      setUser({ email: "", msg: "" });
      fetch("api", {
        method: "POST",
        body: JSON.stringify(user),
      });
    } else {
      setError((prev) => ({ msg: "verifica los campos", error: true }));
    }
  };

  return (
    <Layout>
      <div className="mb-3">
        <h1 className="text-center">Contáctame</h1>
        <div>
          <Link href="/">
            <a className="btn btn-primary">Volver</a>
          </Link>
        </div>
        <br />
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          // placeholder="name@example.com"
          name="email"
          value={user.email}
          onChange={onChangeInput}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Mensaje
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="msg"
          value={user.msg}
          onChange={onChangeInput}
        ></textarea>
        {error && <p>{error.msg}</p>}
        <button
          onClick={sendEmail}
          type="submit"
          className="btn btn-primary mb-3"
        >
          Enviar
        </button>
      </div>
    </Layout>
  );
};

export default Contact;
