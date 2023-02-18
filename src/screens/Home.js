import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useSocket from "../hooks/useSocket"
import Countdown from 'react-countdown';

const LIMIT = 1.04
const DEFAULT_BID = 0.01;


const Home = () => {

    const [enteredBid, setEnteredBid] = useState(DEFAULT_BID);
    const { user, signInWithGoogle } = useAuth();
    const {
        submitBid,
        bids,
        nextBidWins,
        ownerName,
        winningPrice,
        auctionEndTime,
        imgUrl,
    } = useSocket();

    useEffect(() => {
        console.log(auctionEndTime)
    },[auctionEndTime])

    const onClickSignIn = async () => {
        await signInWithGoogle();
    }

    const onSubmitBid = async () => {
        await submitBid(enteredBid)
    }


    //BAD (make so explicitly called, not just happens when value changes):

    useEffect(() => {
        if (bids.length === 0) {
            setEnteredBid(DEFAULT_BID);
            return;
        }

        const highestBid = bids.bid;
        highestBid > enteredBid && setEnteredBid(highestBid);
    }, [bids])

    return (

        <>
            <div className="lg:right-10 flex items-center flex-1 justify-between mx-8 lg:mx-10 mt-5">

                <p className='font-semibold'><span className='text-sky-400'>{ownerName}</span> chose this image for <span className='text-sky-400'>${winningPrice}</span>:</p>

                <div className='flex items-center'>
                    <div className="align-center bg-white rounded-lg flex items-center p-2 px-4 p-2 mr-3">
                        <i className="fa-solid fa-dollar-sign text-sky-400 mr-1 text-md md:text-xl"></i>
                        <p className="font-semibold text-md md:text-xl lg:text-2xl">{1.04}</p>

                        <button className="rounded  bg-sky-400 items-center justify-center flex ml-2 ">
                            <i className="text-white p-1 fa-solid fa-plus text-xs md:text-md lg:text-lg "></i>
                        </button>
                    </div>

                    <Link className="aspect-square rounded-full bg-sky-400 w-12 md:w-14 lg:w-20 lg:ml-4 flex items-center justify-center" to={"Profile"}><i className="fa-solid fa-user text-white text-xl md:text-2xl lg:text-3xl"></i></Link>
                </div>
            </div>

            <div className=" w-screen items-center justify-center flex mt-8">
                <div className="grid grid-flow-row lg:grid-flow-col auto-rows-max">

                    {/*
                    <div className="flex-1 bg-green-200 lg:w-full order-2" ><text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text></div>
                    */}

                    <div className='flex-1 items-center justify-center flex flex-col'>

                        <div className='h-14'>
                            {nextBidWins ?
                             <p className='uppercase text-green-500 mt-2 sm:text-xl lg:text-3xl font-bold'>Next Bid Wins!</p>
                            :
                            auctionEndTime - (new Date).getTime() > 0 && 
                                <Countdown
                                date={auctionEndTime}
                                key={auctionEndTime}
                                intervalDelay={0}
                                precision={0}
                                renderer={props => <div className='text-2xl text-sky-400'>{props.total / 1000}</div>}
                                onStart={() => console.log("START")}
                                />  
                            }
                        </div>

                        <div className=" flex flex-col bg-red-200 order-1">

                            <div className="bg-white border-lg rounded shadow items-center justify-center flex" id="picture">
                                <img src={imgUrl}/>
                            </div>


                        </div>
                    </div>

                    <div className="flex-1 items-center justify-center flex p-3 order-3 flex-col lg:ml-10 ">

                        {user ?
                            <div className='flex flex-row mt-3 items-center'>
                                <button
                                    className={` rounded-full w-20 text-white font-semibold mr-5 lg:text-2xl lg:px-3 lg:py-2 ${enteredBid > LIMIT ? "bg-red-600" : "bg-sky-400"}`}
                                    disabled={enteredBid > LIMIT}
                                    onClick={onSubmitBid}
                                >Bid</button>
                                <CurrencyInput
                                    id="input-example"
                                    name="input-name"
                                    placeholder="Please enter a number"
                                    decimalsLimit={2}
                                    defaultValue={DEFAULT_BID}
                                    value={enteredBid}
                                    onValueChange={(val) => setEnteredBid(val)}
                                    className="w-20 rounded-lg text-center lg:text-2xl lg:py-2"
                                    style={{ color: enteredBid > LIMIT && "red" }}
                                    allowNegativeValue={false}
                                    prefix="$"
                                />
                            </div>
                            :
                            <p className='text-lg'>Please <span className="text-sky-400 font-semibold cursor-pointer" onClick={onClickSignIn}>Sign in</span> to submit bids.</p>
                        }
                        <div className='flex-col mt-10 items-center'>
                            {bids.length > 0 ?
                                bids.map((d, i) => {
                                    return <p className={`text-center ${i === 0 ? "text-green-600 font-semibold" : "text-red-600"}`} key={i}>{d.name}: ${d.bid}</p>
                                })
                                :
                                <p>No bids yet</p>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}

export default Home