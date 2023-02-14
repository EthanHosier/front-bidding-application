import { createContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { async } from '@firebase/util';

const AuthContext = createContext({});
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState("")

  useEffect(
    () => onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        //not logged in
        setUser(null)
      }

      setLoading(false);
    })
  )

  const logout = () => {
    setLoading(true);

    signOut(auth).catch((error) => console.log(error)).finally(setLoading(false))
  }

  const signInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        setAccessToken(token)

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

  }

  const memoedValue = useMemo(() => ({
    user,
    loading,
    signInWithGoogle,
    logout
  }), [user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
