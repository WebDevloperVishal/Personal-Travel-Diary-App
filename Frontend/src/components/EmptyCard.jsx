import React from "react"

const EmptyCard = ({ imgSrc, message, setOpenAddEditModal }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mx-auto p-8 bg-gray-100 rounded-lg shadow-lg border border-gray-300 max-w-sm">
      <div className="bg-white p-4 rounded-full shadow">
        <img src={imgSrc} alt="image" className="w-32 h-32 object-contain" />
      </div>

      <p className="text-[16px] font-semibold text-gray-800 text-center mt-6">
        {message}
      </p>

      <button
        className="mt-4 px-5 py-2 text-white text-sm font-medium bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-all"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        Create New
      </button>
    </div>
  )
}

export default EmptyCard