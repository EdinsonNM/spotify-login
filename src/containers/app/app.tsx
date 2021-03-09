import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button, Logo, FullScreenLoader } from "@ps/styleguide";

import "./app.scss";
import { AuthProvider } from "../../providers/auth.provider";

export default function Root({ code }) {
  const [showLoader, setLoader] = useState(false);
  const { isFetching, isSuccess, data } = useQuery(
    "token",
    () => AuthProvider.getToken(code),
    { enabled: code !== null, refetchOnWindowFocus: false }
  );

  const auth = () => {
    const authUrl = AuthProvider.getAuthUrl();
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (isFetching) {
      setLoader(true);
    }
  }, [isFetching, setLoader]);

  useEffect(() => {
    if (isSuccess) {
      setLoader(false);
    }
  }, [setLoader, isSuccess]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.accessToken);
      window.location.href = "http://localhost:9000/home/player";
    }
  }, [data]);

  return (
    <section className="login-app">
      {showLoader && <FullScreenLoader />}
      <div className="login-app__logo">
        <Logo />
      </div>
      <Button onClick={auth}>Iniciar sesión</Button>
    </section>
  );
}
