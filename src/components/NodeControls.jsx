import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";

export default function NodeControls({
  isNodeSelected,
  nodeName,
  setNodeName,
  setSelectedNode,
  setIsNodeSelected,
  onDragStart,
}) {
  return (
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
  );
}
