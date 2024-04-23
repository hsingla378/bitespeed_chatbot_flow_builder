import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";

import "./ChatBot.css";
import { BiMessageRoundedDetail } from "react-icons/bi";
import Sidebar from "./Sidebar";
import SingleNdode from "./SingleNode";

const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 100, y: 100 },
    type: "textUpdater",
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 200 },
    type: "textUpdater",
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export default function ChatBot() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const nodeTypes = useMemo(() => ({ textUpdater: SingleNdode }), []);

  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeHidden, setNodeHidden] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNode && node.id === selectedNode.toString()) {
          node.data.label = nodeName;
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === "e1-2") {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);

  console.log("selectedNode", selectedNode);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
      onNodeClick={(evt, node) => {
        setSelectedNode(parseInt(node.id));
        setNodeName(node.data.label);
        setIsNodeSelected(true);
      }}
      onPaneClick={() => {
        setSelectedNode(null);
        setIsNodeSelected(false);
      }}
      nodeTypes={nodeTypes}
    >
      <div className="updatenode__controls border-2 border-gray-2 rounde-sm h-full">
        {isNodeSelected ? (
          <div>
            <label>label:</label>
            <input
              value={nodeName}
              onChange={(evt) => setNodeName(evt.target.value)}
              className="border-2 border-black rounded-sm p-1 w-full mb-2"
            />
          </div>
        ) : (
          <div>
            <BiMessageRoundedDetail className="text-4xl" />
            <p>Message</p>
          </div>
        )}
      </div>
    </ReactFlow>
  );
}
