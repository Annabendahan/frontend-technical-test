import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '../../components/header'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Conversation() {
    const [data, setData] = useState(null);
    const [conv, setConv] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const router = useRouter()
    const { id } = router.query
    const userId = 2




    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3005/messages/${id}`, {
            method: 'GET',
            headers: {
            },

        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                console.log(data)
            });

        // fetch(`http://localhost:3005/conversation/${id}`, {
        //     method: 'GET',
        //     headers: {
        //     },

        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setData(data);
        //         setLoading(false);
        //         console.log(data)
        //     });
    }, []);



    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No about data</p>;

    return (
        <div>
            <Header />
            <div className={styles.conversations}>
                CONV: {id}
                {data.map((d) => (
                    <div className={d.authorId == 2 ? styles.sent : styles.received} key={d.id}>{d.body}</div>
                ))
                }
            </div>
        </div>
    );
}


