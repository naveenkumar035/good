function Sidebar() {
    return (
        <div>
            <span className=" hidden sm:block xl:inline" > 
            <form className="flex p-4" >
                <input placeholder="search anything" className="bg-[#35353f] p-1 text-white flex rounded" />
            </form>
            </span>
        </div>
  );
}
export default Sidebar;