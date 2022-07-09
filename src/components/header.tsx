import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from '../types/user'
import Image from 'next/image'
import Logo from '../assets/logo.png'
import heart from '../assets/heart.png'
import search from '../assets/search.svg'
import styles from '../styles/Home.module.css'
import add from '../assets/add.svg'
import msg from '../assets/msg.png'
import user from '../assets/user.png'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { useRouter } from 'next/router'




export default function Header() {

    const router = useRouter()




    return (
        <div className={styles.header}>
            <div className={styles.header_content}>
                <div className={styles.header_left}>
                    <Link href="/">
                        <Image src={Logo} alt="Leboncoin Frontend Team" width={150} height={35} layout="fixed" />
                    </Link>

                    <div className={styles.header_add}>
                        <Image src={add} alt="Leboncoin Frontend Team" width={23} height={25} layout="fixed" />

                        Déposer une annonce
                    </div>
                    <div className={styles.header_search} >
                        <Image src={search} alt="Leboncoin Frontend Team" width={25} height={25} layout="fixed" />
                        Rechercher
                    </div>
                </div>
                <div className={styles.header_right}>
                    <div className={styles.header_favoris} >
                        <Image src={heart} alt="Leboncoin Frontend Team" width={32} height={32} layout="fixed" />

                        <p>Favoris</p>
                    </div>
                    <Link href="/conversations">
                        <div className={styles.header_msg} >
                            <Image src={msg} alt="Leboncoin Frontend Team" width={35} height={32} layout="fixed" />
                            <p>Messages</p>
                            {router.pathname === "/conversations" ? <div className={styles.header_msg_active} ></div> : ''}
                            {console.log(router)}
                        </div>
                    </Link>
                    <div className={styles.header_user} >
                        <Image src={user} alt="Leboncoin Frontend Team" width={32} height={32} layout="fixed" />

                        <p>Mon compte
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}