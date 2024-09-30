// src/components/Login.js
import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Login.css';

function Login() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <h1>Sign in to WhatsApp Clone</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;
