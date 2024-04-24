import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  addEdge,
  Controls,
} from "reactflow";

import "./ChatPanel.css";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";

import Sidebar from "./Sidebar";
import SingleNdode from "./SingleNode";

const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 100, y: 0 },
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

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function ChatBot() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const nodeTypes = useMemo(() => ({ textUpdater: SingleNdode }), []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodeName, setNodeName] = useState("Node 1");
  const [nodeHidden, setNodeHidden] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        data: { label: "Node " + parseInt(nodes.length + 1) },
        position: { x: 500, y: 100 },
        type: "textUpdater",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
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
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
          <div className="updatenode__controls border-2 border-gray-300 rounde-sm md:min-w-60 h-[calc(100vh-3.5rem)] fixed top-14 bottom-0 right-0">
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
                <div className=" p-4">
                  <label className="mb-2 text-gray-600">Text</label>
                  <textarea
                    value={nodeName}
                    onChange={(evt) => setNodeName(evt.target.value)}
                    className="border-2 border-gray-300  p-2 w-full mb-2 rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4">
                {" "}
                <div
                  className="text-blue-600 flex justify-center items-center flex-col border-2 border-blue-600 rounded-lg w-fit px-12 py-2"
                  draggable // Add draggable attribute here
                  onDragStart={(event) => onDragStart(event, "input")} // Handle dragstart event
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
  );
}
