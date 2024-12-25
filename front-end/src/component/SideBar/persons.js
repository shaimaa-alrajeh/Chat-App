function Person({element}) {
    return (
        <div className="flex items-center mb-4 cursor-pointer bg-[#d1e5a157] hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                {/* <img src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" /> */}
                <img src={element.img}/>
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-semibold" style={{display: "inline"}}>{element.contactName}</h2>
                <span className="font-semibold ml-5">{element.contactNumber}</span>
                {/* <p className="text-gray-600">Hoorayy!!</p> */}
            </div>
        </div>
    )
}
export default Person