import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { FileOutput } from "lucide-react";

const OutputNode: React.FC<{ data: NodeData }> = ({ data }) => {
    const [labelEditing, setLabelEditing] = useState(false);
    const [labelValue, setLabelValue] = useState(data?.label ?? "");
    const [outputValue, setOutputValue] = useState(data?.output ?? "");
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setLabelValue(data?.label ?? "");
    }, [data?.label]);

    useEffect(() => {
        setOutputValue(data?.output ?? "");
    }, [data?.output]);

    const commitLabel = () => {
        setLabelEditing(false);
        setFocused(false);
        if (labelValue !== data?.label) data?.onChange?.(labelValue, "label");
    };

    const cancelLabel = () => {
        setLabelEditing(false);
        setFocused(false);
        setLabelValue(data?.label ?? "");
    };

    return (
        <div
            className={`w-[180px] p-2 rounded-2xl shadow-sm backdrop-blur-md transition-all text-sm flex flex-col items-center
        ${focused ? "border-2 border-orange-600 bg-orange-100" : "border border-orange-400 bg-orange-50/70"}
      `}
        >
            <FileOutput className="text-orange-500 mb-1" size={18} />

            {labelEditing ? (
                <input
                    value={labelValue}
                    onChange={(e) => setLabelValue(e.target.value)}
                    onBlur={commitLabel}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commitLabel();
                        if (e.key === "Escape") cancelLabel();
                    }}
                    autoFocus
                    onFocus={() => setFocused(true)}
                    className="w-full text-center px-2 py-1 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-orange-500 mb-1"
                />
            ) : (
                <div
                    onClick={() => setLabelEditing(true)}
                    className="text-orange-700 font-semibold text-sm cursor-text select-none mb-1"
                >
                    {data?.label ?? "Output"}
                </div>
            )}

            <textarea
                value={outputValue || "Final output placeholder"}
                readOnly
                className="w-full border rounded-md p-1 text-sm bg-orange-50 cursor-not-allowed resize-none focus:outline-none"
            />



            <Handle type="target" position={Position.Left} className="!bg-orange-500" />
        </div>
    );
};

export default OutputNode;
