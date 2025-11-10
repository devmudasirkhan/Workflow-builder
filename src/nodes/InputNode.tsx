import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { Database } from "lucide-react";

const InputNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const [labelEditing, setLabelEditing] = useState(false);
  const [labelValue, setLabelValue] = useState(data?.label ?? "");
  const [inputValue, setInputValue] = useState(data?.input ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setLabelValue(data?.label ?? "");
  }, [data?.label]);

  useEffect(() => {
    setInputValue(data?.input ?? "");
  }, [data?.input]);

  const commitLabel = () => {
    setLabelEditing(false);
    if (labelValue !== data?.label) data?.onChange?.(labelValue);
  };

  const cancelLabel = () => {
    setLabelEditing(false);
    setLabelValue(data?.label ?? "");
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (data?.onChange) data.onChange(val, "input");
  };

  return (
    <div
      className={`w-[180px] p-2 rounded-2xl shadow-sm backdrop-blur-md transition-all text-sm flex flex-col items-center
        ${focused ? "border-2 border-emerald-600 bg-emerald-100" : "border border-emerald-400 bg-emerald-50/70"}
      `}
    >
      <Database className="text-emerald-500 mb-1" size={18} />

      {/* Label */}
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
          className="w-full text-center px-2 py-1 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-1"
        />
      ) : (
        <div
          onClick={() => setLabelEditing(true)}
          className="text-emerald-700 font-semibold text-sm cursor-text select-none mb-1"
        >
          {data?.label ?? "Input"}
        </div>
      )}

      {/* Input field */}
      <textarea
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full text-sm rounded border px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        rows={3}
        placeholder="Input..."
      />

      <Handle type="source" position={Position.Right} className="!bg-emerald-500" />
    </div>
  );
};

export default InputNode;
