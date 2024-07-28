import Avatar from "./Avatar"

export const Appbar = ()=>{
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center font-bold h-full ml-4 cursor-pointer">      
          PayTM App  
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center font-bold h-full mr-4">
                Hello!
            </div>
            <Avatar/>
            </div>
            
        </div>
}
