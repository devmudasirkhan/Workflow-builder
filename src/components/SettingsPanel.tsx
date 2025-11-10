import React from "react";
import { Node } from "reactflow";

interface Props {
  selectedNode: Node | null;
  onUpdateNode: (id: string, field: string, value: string) => void;
  onDeleteNode: (id: string) => void;
}

const SettingsPanel: React.FC<Props> = ({ selectedNode, onUpdateNode, onDeleteNode }) => {
  if (!selectedNode)
    return (
      <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 text-sm text-gray-400 flex items-center justify-center">
        Select a node to edit its settings
      </div>
    );

  const { id, type, data } = selectedNode;

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 flex flex-col gap-4 shadow-inner">
      <h3 className="text-base font-semibold text-gray-700 mb-2">Node Settings</h3>

      {/* Label */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Label</label>
        <input
          value={data?.label || ""}
          onChange={(e) => onUpdateNode(id, "label", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Node Type */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
        <p className="text-sm text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded-md inline-block">
          {type}
        </p>
      </div>

      {/* Node-specific fields */}
      {type === "input" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Input</label>
          <textarea
            value={data?.input || ""}
            onChange={(e) => onUpdateNode(id, "input", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
          />
        </div>
      )}

      {type === "process" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Template</label>
          <textarea
            value={data?.template || ""}
            onChange={(e) => onUpdateNode(id, "template", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={4}
          />
        </div>
      )}

      {type === "output" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Output</label>
          <textarea
            value={data?.output || "Final output placeholder"}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 cursor-not-allowed"
            rows={4}
          />
        </div>
      )}

      {/* Delete Node */}
      <button
        onClick={() => onDeleteNode(id)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-md transition"
      >
        Delete Node
      </button>
    </div>
  );
};

export default SettingsPanel;
