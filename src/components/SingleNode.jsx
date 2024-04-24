import { useCallback, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

export default function SingleNdode({ data, selected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-white border-2  rounded-lg overflow-hidden md:min-w-60 max-w-60 text-xs shadow-2xl ${
        selected ? "border-blue-500" : "border-black"
      } ${isHovered ? "border-2" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        <div
          className={`flex justify-between items-center bg-green-200 px-4 py-[6px] ${
            selected ? "bg-blue-200" : ""
          }`}
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
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
