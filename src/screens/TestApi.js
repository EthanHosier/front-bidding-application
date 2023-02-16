import React from 'react'
import useAuth from "../hooks/useAuth"

const URL = "http://localhost:3500/"

const TestApi = () => {

    const {getAccessToken} = useAuth();

    const helloWorld = async() => {
        const token = await getAccessToken();
        console.log(token)


        const response = await fetch(URL + "user",{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },

        })

        console.log(response)

    }

  return (
    <div>
        <button onClick={helloWorld}>hello world</button>
    </div>
  )
}

export default TestApi