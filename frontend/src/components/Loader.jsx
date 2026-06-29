import "../App.css";

const Loader = () =>{
  return(
  <>
  <div className="loadHolder mt-10 mb-4">
    <div className="outerLoader">
      <div className="innerLoader"></div>
    </div>
  </div>
  <p>Loading ...</p>
  </>
  )
}

export default Loader;