import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RealTime } from "../FIlters/Realtime"
import { Posts } from "../Pagination/Posts"
import { ToggleCompare } from "../redux/actions"
import { MyActions } from "../redux/reducer"

export const ChooseCompare = ()=>{


    const StateData = useSelector(state=> state.MyActions)
    const dispatch = useDispatch()

    
    useEffect(()=>{
            dispatch(ToggleCompare())
            console.log("Mount Compare" ,StateData.compare)
            return()=>{
                dispatch(ToggleCompare())
                console.log("UnMount Compare" ,StateData.compare)

            }
    },[])


   


    return(
        <div className="container">    
           <Posts data={StateData.ApiData}></Posts>
        </div>
    )


}