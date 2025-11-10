import React from "react";
import { Database, Cog, FileOutput } from "lucide-react";

const nodeTypes = [
  { label: "Input Node", type: "input", icon: <Database size={18} /> },
  { label: "Process Node", type: "process", icon: <Cog size={18} /> },
  { label: "Output Node", type: "output", icon: <FileOutput size={18} /> },
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      className="
        w-60 bg-gradient-to-b from-gray-900 to-gray-800 text-white 
        p-4 flex flex-col gap-3 border-r border-gray-700 
        backdrop-blur-md shadow-lg
      "
    >
      <h3 className="text-lg font-semibold mb-4 tracking-wide text-gray-200">
        Nodes
      </h3>

      {nodeTypes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          className="
            cursor-move flex items-center gap-2 
            bg-gray-700/60 hover:bg-gray-600/60 
            px-3 py-2 rounded-lg transition-all duration-200
            border border-gray-600 hover:scale-[1.02]
          "
        >
          {node.icon}
          <span className="text-sm">{node.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
