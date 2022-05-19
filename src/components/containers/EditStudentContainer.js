/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk,fetchAllCampusesThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      gpa: "",
      campusId: null,
      imageUrl: "",
      redirect: false, 
      redirectId: null
    };
  }
  // Get student data from back-end database
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchAllCampuses();
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
    
    let inputfirstname,inputlastname,inputemail,inputgpa,inputcampusId,inputimage ="";
    
    if(this.state.firstname.length === 0){
      inputfirstname = this.props.student.firstname;
    }
    else{
      inputfirstname = this.state.firstname;
    }
    if(this.state.lastname.length === 0){
      inputlastname = this.props.student.lastname;
    }
    else{
      inputlastname = this.state.lastname;
    }
    if(this.state.email.length === 0){
      inputemail = this.props.student.email;
    }
    else{
      inputemail = this.state.email;
    }
    if(this.state.gpa.length === 0){
      inputgpa = this.props.student.gpa;
    }
    else{
      inputgpa = this.state.gpa;
    }
    if(this.state.campusId === null){
      inputcampusId = this.props.campusId;
    }
    else{
      inputcampusId = this.state.campusId;
    }
    if(this.state.imageUrl.length === 0){
      inputimage = this.props.student.imageUrl;
    }
    else{
      inputimage = this.state.imageUrl;
    }
    let student = {
        id:this.props.student.id,
        firstname: inputfirstname,
        lastname: inputlastname,
        email:inputemail,
        gpa:inputgpa,
        campusId: inputcampusId,
        imageUrl:inputimage,
    };

    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email:"",
      gpa:"",
      campusId: null, 
      imageUrl: null,
      redirect: true, 
      redirectId: student.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render Edit student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      //return (<Redirect to={`/student/${this.state.redirectId}`}/>)
      return (<Redirect to={`/students`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student}
          allCampuses={this.props.allCampuses}      
        />
      </div>          
    );
  }
}
// The following 2 input arguments are passed to the "connect" function used by "AllStudentsContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allStudents".
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
    allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
  };
};
// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);