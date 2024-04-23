import { useCallback } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

export default function SingleNdode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="border border-1 border-black rounded-lg overflow-hidden md:min-w-60 text-xs">
      <Handle type="source" position={Position.Left} />
      <div>
        <div className="flex justify-between items-center bg-green-200  px-4 py-[6px]">
          <div className="flex justify-center items-center gap-1">
            <BiMessageRoundedDetail />
            <span className="font-bold">Send Message</span>
          </div>
          <span className="bg-white rounded-full h-4 w-4 p-[2px]">
            <IoLogoWhatsapp className="text-green-500 " />
          </span>
        </div>
        <p className="p-3">{data.label}</p>
      </div>
      <Handle type="target" position={Position.Right} id="a" />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      /> */}
    </div>
  );
}
