import { useState } from 'react';

function DebugPanel({ tasks }) {
  const [isOpen, setIsOpen] = useState(false);

  const localStorageData = localStorage.getItem('my-tasks');
  
  // Função para limpar localStorage (útil para demonstração)
  const clearStorage = () => {
    if (window.confirm('Clear all data? This will remove all tasks.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Função para exportar dados (feature adicional)
  const exportData = () => {
    const data = {
      tasks,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-tasks-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
        title="Developer Tools"
      >
        <span>🔧</span>
        <span className="hidden sm:inline">Dev Tools</span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white/95 backdrop-blur-md text-gray-800 p-4 rounded-lg shadow-xl max-w-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Developer Panel</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Stats */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-800">Application Stats</div>
              <div className="text-lg font-bold text-blue-900">{tasks.length} Tasks</div>
              <div className="text-xs text-blue-600">
                Storage: {localStorageData ? 'Active' : 'Empty'}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={exportData}
                className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              >
                📥 Export Data
              </button>
              
              <button
                onClick={clearStorage}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
              >
                🗑️ Clear Storage
              </button>
            </div>

            {/* Info */}
            <div className="text-xs text-gray-500 pt-2 border-t">
              <div>🔒 Data stored locally</div>
              <div>⚡ Built with React + Vite</div>
              <div>🎨 Styled with Tailwind CSS</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DebugPanel;