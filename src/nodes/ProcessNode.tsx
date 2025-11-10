import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { Cog } from "lucide-react";

const ProcessNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const [labelEditing, setLabelEditing] = useState(false);
  const [labelValue, setLabelValue] = useState(data?.label ?? "");
  const [templateValue, setTemplateValue] = useState(data?.template ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setLabelValue(data?.label ?? "");
  }, [data?.label]);

  useEffect(() => {
    setTemplateValue(data?.template ?? "");
  }, [data?.template]);

  const commitLabel = () => {
    setLabelEditing(false);
    if (labelValue !== data?.label) data?.onChange?.(labelValue, "label");
  };

  const cancelLabel = () => {
    setLabelEditing(false);
    setLabelValue(data?.label ?? "");
  };

  const handleTemplateChange = (val: string) => {
    setTemplateValue(val);
    if (data?.onChange) data.onChange(val, "template");
  };

  return (
    <div
      className={`w-[200px] p-2 rounded-2xl shadow-sm backdrop-blur-md transition-all text-sm flex flex-col items-center
        ${focused ? "border-2 border-indigo-600 bg-indigo-100" : "border border-indigo-400 bg-indigo-50/70"}
      `}
    >
      <Cog className="text-indigo-500 mb-1" size={18} />

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
          className="w-full text-center px-2 py-1 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-1"
        />
      ) : (
        <div
          onClick={() => setLabelEditing(true)}
          className="text-indigo-700 font-semibold text-sm cursor-text select-none mb-1"
        >
          {data?.label ?? "Process"}
        </div>
      )}

      <textarea
        value={templateValue}
        onChange={(e) => handleTemplateChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full text-sm rounded border px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-1"
        rows={3}
        placeholder="Template..."
      />

      <div className="text-gray-500 text-xs">{data?.status ?? "Processing..."}</div>

      <Handle type="target" position={Position.Left} className="!bg-indigo-500" />
      <Handle type="source" position={Position.Right} className="!bg-indigo-500" />
    </div>
  );
};

export default ProcessNode;
