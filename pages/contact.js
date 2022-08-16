import React from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import { validateEmail } from "../utils/utils";

const Contact = () => {
  const [user, setUser] = useState({ email: "", msg: "" });
  const [error, setError] = useState({
    error: false,
    msg: "verifica los campos",
  });

  const onChangeInput = (e) => {
    if (error) {
      setError((prev) => ({ ...prev, error: false }));
    }
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(user);
  };

  const sendEmail = () => {
    if (validateEmail(user.email) && user.msg.length > 0) {
      setError(() => ({ msg: "Mensaje enviado", error: true }));
      setUser({ email: "", msg: "" });
      fetch("api", {
        method: "POST",
        body: JSON.stringify(user),
      });
    } else {
      setError((prev) => ({ ...prev, error: true }));
    }
  };

  return (
    <Layout>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          correo electróncio
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name="email"
          value={user.email}
          onChange={onChangeInput}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          mensaje
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
