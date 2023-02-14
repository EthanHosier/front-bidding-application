import React, {useState} from 'react'
import CurrencyInput from 'react-currency-input-field';

const LIMIT = 1.04
const Home = () => {
    
    const [enteredBid, setEnteredBid] = useState(0);

    //TODO: order screen using grid instead of current setup (so can do different sizes easily)
    return (
        <div className="h-screen w-screen items-center justify-center flex flex-col">

            <div className="absolute top-10 right-10 flex items-center">
                <div className="align-center bg-white rounded-lg p-2 px-4 p-3 mr-8 flex items-center">
                    <i className="fa-solid fa-dollar-sign text-sky-400 mr-1 text-2xl"></i>
                    <p className="font-semibold text-2xl">1.04</p>

                    <button className="rounded  bg-sky-400 items-center justify-center flex ml-2">
                        <i className="fa-solid fa-plus text-md text-white p-1 "></i>
                    </button>
                </div>

                <button className="w-20 h-20 rounded-full bg-sky-400"><i className="fa-regular fa-user text-white text-4xl"></i></button>
            </div>

            <div className="w-96 h-96 bg-white border-lg rounded shadow"></div>

            <div className='flex flex-row mt-3 items-center'>
                <button 
                className={` rounded-full w-20 text-white font-semibold mr-5 ${enteredBid > LIMIT ? "bg-red-600" : "bg-sky-400"}`}
                disabled={enteredBid > LIMIT}
                >Bid</button>
                <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Please enter a number"
                    decimalsLimit={2}
                    defaultValue={1.05}
                    onValueChange={(val) => setEnteredBid(val)}
                    className="w-20 rounded-lg text-center"
                    style={{color: enteredBid > LIMIT && "red"}}
                    allowNegativeValue={false}
                    prefix="$"
                />
            </div>


        </div>
    )
}

export default Home