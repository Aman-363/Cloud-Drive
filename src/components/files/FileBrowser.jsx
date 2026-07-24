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
  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {MOCK_FILES.length} files
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          ⬆ Upload
        </button>
      </div>

      {/* File grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {MOCK_FILES.map(file => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}

export default FileBrowser