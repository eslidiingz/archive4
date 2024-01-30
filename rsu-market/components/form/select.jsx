


function Select(props) {

    return (
      <>
        <div className={props.className}>
            <select className="form-select input-search-set height-54"  aria-label="Default select example">
                <option selected>{props.selected}</option>
                <option value="1">{props.value1}</option>
                <option value="2">{props.value2}</option>
                <option value="3">{props.value3}</option>
            </select>
        </div>
      </>
    )
  }
  export default Select
  