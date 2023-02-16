import { async } from "@firebase/util";
import { createContext, useEffect, useMemo, useState } from "react";
import io from 'socket.io-client';
import useAuth from "../hooks/useAuth"

const SERVER_URL = "http://localhost:3500/"
const socket = io(SERVER_URL);

const BID_ID = 1;
const NUMBER_OF_BIDS_STORED = 5;

const SocketContext = createContext({});
export const SocketProvider = ({children}) => {

    const [bids, setBids] = useState([])

    const {getAccessToken} = useAuth();

    const submitBid = async(bid) => {
        const token = await getAccessToken();
        
        socket.emit("bid",{bid,token, userBidId: BID_ID}, (response) => console.log(response))
    }

    useEffect(() => {
        socket.on("newBid", (bid) => {
            setBids(oldVal => [bid, ...oldVal].splice(0, NUMBER_OF_BIDS_STORED))
        })
    },[])

    const memoedValue = useMemo(() => ({
        bids,
        submitBid,
    }),[bids])


    return(
        <SocketContext.Provider value={memoedValue}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;