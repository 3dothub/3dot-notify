import React, { memo, useState } from "react"
import './Toaster.css'


const Toaster = ()=>{
    const [state, setState] = useState(false)

    return(
        <div className="toasterContainer">
            <div className={`toasterIsland ${state ? 'in' : ''}`} onClick={()=>setState(!state)}></div>
        </div>
    )

}

export default memo(Toaster)