"use client";

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  Controls,
  MiniMap,
  ReactFlowInstance,
  NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";

import InputNode from "../nodes/InputNode";
import ProcessNode from "../nodes/ProcessNode";
import OutputNode from "../nodes/OutputNode";

const nodeTypes = {
  input: InputNode,
  process: ProcessNode,
  output: OutputNode,
};

interface CanvasEditorProps {
  onSelectNode: (node: Node | null) => void;
  onUpdateNodeRef: React.MutableRefObject<
    ((id: string, field: string, value: string) => void) | null
  >;
}

const CanvasInner = forwardRef(({ onSelectNode, onUpdateNodeRef }: CanvasEditorProps, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [redoStack, setRedoStack] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const flowRef = useRef<ReactFlowInstance | null>(null);
  const selectedNodeRef = useRef<Node | null>(null);

  const pushToHistory = useCallback(() => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setRedoStack([]);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      pushToHistory();
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#6366f1", strokeWidth: 2 } }, eds)
      );
    },
    [pushToHistory]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const position = { x: event.clientX - bounds.left - 250, y: event.clientY - bounds.top - 40 };

      const newNode: Node = {
        id: `${+new Date()}`,
        type: nodeType,
        position,
        data: {
          label: `${nodeType} node`,
          status: "",
          onChange: () => { },
          onDelete: () => { },
        },
      };

      pushToHistory();
      setNodes((nds) => nds.concat(newNode));
    },
    [pushToHistory]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node: Node) => {
      selectedNodeRef.current = node;
      onSelectNode(node);
    },
    [onSelectNode]
  );

  const onPaneClick = () => {
    selectedNodeRef.current = null;
    onSelectNode(null);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);


  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack((r) => [{ nodes, edges }, ...r]);
    setNodes(previous.nodes);
    setEdges(previous.edges);
    setHistory((h) => h.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory((h) => [...h, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
    setRedoStack((r) => r.slice(1));
  };

  const zoomIn = () => flowRef.current?.zoomIn?.();
  const zoomOut = () => flowRef.current?.zoomOut?.();
  const fitView = () => flowRef.current?.fitView?.();

  const handleExport = () => {
    const data = { nodes, edges };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-export.json";
    a.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
    } catch {
      alert("Invalid file format");
    }
  };

  // ✅ No alert, clear directly
  const handleClear = () => {
    pushToHistory();
    setNodes([]);
    setEdges([]);
    onSelectNode(null);
  };

  const updateNodeData = (id: string, field: string, value: string) => {
    setNodes((nds) => {
      const updated = nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node
      );
      const updatedNode = updated.find((n) => n.id === id);
      if (updatedNode) onSelectNode({ ...updatedNode });
      return updated;
    });
  };

  const deleteNode = (id: string) => {
    pushToHistory();
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    onSelectNode(null);
  };

  onUpdateNodeRef.current = updateNodeData;

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: (value: string, field?: string) =>
            updateNodeData(node.id, field ?? "label", value),
          onDelete: () => deleteNode(node.id),
        },
      }))
    );
  }, [nodes.length]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedNodeRef.current) {
        deleteNode(selectedNodeRef.current.id);
        selectedNodeRef.current = null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useImperativeHandle(ref, () => ({
    handleUndo,
    handleRedo,
    zoomIn,
    zoomOut,
    fitView,
    handleExport,
    handleImport,
    handleClear,
    handleDeleteNode: deleteNode, // ✅ expose deletion to parent
  }));


  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={(instance) => (flowRef.current = instance)}
        fitView
        defaultEdgeOptions={{ animated: true }}
      >
        <MiniMap nodeStrokeColor="#6366f1" nodeColor="#eef2ff" />
        <Controls />
        <Background color="#e5e7eb" gap={20} />
      </ReactFlow>
    </div>
  );
});

const CanvasEditor = forwardRef((props: CanvasEditorProps, ref) => (
  <ReactFlowProvider>
    <CanvasInner ref={ref} {...props} />
  </ReactFlowProvider>
));

export default CanvasEditor;
