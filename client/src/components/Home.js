import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <>
     <div>Home</div>
     <button>
     <Link to='/auth/login'>Login</Link>
     </button>
    <button>
    <Link to='/auth/register'>Register</Link>
    </button>
     
    </>
   
  )
}
