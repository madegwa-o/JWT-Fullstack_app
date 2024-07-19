import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import styles from './Login.module.css';
import Footer from '../../common/footer/Footer';
import Navbar from '../../common/navbar/Navbar';

function LoginPage() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
        const userData = await UserService.login(email,password);

        console.log('we the best music');
        console.log(userData);
         if(userData.data.token){
          console.log('the access token is :  ',userData.data.token);
            localStorage.setItem('token',userData.data.token)
            localStorage.setItem('role',userData.data.role)
            navigate('/profile')
         }else{
            setError(userData.message)
         }

    }catch(error){
        console.log(error);
        setError(error.message);
        setTimeout(() => {
            setError('');
        }, 5000)
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim())
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim())
  }

  return (
    <div className={styles.container}>
        <h1>Login</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.LoginForm}>
            <form onSubmit={handleSubmit}>
                <div >
                    <div className={styles.username}>
                        <input type="text" onChange={handleEmailChange} placeholder="Your Email" />
                    </div>
                    <div className={styles.password}>
                        <input type="password" onChange={handlePasswordChange} placeholder="Your Password" />
                    </div>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage;
