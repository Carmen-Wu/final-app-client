/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const {deleteCampus} = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    <div>
      <p>There are no campuses.</p>
      <Link to = {`newCampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <img src = {campus.imageUrl} width = "200px" height = "200px" alt = {campus.name + "picture"}/>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button onClick = {() => deleteCampus(campus.id)}>Delete</button>
          <Link to={`/editcampus/${campus.id}`}>
          <button>Edit</button>
          </Link>
          <br></br>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newCampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>

    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;