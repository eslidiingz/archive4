import Button from 'react-bootstrap/Button';


function Search(props) {

    return (
      <>
            <div className="position-relative search">
                <input className="form-control search input-search-set" placeholder={props.placeholder}/>
                <i className="fas fa-search icon-search"></i>
            </div>
      </>
    )
  }
  export default Search
  