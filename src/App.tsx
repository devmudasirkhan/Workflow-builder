import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import CanvasEditor from "./components/CanvasEditor";
import SettingsPanel from "./components/SettingsPanel";
import Toolbar from "./components/Toolbar";
import { Node } from "reactflow";

const App = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const onUpdateNodeRef = useRef<((id: string, field: string, value: string) => void) | null>(null);
  const canvasRef = useRef<any>(null);

  const handleUpdateNode = (id: string, field: string, value: string) => {
    if (onUpdateNodeRef.current) {
      onUpdateNodeRef.current(id, field, value);
      setSelectedNode((prev) =>
        prev && prev.id === id ? { ...prev, data: { ...prev.data, [field]: value } } : prev
      );
    }
  };

  const handleDeleteNode = (id: string) => {
    canvasRef.current?.handleDeleteNode(id); // ✅ call deleteNode from CanvasEditor
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 relative">
        <Toolbar
          onUndo={() => canvasRef.current?.handleUndo()}
          onRedo={() => canvasRef.current?.handleRedo()}
          onZoomIn={() => canvasRef.current?.zoomIn()}
          onZoomOut={() => canvasRef.current?.zoomOut()}
          onFitView={() => canvasRef.current?.fitView()}
          onExport={() => canvasRef.current?.handleExport()}
          onImport={(e) => canvasRef.current?.handleImport(e)}
          onClear={() => canvasRef.current?.handleClear()}
        />

        <CanvasEditor
          ref={canvasRef}
          onSelectNode={setSelectedNode}
          onUpdateNodeRef={onUpdateNodeRef}
        />
      </div>

      <SettingsPanel
        selectedNode={selectedNode}
        onUpdateNode={handleUpdateNode}
        onDeleteNode={handleDeleteNode} // ✅ wired up cleanly
      />
    </div>
  );
};

export default App;
