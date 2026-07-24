import { useState, useRef } from 'react'
import Modal from '../ui/Modal'

function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFiles(selected) {
    setFiles(Array.from(selected))
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleUpload() {
    if (files.length === 0) return
    // TODO Phase 2: send files to backend API
    console.log('Uploading:', files.map(f => f.name))
    setFiles([])
    onClose()
  }

  function formatSize(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Files">

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
          ${dragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'
          }`}
      >
        <div className="text-4xl mb-3">☁️</div>
        <p className="text-sm font-medium text-gray-700">
          Drag files here or <span className="text-indigo-600">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">Max 100MB per file</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
              <span className="text-xs text-gray-400 ml-3 shrink-0">{formatSize(file.size)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-medium py-2.5 rounded-lg transition"
        >
          Upload {files.length > 0 ? `(${files.length})` : ''}
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}


export default UploadModal