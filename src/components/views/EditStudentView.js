/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the Edit student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const {handleChange, handleSubmit,student } = props;
  const classes = useStyles();

  // Render a Edit Student view with an input form
  return (
    <div>
      <h1>Edit Student</h1>
      
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
            Edit {student.firstname} {student.lastname}'s file
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
  
          <label style= {{color:'#11153e', fontWeight: 'bold'}}>New First Name: </label>
          <input  type="text" name="firstname" onChange ={(e) => handleChange(e)}  />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>New Last Name: </label>
          <input  type="text" name="lastname" onChange={(e) => handleChange(e)}  />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>New email: </label>
          <input type="email" name="email" onChange={(e) => handleChange(e)}  />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>New GPA: </label>
          <input  type="number" min="0" max="4.00" step="0.01" name="gpa" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>


          <label style= {{color:'#11153e', fontWeight: 'bold'}} for="campus">Choose a campus:</label>
          <select name="campusId" id="campus" onChange ={(e) => handleChange(e)} required>
            <option value = {null}>none</option>
          {props.allCampuses.map((campus) => (
            <option value={campus.id}>{campus.id}</option>
            ))}
          </select>
          <br/>
          <br/>
            

          <label style={{color:'#11153e', fontWeight: 'bold'}}>New image URL: </label>
          <input type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <br/>
          <br/>
          </form>
          
          </div>
      </div>
    </div>    
  )
}

export default EditStudentView;