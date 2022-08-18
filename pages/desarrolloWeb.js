import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const DesarrolloWeb = () => {
  return (
    <Layout className="flex">
      <img src="/desarrolloWeb.png" alt="" className="img-fluid" />
      <Link href="/">
        <a className="btn btn-primary margin">Volver</a>
      </Link>
    </Layout>
  );
};

export default DesarrolloWeb;
