import React, { useState } from "react";
import Routing from "./Routing";
import UnsupportedDevice from "./components/overlays/UnsupportedDevice/UnsupportedDevice";
import { CacheProvider } from "../contexts/cache";
import { CurrentProvider } from "../contexts/current";

export default function Index() {
  return (
    <div id='app-mount'>
      <UnsupportedDevice />
      <CacheProvider>
        <CurrentProvider>
          <Routing />
        </CurrentProvider>
      </CacheProvider>
    </div>
  );
}
