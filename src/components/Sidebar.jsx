import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

export default function Sidebar({ children }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-gray-300 border-2 p-4">
      {
        <button className="text-blue-700 max-w-fit px-12 py-4 border-2 border-blue-700 rounded-lg flex justify-center items-center flex-col">
          <BiMessageRoundedDetail className="text-4xl" />
          <p>Message</p>
        </button>
      }
      {/* <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div> */}
    </aside>
  );
}
