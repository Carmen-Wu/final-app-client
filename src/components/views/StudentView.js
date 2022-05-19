/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
//import { deleteStudent } from "../../store/actions/actionCreators";
const StudentView = (props) => {
  const { student } = props;
  const { deleteStudent} = props;
  // If the student doesn't go to college
  if (!student.campusId) {
    return (
      <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h1>{"Email: " + student.email}</h1>
      <h1>{"GPA: "+student.gpa}</h1>
      <h3>{"doesn't go to college"}</h3>
      <img src={student.imageUrl} width ="200px" height="200px" alt={student.firstname + "Profile Picture" }/>
      <br></br>
      <Link to={`/students`}>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
      <Link to={`/editstudent/${student.id}`}>
      <button>Edit</button>
      </Link>  
    </div>
    );
  }

  // Render a single Student view 
  return (
    <div>
      
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h1>{"Email: " + student.email}</h1>
      <h1>{"GPA: "+student.gpa}</h1>
      <Link to={`/campus/${student.campusId}`}>
      <h3>{student.campus.name}</h3>
      </Link>
      <img src={student.imageUrl} width ="200px" height="200px"  alt={student.firstname + "Profile Picture" }/>
      <br></br>
      <Link to={`/students`}>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
      <Link to={`/editstudent/${student.id}`}>
      <button>Edit</button>
      </Link>  
      <br></br>
      
      
    </div>
  );

};

export default StudentView;