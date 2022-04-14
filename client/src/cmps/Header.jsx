import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'

import {onLogout} from '../store/user.actions.js'

function _Header ({user, onLogout}) { 
    let navigate = useNavigate();
    
    const logout = async() => {
        await onLogout()
        navigate('/login')
    } 
    
    return(
        <section className='header'>
            <Link className='logo' to='/'>List Songs</Link>
            {!user && <Link to="/login" className='login-signup-btn'>Log In</Link>}
            {user && <div className='user'>
                <div className='user-name'>Hello {user.username}</div>
                <button onClick={logout} className='login-signup-btn'>Log out</button>
            </div>}
        </section>
    )
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogout
}



export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)