import * as React from "react";
import { render } from "react-dom";
import { parse } from "query-string";
import { App } from "./App";
import { AppWithAsync } from "./AppWithAsync";

import "./styles.css";

const TOTAL_PAGES = 3;

const params = parse(window.location.search);

render(
  params.implementation === "async" ? (
    <AppWithAsync
      smoothScroll={Boolean(params.smooth)}
      numberInterval={Number(params.interval || 0)}
      totalPages={TOTAL_PAGES}
    />
  ) : (
    <App
      rememberScroll={params.implementation === "remember"}
      smoothScroll={Boolean(params.smooth)}
      numberInterval={Number(params.interval || 0)}
      totalPages={TOTAL_PAGES}
    />
  ),
  document.getElementById("root")
);
