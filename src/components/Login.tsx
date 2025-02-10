import { useState, ChangeEvent, FormEvent } from 'react'
import '../styles/styles.css'


const Login = () => {

    //state
    const [formData, setFormData] = useState({name: '', email:''});

    //header variables
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //event handlers

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value
        }));
      };

    // const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.target.value)
    // }

    // const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value)
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleLogin()
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({...formData})
              });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }
            const data = await response;
            console.log(data, 'login successful');
            return data
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    //Form validation for email. Not my regex -- thanks to emailregex.com, for sharing a 99.99% solution! 
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const disabled = !regex.test(formData.email)

    return (
        <div className='login-group'>
            <h1>Please Log In</h1>
            <form className='form-group' onSubmit={handleSubmit}>
                <div>
                    <input 
                    name="name"
                    className='form-field' 
                    type='text' 
                    placeholder='Your Full Name'
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    />
                    {/* onChange={handleName}  */}
                </div>
                <div className='validation-group'>
                    <input 
                    name='email' 
                    className="form-field" 
                    type='email' 
                    placeholder='Email Address' 
                    value={formData.email || ''}
                    onChange={handleInputChange} 
                    />
                    {disabled && formData.email !== '' && <label className='warning-text' htmlFor='email'>Enter a valid email address</label>}
                </div>
                <button type='submit' className='login-button' disabled={disabled}>Login</button>
            </form>
        </div>
    )
}

export default Login