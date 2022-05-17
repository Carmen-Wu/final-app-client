/*==================================================
EditCampusContainer.js
The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk, fetchAllStudentsThunk, editStudentThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "", 
      description: "", 
      imageUrl: "",
      redirect: false, 
      redirectId: null
    };
  }

  // Get all campuses data from back-end database
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
    this.props.fetchAllStudents();
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
   
    
    let inputname,inputaddress,inputimageUrl,inputdescription = "";
    if(this.state.name.length === 0){
      inputname = this.props.campus.name;
    }
    else{
      inputname = this.state.name;
    }
    if(this.state.address.length === 0){
      inputaddress = this.props.campus.address;
    }
    else{
      inputaddress = this.state.address;
    }
    if(this.state.description.length === 0){
      inputdescription = this.props.campus.description;
    }
    else{
      inputdescription = this.state.description;
    }
    if(this.state.imageUrl.length === 0){
      inputimageUrl = this.props.campus.imageUrl;
    }
    else{
      inputimageUrl = this.state.imageUrl;
    }
    let updateCampus = {
      id: this.props.campus.id,
      name: inputname,
      address: inputaddress,
      description: inputdescription,
      imageUrl: inputimageUrl
  };
    
    // Edit campus in back-end database
    await this.props.editCampus(updateCampus);

    // Update state, and trigger redirect to show the edited campus
    this.setState({
      name: "", 
      address: "", 
      description: "",
      imageUrl: "",
      redirect: true, 
      redirectId: this.state.id
    });
  }
  addStudent =(student) =>{
    student.campusId = this.props.campus.id;
    this.props.editStudent(student);
  }
  removeStudent=(student) =>{
    student.campusId = null;
    this.props.editStudent(student);
  }
  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      //return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
      return (<Redirect to={`/campuses`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
          campus={this.props.campus}
          students={this.props.allStudents}
          removeStudent={this.removeStudent}
          addStudent={this.addStudent}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allCampuses".
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    allStudents: state.allStudents,  // Get the State object from Reducer "allStudents"
  };
};  

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);