import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Cropper from 'react-easy-crop'
import ImagePicker from '../components/ImagePicker';
import { async } from '@firebase/util';

const DISPLAY_NAME = "Ethan Hosier"
const IMAGE = '';

const Profile = () => {

    const { signInWithGoogle, user, logout, getAccessToken } = useAuth();
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(null)

    const uploadImage = async() => {
        const token = await getAccessToken();

        const formData = new FormData();

        //FILE INFO NAME WILL BE "my-image-file"
        formData.append("my-image-file", image);
        
        const response = await fetch("http://localhost:3500/user/saveImage",{
            method:"POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })

        return response?.status
    }

    const onSave = async() => {
        if(!image) return;
        console.log("save")
        setLoading(true)
        const code = await uploadImage();
        //do something depending on code
        //if code == 200 set image as new image, else show error message?
        setLoading(false)
        
    }

    /*
    TODO: use this for image: https://prc5.github.io/react-zoom-pan-pinch/?path=/story/examples-big-image--big-image
    Compress files to 100kb. (+ add error response on server using multer setting max file size)
    */
    return (

        <>
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


            {
                user ? (
                    <div>
                        <p className='mx-8 lg:mx-10 text-sk text-sm md:text-base'>Display Name: {DISPLAY_NAME}</p>
                        <p className='mx-8 lg:mx-10 text-sk mt-4 text-sm md:text-base'>Image preview: </p>

                        { loading? <p>Loading...</p> :
                        <div className='flex-1 items-center justify-center flex mt-4 relative flex-col'>


                            <div className="bg-white border-lg rounded shadow items-center justify-center flex" id="picture">
                                {image ? <img src={URL.createObjectURL(image)} /> : <p>No image selected</p>}
                            </div>

                            {/* 
                            <button
                                className={` mt-3 rounded-full py-1 px-3 text-white font-semibold mr-5 lg:text-2xl lg:px-3 lg:py-2 bg-sky-400`}
                            >Select Image</button>
                            */}

                            <ImagePicker
                                className={` mt-3 rounded-full py-1 px-3 text-white font-semibold mr-5 lg:text-2xl lg:px-3 lg:py-2 bg-sky-400`}
                                text="Select Image"
                                onChange={setImage}
                            />

                            <button 
                            className={` mt-3 rounded-full py-1 px-3 text-white font-semibold mr-5 lg:text-2xl lg:px-3 lg:py-2 bg-sky-400`}
                            onClick={onSave}
                            >Save</button>
                        </div>
                        }
                        <button onClick={logout}>Sign out</button>

                    </div>

                ) : (
                    <div>
                        <button onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                )

            }

        </>


    )
}

export default Profile