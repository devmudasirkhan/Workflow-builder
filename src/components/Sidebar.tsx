import React from 'react'

const Sidebar = () => {
  const nodeTypes = ['Input Node', 'Process Node', 'Output Node']

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 bg-white border-r p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">Nodes</h2>
      {nodeTypes.map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          className="p-2 bg-gray-100 rounded cursor-move hover:bg-gray-200"
        >
          {type}
        </div>
      ))}
    </div>
  )
}

export default Sidebar