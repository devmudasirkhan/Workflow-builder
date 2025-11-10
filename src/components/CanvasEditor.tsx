import React, { useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'

const CanvasInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const nodeType = event.dataTransfer.getData('application/reactflow')
      const position = { x: event.clientX - 300, y: event.clientY - 50 }
      const newNode: Node = {
        id: `${+new Date()}`,
        type: 'default',
        position,
        data: { label: nodeType },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  )
}

const CanvasEditor = () => (
  <ReactFlowProvider>
    <CanvasInner />
  </ReactFlowProvider>
)

export default CanvasEditor