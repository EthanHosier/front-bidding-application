import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DISPLAY_NAME = "Ethan Hosier"

const Profile = () => {

    const {signInWithGoogle} = useAuth();

    return (
        <div>
            <div className="lg:right-10 flex items-center flex-1 justify-between mx-8 lg:mx-10 mt-5">
                <p className='font-semibold text-xl md:text-3xl lg:text-4xl'>Profile</p>

                <div className='flex items-center'>
                    <div className="align-center bg-white rounded-lg flex items-center p-2 px-4 p-2 mr-3">
                        <i className="fa-solid fa-dollar-sign text-sky-400 mr-1 text-md md:text-xl"></i>
                        <p className="font-semibold text-md md:text-xl lg:text-2xl">1.04</p>

                        <button className="rounded  bg-sky-400 items-center justify-center flex ml-2 ">
                            <i className="text-white p-1 fa-solid fa-plus text-xs md:text-md lg:text-lg "></i>
                        </button>
                    </div>

                    <Link className="aspect-square rounded-full bg-sky-400 w-12 md:w-14 lg:w-20 lg:ml-4 flex items-center justify-center" to={"/"}><i className="fa-solid fa-house text-white text-xl md:text-2xl lg:text-3xl"></i></Link>
                </div>
            </div>

            <p className='mx-8 lg:mx-10 text-sk text-sm md:text-base'>Display Name: {DISPLAY_NAME}</p>
            <p className='mx-8 lg:mx-10 text-sk mt-4 text-sm md:text-base'>Image preview: </p>

            <div className='flex-1 items-center justify-center flex mt-4 relative flex-col'>
                <div className="bg-white border-lg rounded shadow items-center justify-center flex" id="picture">
                    <text>No image selected</text>
                </div>
                <button
                    className={` mt-3 rounded-full py-1 px-3 text-white font-semibold mr-5 lg:text-2xl lg:px-3 lg:py-2 bg-sky-400`}
                    disabled={false}
                >Select Image</button>
            </div>
        </div>
    )
}

export default Profile