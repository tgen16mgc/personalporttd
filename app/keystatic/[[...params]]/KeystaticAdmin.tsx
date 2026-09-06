"use client";

import dynamic from "next/dynamic";

const KeystaticAdmin = dynamic(() => import("./KeystaticApp"), {
  ssr: false,
  loading: () => <p role="status" style={{ padding: "2rem" }}>Loading content editor…</p>,
});

export default KeystaticAdmin;
