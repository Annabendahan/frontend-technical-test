import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import type { User } from '../types/user'
import axios from "axios";


export default function Conversations() {

    const userId = getLoggedUserId()
    const [data, setData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [value, setValue] = useState('');
    const [senderId, setSenderId] = useState(null);
    const [sender, setSender] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [convId, setConvId] = useState(null);

    console.log(value)


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
                setConvId(data[0].id);
                getMessages(data[0].id, data[0].senderId);
                getSender(data[0].senderId)
                setLoading(false);
                console.log(data[0].senderId)
                console.log(sender)
            });
    }, []);




    const getSender = (senderId) => {
        fetch(`http://localhost:3005/user/${senderId}`, {
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
    }



    const getMessages = (id, senderId) => {
        setConvId(id);
        setSenderId(senderId);
        getSender(senderId);
        fetch(`http://localhost:3005/messages/${id}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                setLoading(false);
                console.log(messages)
            });
    }



    const writeMessage = (event, message, id) => {
        event.preventDefault();
        fetch(`http://localhost:3005/messages/${id}`, {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                body: message,
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


    const getDate = (timestamp) => {
        let date = new Date(timestamp);
        return " " + date.getHours() +
            ":" + date.getMinutes()

    }


    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No about data</p>;

    return (
        <div>
            <Header />

            <div className={styles.conversations}>

                <div className={styles.sidebar}>
                    <div className={styles.create_conversation} onClick={() => createConv(3)}>Commencer une conversation</div>
                    {data.map((d) => (
                        <div key={d.id} onClick={() => getMessages(d.id, d.senderId)} >
                            <div className={messages != null ? (convId !== d.id ? styles.conversation : styles.conversation_active) : styles.conversation} >
                                {d.senderNickname}
                                <p className={styles.date}>{getDate(d.lastMessageTimestamp)}</p>
                            </div>
                        </div>))}
                </div>

                <div className={styles.conversation_full}>
                    <div className={styles.conversation_info}>
                        <h3> {sender !== null ? sender[0].nickname : ''}  </h3>
                    </div>
                    <div className={styles.conversation_messages}>
                        {messages && sender !== null ? messages.map((m) => (
                            <div key={m.id}  >
                                <h3>{m.senderNickname}</h3>
                                <div className={m.authorId == 2 ? styles.sent : styles.received} key={m.id}>{m.body}</div>

                            </div>)) : ' '}
                    </div>

                    <div className={styles.conversation_box}>
                        <div className={styles.message_box} >
                            <form onSubmit={(event) => writeMessage(event, value, 1)}>
                                <input className={styles.message_value} value={value} placeholder='Entrez votre message' onChange={e => setValue(e.target.value)} />
                            </form>

                        </div>
                        <div onClick={(event) => writeMessage(event, value, 1)} className={styles.message_send} >Envoyer</div>
                    </div>
                </div>
            </div>
        </div >
    );
}