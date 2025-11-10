import React from 'react'

const Toolbar = () => {
  const handleExport = () => {
    alert('Export JSON coming soon...')
  }

  const handleImport = () => {
    alert('Import JSON coming soon...')
  }

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white shadow p-2 rounded">
      <button onClick={handleExport} className="bg-blue-500 text-white px-3 py-1 rounded">
        Export
      </button>
      <button onClick={handleImport} className="bg-green-500 text-white px-3 py-1 rounded">
        Import
      </button>
    </div>
  )
}

export default Toolbar