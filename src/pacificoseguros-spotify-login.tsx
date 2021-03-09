import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import singleSpaReact from "single-spa-react";
import Root from "./containers/app/app";

const params = new URLSearchParams(window.location.search);

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Root code={params.get("code")} />
  </QueryClientProvider>
);

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
