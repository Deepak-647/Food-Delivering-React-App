const ShimmerRestaurantMenu = ()=>{
    return(
        <>
        <div className="flex flex-col items-center">
            {Array(15).fill("").map((e,index) => <div key={index} className="h-40 w-3/5 bg-slate-200 my-4"></div>)}
        </div>
        </>
    )
}
export default ShimmerRestaurantMenu;