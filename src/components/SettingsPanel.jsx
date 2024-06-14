import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";

export default function SettingsPanel({
  isNodeSelected,
  nodeName,
  setNodeName,
  setSelectedNode,
  setIsNodeSelected,
  onDragStart,
}) {
  return (
    <div className="border-0 flex justify-center items-center md:items-baseline md:justify-normal border-t-2 md:border-2 border-gray-300 h-7vh rounded-sm md:min-w-60 md:h-[calc(100vh-3.5rem)] md:fixed md:top-14 bottom-0 right-0 bg-white">
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
              onKeyDown={(evt) => {
                if (evt.key === "Enter" && !evt.shiftKey) {
                  setSelectedNode(null);
                  setIsNodeSelected(false);
                  // Clear selected node and deselect
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          {" "}
          <div
            className="cursor-grab text-blue-600 flex justify-center items-center flex-col border-2 border-blue-600 rounded-lg w-fit px-12 py-2"
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
