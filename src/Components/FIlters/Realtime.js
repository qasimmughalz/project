


export const RealTime = ({search, GetFromChild})=>{



    const handleChange= (val)=>{
        
        console.log("changing value", val)
        GetFromChild(val)
    }



    return(
        <div className="mt-3">
                <input
                value={search}
                onChange={(e)=> handleChange(e.target.value)}
                placeholder="Search Your Car here ..."
                className="form-control "
            >
            </input>
      </div>
    )


}