function Tip({ id, tip }){
    return (
      <div>
      <p className="text-white bg-[#453545] p-2   font-medium" style={{ marginRight: "auto" }}>
        {tip?.usertip}
      </p>
      <p className="text-white  p-2  font-medium" style={{ marginLeft: "auto" }}>
        {tip?.Mytip}
      </p>
    </div>
    );
}

export default Tip;