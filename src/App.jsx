import React from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";
import NodesPanel from "./components/NodesPanel";

export default function App() {
  return (
    <>
      <div className="h-[calc(100vh-3.5rem)]">
        <NodesPanel />
      </div>
    </>
  );
}
