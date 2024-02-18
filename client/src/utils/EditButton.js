function EditButton(){
    return (
        <div class="w-auto h-auto">
            <div class="flex-1 h-full">
                <button class="flex items-center justify-center flex-1 h-full p-2 bg-gray-800 hover:bg-gray-900 text-white shadow rounded-lg">
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </button>
            </div>
        </div>
    )
}

export default EditButton;
