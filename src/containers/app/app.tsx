import React from "react";
import { Button, Logo } from "@pacificoseguros/styleguide";
import "./app.scss";

export default function Root(props) {
  return (
    <section className="login-app">
      <div className="login-app__logo">
        <Logo />
      </div>
      <Button buttonAs="a" href="/home/player">
        Iniciar sesión
      </Button>
    </section>
  );
}
