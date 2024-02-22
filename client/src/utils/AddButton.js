function AddButton({act}) {
    return (
        <div className="w-auto h-auto">
        <div className="flex-1 h-full">
          <button 
            className="flex items-center justify-center flex-1 h-full p-2 bg-gray-800 hover:bg-gray-900 text-white shadow rounded-full"
            onClick={act}>
            <div className="relative">
              <svg src="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    )
}

export default AddButton;
