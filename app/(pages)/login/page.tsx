'use client';
import Header from "@/app/components/header";
import { useLogin } from "@/app/context/loginContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { login, logout, isLoggedIn } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      console.log('push')
      router.push('/add-card');
    }
  }, [isLoggedIn])

  return (
    <>
      <Header />
      <h2 style={{ color: 'blue', textAlign: 'center', marginTop: '7vw' }}>Welcome Fantasy Home</h2>

      <div style={{ maxWidth: '100%', height: '400px' }}>


        <div className="container">
          <label htmlFor="uname"><b>Username</b></label>
          <input id="Username" type="text" placeholder="Enter Username" name="uname" required value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="psw"><b>Password</b></label>
          <input id="Password" type="password" placeholder="Enter Password" name="psw" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button id="button" onClick={() => {
            login(username, password);
          }} >Login</button>
        </div>
      </div>

    </>
  )
}

export default Page;