import React from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";
import ChatBot from "./components/ChatPanel";
import { Header } from "./components/Header";

export default function App() {
  return (
    <>
      <div className="h-[calc(100vh-3.5rem)]">
        <ChatBot />
      </div>
    </>
  );
}
