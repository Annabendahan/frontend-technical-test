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
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [value, setValue] = useState('');
    const [newMessages, setNewMessages] = useState([]);
    const [senderId, setSenderId] = useState(null);
    const [sender, setSender] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [convId, setConvId] = useState(null);
    const [convSenderName, setConvSenderName] = useState(null);
    const [convRecipientName, setConvRecipientName] = useState(null);

    const [newConvs, setNewConvs] = useState([])
    const [popup, setPopup] = useState(false)
    const [recipientId, setRecipientId] = useState(null)
    const [recipientNickname, setRecipientNickname] = useState(null)



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
                setConvSenderName(data[0].senderNickname);
                setConvRecipientName(data[0].recipientNickname);
                getMessages(data[0].id, data[0].senderId, data[0].senderNickname, data[0].recipientNickname);
                getSender(data[0].senderId)
                setLoading(false);
                console.log(data[0].senderId)
                console.log(sender)
            });
        fetch(`http://localhost:3005/users`, {
            method: 'GET',
            headers: {
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
        fetch(`http://localhost:3005/users/${userId}`, {
            method: 'GET',
            headers: {
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                console.log(data)
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



    const getMessages = (id, senderId, senderNickname, recipientNickname) => {
        setConvId(id);
        setSenderId(senderId);
        getSender(senderId);
        setConvSenderName(senderNickname)
        setConvRecipientName(recipientNickname);

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



    const writeMessage = (event, value, id) => {
        event.preventDefault();
        fetch(`http://localhost:3005/messages/${id}`, {
            method: "POST",
            body: JSON.stringify({
                body: value,
                userId: userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json));
        const newMessage = { body: value, userId: userId, conversationId: convId }
        setNewMessages(newMessages => [...newMessages, newMessage])
        setValue('')
    }

    const createConv = (recipientId, recipientNickname) => {
        fetch(`http://localhost:3005/conversations/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                recipientId: recipientId,
                lastMessageTimestamp: new Date().getTime(),
                recipientNickname: recipientNickname
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json));
        const newConv = {
            recipientId: recipientId, lastMessageTimestamp: new Date().getTime(), recipientNickname: recipientNickname
        }
        setNewConvs(newConvs => [...newConvs, newConv])


        setPopup(false)
    }


    const getDate = (timestamp) => {
        let date = new Date(timestamp);
        return " " + date.getHours() +
            ":" + date.getMinutes()

    }

    const setRecipientInfos = (recipientId, recipientNickname) => {
        setRecipientId(recipientId);
        setRecipientNickname(recipientNickname);

    }


    const getUsers = () => {
        fetch(`http://localhost:3005/users`, {
            method: 'GET',
            headers: {
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });

    }


    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No about data</p>;

    return (
        <div>
            <Header />



            {popup ?
                <div className={styles.popup_container}>
                    <div className={styles.popup_backdrop} onClick={() => setPopup(false)}></div>
                    <div className={styles.popup} ><p>Avec qui souhaitez-vous converser ?</p>
                        {users !== null ? users.map((d) => (
                            <div onClick={() => setRecipientInfos(d.id, d.nickname)} key={d.id}>
                                <p className={recipientId === d.id ? styles.user_chosen : ''} >{d.nickname} </p></div>)) : ''}
                        <p className={styles.validate} onClick={() => createConv(recipientId, recipientNickname)}>Valider</p>
                    </div>

                </div> : ''}


            <div className={styles.conversations}>

                <div className={styles.sidebar}>
                    <div className={styles.create_conversation} onClick={() => setPopup(true)} >+ Commencer une conversation</div>
                    {newConvs.map((d) => (
                        <div key={d.id} onClick={() => getMessages(d.id, d.senderId, d.senderNickname, d.recipientNickname)}  >
                            <div className={messages != null ? (convId !== d.id ? styles.conversation : styles.conversation_active) : styles.conversation}>
                                {d.id} {d.recipientNickname}
                                <p className={styles.date}>{getDate(d.lastMessageTimestamp)}</p>
                            </div>

                        </div>))}
                    {data.map((d) => (
                        <div key={d.id} onClick={() => getMessages(d.id, d.senderId, d.senderNickname, d.recipientNickname)} >
                            <div className={messages != null ? (convId !== d.id ? styles.conversation : styles.conversation_active) : styles.conversation} >
                                {d.senderId === userId ? d.recipientNickname : d.senderNickname}
                                <p className={styles.date}>{getDate(d.lastMessageTimestamp)}</p>
                            </div>
                        </div>))}
                </div>

                <div className={styles.conversation_full}>
                    <div className={styles.conversation_info}>
                        <h3> {userId === senderId ? convRecipientName : convSenderName}  </h3>
                    </div>
                    <div className={styles.conversation_messages}>
                        {messages && sender !== null ? messages.map((m) => (
                            <div key={m.id}  >
                                <h3>{m.senderNickname}</h3>
                                <div className={m.authorId == 2 ? styles.sent : styles.received} key={m.id}>{m.body}</div>

                            </div>)) : ' '}

                        {newMessages.filter(d => d.conversationId === convId).map((d) => (
                            <div key={d.id}  >
                                <div className={styles.sent}>
                                    {d.body}</div>

                            </div>))}
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