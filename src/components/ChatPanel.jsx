import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  addEdge,
  Controls,
  getConnectedEdges,
} from "reactflow";

import NodeControls from "./NodeControls";
import { initialEdges, initialNodes, defaultViewport } from "../utils/constant";

import SingleNode from "./SingleNode";
import Toast from "./Toast"; // Assuming Toast component is in a separate file
import Header from "./Header";

// Function to generate unique node IDs
let id = 2;
const getId = () => `dndnode_${id++}`;

// Main ChatPanel component
export default function ChatPanel() {
  // State variables
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeHidden, setNodeHidden] = useState(false);

  // Memoized node types
  const nodeTypes = useMemo(() => ({ textUpdater: SingleNode }), []);

  // Callback function for connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Function to handle click event
  const handleClick = () => {
    if (isConnected) {
      setToastMessage("Saved successfully!");
      setToastType("bg-green-500");
    } else {
      setToastMessage("Error: All nodes are not connected");
      setToastType("bg-red-500");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Effect for updating node label
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNode && node.id === selectedNode) {
          node.data.label = nodeName;
        }
        return node;
      })
    );
  }, [nodeName, setNodes, selectedNode]);

  // Effect for hiding/showing nodes and edges
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
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

  // Effect to check if all nodes are connected
  useEffect(() => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    let isConnected = connectedEdges.length === nodes.length - 1;
    setIsConnected(isConnected);
  }, [nodes, edges]);

  // Function to handle drag start
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Callback function for drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Callback function for drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        data: { label: "text message " + parseInt(nodes.length + 1) },
        position: { x: 500, y: 100 },
        type: "textUpdater",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  return (
    <>
      <Header
        showToast={showToast}
        handleClick={handleClick}
        toastMessage={toastMessage}
        toastType={toastType}
      />
      {/* Main ChatPanel content */}
      <div className="flex flex-col h-full">
        <ReactFlowProvider>
          <div className="flex flex-grow">
            {/* ReactFlow graph */}
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
                setSelectedNode(node.id);
                setNodeName(node.data.label);
                setIsNodeSelected(true);
              }}
              onPaneClick={() => {
                setSelectedNode(null);
                setIsNodeSelected(false);
              }}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
            >
              <Controls />
            </ReactFlow>
            {/* Controls for updating node */}
            <NodeControls
              isNodeSelected={isNodeSelected}
              nodeName={nodeName}
              setNodeName={setNodeName}
              setSelectedNode={setSelectedNode}
              setIsNodeSelected={setIsNodeSelected}
              onDragStart={onDragStart}
            />
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
}
