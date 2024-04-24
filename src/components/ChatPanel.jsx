import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  addEdge,
  Controls,
  getConnectedEdges,
} from "reactflow";

import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";

import SingleNode from "./SingleNode";

const initialNodes = [
  {
    id: "1",
    data: { label: "text message 1" },
    position: { x: 100, y: 250 },
    type: "textUpdater",
  },
  {
    id: "2",
    data: { label: "text message 2" },
    position: { x: 400, y: 200 },
    type: "textUpdater",
  },
];

localStorage.setItem("nodes", JSON.stringify(initialNodes));

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const defaultViewport = { x: 0, y: 0, zoom: 1.2 };

let id = 2;
const getId = () => `dndnode_${id++}`;

export default function ChatPanel() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const nodeTypes = useMemo(() => ({ textUpdater: SingleNode }), []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeHidden, setNodeHidden] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const Toast = ({ message, type }) => {
    return (
      <div
        className={`toast ${type} fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-white`}
      >
        <p>{message}</p>
      </div>
    );
  };

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

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

  useEffect(() => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    let isConnected = connectedEdges.length === nodes.length - 1;
    setIsConnected(isConnected);
  }, [nodes, edges]);

  return (
    <>
      <div className="relative">
        <div className="bg-slate-200 py-2 px-4 text-end text-sm h-14 sticky top-0 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            BiteSpeed ChatBot Flow Builder
          </h1>
          <button
            className="bg-white border border-blue-600 text-blue-600 font-bold py-2 px-10 rounded md:mr-10"
            onClick={handleClick}
          >
            Save Changes
          </button>
        </div>
        {showToast && <Toast message={toastMessage} type={toastType} />}
      </div>
      <div className="flex flex-col h-full">
        <ReactFlowProvider>
          <div className="flex flex-grow">
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
            <div className="updatenode__controls border-2 border-gray-300 rounded-sm md:min-w-60 h-[calc(100vh-3.5rem)] fixed top-14 bottom-0 right-0 bg-white">
              {isNodeSelected ? (
                <div>
                  <div className="flex justify-between items-center text-base border-b-2 py-2 px-4">
                    <button
                      onClick={() => {
                        setSelectedNode(null);
                        setIsNodeSelected(false);
                      }}
                    >
                      <FaArrowLeft />
                    </button>
                    <span>Message</span>
                    <span></span>
                  </div>
                  <div className="p-4">
                    <label className="mb-2 text-gray-600">Text</label>
                    <textarea
                      value={nodeName}
                      onChange={(evt) => setNodeName(evt.target.value)}
                      className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  {" "}
                  <div
                    className="text-blue-600 flex justify-center items-center flex-col border-2 border-blue-600 rounded-lg w-fit px-12 py-2"
                    draggable
                    onDragStart={(event) => onDragStart(event, "default")}
                  >
                    <BiMessageRoundedDetail className="text-4xl" />
                    <p>Message</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
}
