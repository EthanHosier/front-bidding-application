import { async } from "@firebase/util";
import { createContext, useEffect, useMemo, useState } from "react";
import io from 'socket.io-client';
import useAuth from "../hooks/useAuth"

const SERVER_URL = "http://localhost:3500/"
const socket = io(SERVER_URL);

const NUMBER_OF_BIDS_STORED = 5;

const SocketContext = createContext({});
export const SocketProvider = ({ children }) => {

    const [bids, setBids] = useState([])
    const [nextBidWins, setNextBidWins] = useState(false);
    const [ownerName, setOwnerName] = useState("")
    const [winningPrice, setWinningPrice] = useState(0)
    const [bidId, setBidId] = useState(-1);
    const [auctionEndTime, setAuctionEndTime] = useState(0);
    const [imgUrl, setImgUrl] = useState("")

    

    const { getAccessToken } = useAuth();

    const submitBid = async (bid) => {
        const token = await getAccessToken();

        socket.emit("bid", { bid, token, userBidId: bidId }, (response) => console.log(response))
    }

    const onNBW = () => {
        setNextBidWins(true)
        console.log("NBW")
    }

    useEffect(() => {
        socket.on("welcome", ({ nextBidWins, ownerName, bidId, winningPrice, nextBids, url, auctionEndTime }) => {
            setNextBidWins(nextBidWins);
            setOwnerName(ownerName);
            setBidId(bidId);
            setWinningPrice(winningPrice);
            setBids(nextBids)
            setImgUrl(url)
            setAuctionEndTime(auctionEndTime)
        })

        socket.on("newBid", (bid) => {
            setBids(oldVal => [bid, ...oldVal].splice(0, NUMBER_OF_BIDS_STORED))
        })

        socket.on("NBW", onNBW)

        socket.on("Next Auction", ({ winningName, winningBid, auctionEndTime, bidId, url }) => {
            setOwnerName(winningName);
            setWinningPrice(winningBid);
            setAuctionEndTime(auctionEndTime)
            setBidId(bidId)
            setBids([])
            setNextBidWins(false);
            setImgUrl(url)
        })
    }, [])

    const memoedValue = useMemo(() => ({
        bids,
        nextBidWins,
        ownerName,
        winningPrice,
        bidId,
        auctionEndTime,
        imgUrl,
        submitBid,
    }), [bids, ownerName, winningPrice, nextBidWins, auctionEndTime, imgUrl])


    return (
        <SocketContext.Provider value={memoedValue}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;