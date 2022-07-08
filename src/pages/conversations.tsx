import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import type { User } from '../types/user'
import axios from "axios";


export default function Conversations() {

    const [data, setData] = useState(null);
    const [conv, setConv] = useState(null);
    const [sender, setSender] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const userId = getLoggedUserId()
    const [user, setUser] = useState(null);


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3005/conversations/${userId}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                console.log(`data ${data}`)
            });

    }, []);

    const getConv = (id, senderId) => {
        fetch(`http://localhost:3005/messages/${id}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setConv(data);
                setLoading(false);
                console.log(conv)
            });
        fetch(`http://localhost:3005/users/${senderId}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setSender(data);
                setLoading(false);
                console.log(sender)
            });
        fetch(`http://localhost:3005/user/${userId}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
                console.log(`user ${user}`)
            });


    }



    const writeMessage = (message, id) => {
        fetch(`http://localhost:3005/messages/${id}`, {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                body: "NOUVEAY mEGSG",
                userId: 2
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => console.log(json));
    }

    const createConv = (id) => {
        fetch(`http://localhost:3005/conversations/${userId}`, {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                recipientId: 3
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => console.log(json));
    }



    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No about data</p>;

    return (
        <div>
            <Header />
            <div className={styles.conversations}>
                <div className={styles.sidebar}>
                    <div className={styles.create_conversation} onClick={() => createConv(3)}>Commencer une conversation</div>


                    {/* {data.map((d) => (
                    <Link key={d.id} href={`/conversations/${d.id}`}>
                        <div className={styles.conversation} >{d.senderNickname} </div>
                    </Link>))} */}

                    {data.map((d) => (
                        <div key={d.id} onClick={() => getConv(d.id, d.senderId)} >
                            <div className={conv != null ? (conv.id != d.id ? styles.conversation : '') : styles.conversation} >
                                {d.senderNickname}
                            </div>

                        </div>))}


                </div>

                <div className={styles.conversation_full}>
                    <div className={styles.conversation_info}>
                        <h3>{sender !== null ? sender.nickname : ''}</h3>
                    </div>


                    {conv && sender !== null ? conv.map((d) => (
                        <div key={d.id}  >

                            <h3>{d.senderNickname}</h3>
                            <div className={d.authorId == 2 ? styles.sent : styles.received} key={d.id}>{d.body}</div>

                        </div>)) : ' '}

                    <div onClick={() => writeMessage('heelo', 1)}>send message</div>


                </div>


            </div>
        </div>
    );
}