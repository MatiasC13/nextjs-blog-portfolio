import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const JavaScript = () => {
  return (
    <Layout>
      <img src="/javaScript.png" alt="" className="img-fluid" />
      <Link href="/">
        <a className="btn btn-primary margin">Volver</a>
      </Link>
    </Layout>
  );
};

export default JavaScript;
