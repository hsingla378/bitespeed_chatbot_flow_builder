import React, { useCallback, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, Position } from "reactflow";

// Separate component for the handle
const CustomHandle = () => {
  return <Handle type="target" position={Position.Left} />;
};

// Component for the message content
const MessageContent = ({ data }) => {
  return (
    <div>
      <div
        className={`flex justify-between items-center bg-green-200 px-4 py-[6px]`}
      >
        <div className="flex justify-center items-center gap-1">
          <BiMessageRoundedDetail />
          <span className="font-bold">Send Message</span>
        </div>
        <span className="bg-white rounded-full h-4 w-4 p-[2px]">
          <IoLogoWhatsapp className="text-green-500 " />
        </span>
      </div>
      <p className="p-3 h-auto">{data.label}</p>
    </div>
  );
};

// Main component for the single node
const SingleNode = ({ data, selected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className={`bg-white border-2  rounded-lg overflow-hidden md:min-w-60 max-w-60 text-xs shadow-2xl ${
        selected ? "border-blue-500" : "border-black"
      } ${isHovered ? "border-2" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <CustomHandle />
      <MessageContent data={data} />
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

export default SingleNode;
