import { useState } from 'react';

function DebugPanel({ tasks }) {
  const [isOpen, setIsOpen] = useState(false);

  const localStorageData = localStorage.getItem('my-tasks');
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
      >
        Debug 🐛
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-md">
          <h3 className="font-bold mb-2">Debug Info</h3>
          <div className="text-sm space-y-2">
            <div>
              <strong>Tasks in state:</strong> {tasks.length}
            </div>
            <div>
              <strong>localStorage exists:</strong> {localStorageData ? '✅' : '❌'}
            </div>
            <div>
              <strong>localStorage content:</strong>
              <pre className="text-xs bg-gray-800 p-2 rounded mt-1 overflow-auto">
                {localStorageData || 'Empty'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DebugPanel;