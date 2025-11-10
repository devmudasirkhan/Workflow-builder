import React from "react";
import { Undo2, Redo2, ZoomIn, ZoomOut, Maximize2, Download, Trash2, Upload } from "lucide-react";



interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}


const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFitView,
  onExport,
  onImport,
  onClear,
}) => {
  const buttons = [
    { icon: <Undo2 size={16} />, label: "Undo", onClick: onUndo },
    { icon: <Redo2 size={16} />, label: "Redo", onClick: onRedo },
    { icon: <ZoomIn size={16} />, label: "Zoom In", onClick: onZoomIn },
    { icon: <ZoomOut size={16} />, label: "Zoom Out", onClick: onZoomOut },
    { icon: <Maximize2 size={16} />, label: "Fit View", onClick: onFitView },
    { icon: <Download size={16} />, label: "Export", onClick: onExport },
    { icon: <Upload size={16} />, label: "Import", onClick: () => document.getElementById("importFile")?.click() },
    { icon: <Trash2 size={16} />, label: "Clear", onClick: onClear },
  ];

  return (
    <div className="w-full flex items-center gap-3 p-2 px-4 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-10">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white/80 hover:bg-gray-100 hover:shadow-sm transition-all"
        >
          {btn.icon}
          <span className="hidden sm:inline">{btn.label}</span>
        </button>
      ))}
      <input id="importFile" type="file" accept="application/json" onChange={onImport} hidden />
    </div>
  );
};

export default Toolbar;
