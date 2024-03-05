function DeleteConfirm({setDelete, handleRemove, msg, close}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
            <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                    <div className="md:flex items-center">
                        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                             <svg class="text-gray-400 dark:text-gray-500 w-11 h-11  mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="font-bold">Warning!</p>
                        <p className="text-sm text-gray-700 mt-1">{msg}
                        </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button id="confirm-delete-btn" onClick={handleRemove} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                        {close? 'Close' : 'Delete'}
                        </button>
                        <button id="confirm-cancel-btn" onClick={setDelete} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm;
