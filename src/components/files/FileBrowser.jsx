import { useState } from 'react'
import FileCard from './FileCard'

const MOCK_FILES = [
  { id: '1', name: 'Project Report.pdf', size: 2400000, type: 'pdf' },
  { id: '2', name: 'Logo Design.png', size: 1200000, type: 'image' },
  { id: '3', name: 'Meeting Notes.txt', size: 18000, type: 'text' },
  { id: '4', name: 'Resume.pdf', size: 210000, type: 'pdf' },
  { id: '5', name: 'Budget Sheet.doc', size: 340000, type: 'doc' },
  { id: '6', name: 'Profile Photo.jpg', size: 4200000, type: 'image' },
]

function FileBrowser() {
  const [view, setView] = useState('grid')

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{MOCK_FILES.length} files</p>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-2 text-sm transition ${
                view === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2 text-sm transition ${
                view === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              ☰ List
            </button>
          </div>

          {/* Upload button */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            ⬆ Upload
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {MOCK_FILES.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="flex flex-col gap-2">
          {MOCK_FILES.map(file => (
            <div key={file.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-sm transition cursor-pointer">
              <span className="text-xl">
                {{ pdf: '📄', image: '🖼️', text: '📃', doc: '📝' }[file.type] || '📎'}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-800 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 shrink-0">
                {file.size < 1024 * 1024
                  ? (file.size / 1024).toFixed(1) + ' KB'
                  : (file.size / 1024 / 1024).toFixed(1) + ' MB'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileBrowser