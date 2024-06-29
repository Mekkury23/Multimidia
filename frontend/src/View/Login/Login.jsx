import { Link } from "react-router-dom";
import "./Login.css";


function Login() {
  

  return (
    <div className='todaPagina'>
      <div className='paleta'>

        <h1>Login Form</h1>
        <div className='form'>
            <input type='text' placeholder='Email' className='input'/>
            <input type='text' placeholder='Password' className='input'/>
        </div>
        
        <button className='loginBtn'>Login</button>
        <Link to={"/Signup"}> <p>Crie a sua conta!!</p></Link> 
      </div>
    </div>
  )
}

export default Login;