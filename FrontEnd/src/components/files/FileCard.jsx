function FileCard({ file }) {
  const icons = {
    pdf:    { icon: '📄', bg: 'bg-red-50',    text: 'text-red-600' },
    image:  { icon: '🖼️', bg: 'bg-purple-50', text: 'text-purple-600' },
    doc:    { icon: '📝', bg: 'bg-blue-50',   text: 'text-blue-600' },
    text:   { icon: '📃', bg: 'bg-green-50',  text: 'text-green-600' },
    folder: { icon: '📁', bg: 'bg-yellow-50', text: 'text-yellow-600' },
    default:{ icon: '📎', bg: 'bg-gray-50',   text: 'text-gray-600' },
  }

  const style = icons[file.type] || icons.default

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg ${style.bg} flex items-center justify-center text-2xl mb-3`}>
        {style.icon}
      </div>

      {/* File name */}
      <p className="text-sm font-medium text-gray-800 truncate mb-1">
        {file.name}
      </p>

      {/* File size */}
      <p className="text-xs text-gray-400">
        {formatSize(file.size)}
      </p>
    </div>
  )
}

export default FileCard