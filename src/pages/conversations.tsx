import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { getDate } from '../utils/getDate'
import type { User } from '../types/user'
import getConversationsByUserId from "../controller/Conversation/get";
import getMessagesByConversationId from "../controller/Message/get"
import postMessage from '../controller/Message/post'
import postConversation from '../controller/Conversation/post'
import getUserById from "../controller/User/get";


export default function Conversations() {

    const userId = getLoggedUserId()
    const [isLoading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [senderId, setSenderId] = useState(null);
    const [sender, setSender] = useState({});
    const [convId, setConvId] = useState(null);
    const [convSenderName, setConvSenderName] = useState('');
    const [convRecipientName, setConvRecipientName] = useState('');
    const [popup, setPopup] = useState(false)
    const [recipientId, setRecipientId] = useState(null)
    const [recipientNickname, setRecipientNickname] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    {/* au mount, récupération de toutes les conversations de l'utilisateur*/ }
    useEffect(() => {
        setLoading(true);
        getConversationsByUserId(userId)
            .then((data) => {
                if (data.error === undefined) {
                    console.log(data)
                    setConversations(data);
                    setConvId(data[0].id);
                    setConvSenderName(data[0].senderNickname);
                    setConvRecipientName(data[0].recipientNickname);
                    getMessages(data[0].id, data[0].senderId, data[0].senderNickname, data[0].recipientNickname);
                    getSender(data[0].senderId)
                    setLoading(false);

                } else {
                    setIsError(true)
                    setErrorMessage(data.error)
                }
            })
        getAllUsers();
    }, []);


    {/* récupérer les infos de l'utilisateur qui a envoyé le message*/ }
    const getSender = (senderId) => {
        getUserById(senderId)
            .then((data) => {
                setSender(data);
                setLoading(false);
            });
    }

    {/* récupérer tous les utilisateurs*/ }
    const getAllUsers = () => {
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

    {/* récupérer tous les messages de la conversation sélectionnée */ }
    const getMessages = (conversationId, senderId, senderNickname, recipientNickname) => {
        setConvId(conversationId);
        setSenderId(senderId);
        getSender(senderId);
        setConvSenderName(senderNickname)
        setConvRecipientName(recipientNickname);
        getMessagesByConversationId(conversationId)
            .then((data) => {
                if (data.error === undefined) {
                    setMessages(data);
                    setLoading(false);
                    updateScroll();
                }
                else {
                    setIsError(true)
                    setErrorMessage(data.error)
                }
            });
    }

    {/* écrire un message */ }
    const writeMessage = (event, body) => {
        console.log(recipientNickname)
        event.preventDefault();
        if (body !== "") {
            const message = {
                conversationId: convId,
                authorId: userId,
                timestamp: 0,
                body: body
            }
            postMessage(convId, message);
            getMessages(convId, senderId, convSenderName, recipientNickname);
            getMessages(convId, senderId, convSenderName, recipientNickname);
            setValue('')
            updateScroll()
        }
    }


    {/* créer une nouvelle conversation */ }
    const createConv = (recipientId, recipientNickname) => {
        getSender(senderId)
        const conversation = {
            recipientId: recipientId,
            recipientNickname: recipientNickname,
            senderId: userId,
            senderNickname: sender[0].nickname,
            lastMessageTimestamp: new Date().getTime()
        }
        postConversation(userId, conversation);
        getConversationsByUserId(userId)
            .then((data) => {
                setConversations(data);
                setConvId(data[0].id);
                setConvSenderName(data[0].senderNickname);
                setConvRecipientName(data[0].recipientNickname);
                getMessages(data[0].id, data[0].senderId, data[0].senderNickname, data[0].recipientNickname);
                getSender(data[0].senderId)
                setLoading(false);
            })
        setPopup(false)
    }

    {/* récupérer les informations du destinataire */ }
    const setRecipientInfos = (recipientId, recipientNickname) => {
        setRecipientId(recipientId);
        setRecipientNickname(recipientNickname);
    }


    const updateScroll = () => {
        const element = document.querySelector(".Home_vu__Cp2sB");
        element !== null ? element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }) : ''
    }

    if (isLoading) return <p>Loading...</p>;
    if (!conversations) return <p>No about data</p>;

    return (
        <div>
            <Header />

            {isError ?

                <div className={styles.popup_container}>
                    <div className={styles.popup_backdrop} onClick={() => setPopup(false)}></div>
                    <div className={styles.popup} ><h3>OUPS ! </h3> Nous sommes désolés, le serveur a crashé ...
                    </div>
                </div>

                :

                <div>
                    {/* popup */}
                    {popup ?
                        <div className={styles.popup_container}>
                            <div className={styles.popup_backdrop} onClick={() => setPopup(false)}></div>
                            <div className={styles.popup} ><h4>Avec qui souhaitez-vous converser ?</h4>
                                {users !== null ? users.filter((d => d.id !== userId)).map((d) => (
                                    <div onClick={() => setRecipientInfos(d.id, d.nickname)} key={d.id}>
                                        <p className={recipientId === d.id ? styles.user_chosen : ''} >{d.nickname} </p></div>)) : ''}
                                <div className={styles.validate} onClick={() => createConv(recipientId, recipientNickname)}>Valider</div>
                            </div>

                        </div> : ''}

                    {/* sidebar avec conversations */}
                    <div className={styles.conversations}>
                        <div className={styles.sidebar} >
                            <div className={styles.create_conversation} onClick={() => setPopup(true)} >+ Nouvelle conversation</div>
                            {conversations.map((c) => (
                                <div key={c.id} onClick={() => getMessages(c.id, c.senderId, c.senderNickname, c.recipientNickname)} >
                                    <div className={messages != null ? (convId !== c.id ? styles.conversation : styles.conversation_active) : styles.conversation} >
                                        {c.senderId === userId ? c.recipientNickname : c.senderNickname}
                                        <p className={styles.date}>{getDate(c.lastMessageTimestamp)}</p>
                                    </div>
                                </div>))}
                        </div>

                        {/* messages de la conversation sélectionnée*/}
                        <div className={styles.conversation_full}>
                            <div className={styles.conversation_info}>
                                <h3> {userId === senderId ? convRecipientName : convSenderName} </h3>
                            </div>
                            <div className={styles.conversation_messages}>
                                {messages && sender !== null ? messages.map((m) => (
                                    <div className={m.authorId == userId ? styles.sent : styles.received} key={m.id}>{m.body}</div>
                                )) : ' '}
                                <p className={styles.vu}></p>
                            </div>

                            {/* écrire un message */}
                            <div className={styles.conversation_box}>
                                <div className={styles.message_box} >
                                    <form onSubmit={(event) => writeMessage(event, value)}>
                                        <input className={styles.message_value} value={value} placeholder='Entrez votre message' onChange={e => setValue(e.target.value)} />
                                    </form>
                                </div>
                                <div onClick={(event) => writeMessage(event, value)} className={value === "" ? styles.message_desactivated : styles.message_send} >Envoyer</div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div >
    );
}