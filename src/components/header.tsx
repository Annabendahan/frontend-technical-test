import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from '../types/user'
import Image from 'next/image'
import Logo from '../assets/logo.png'
import heart from '../assets/heart.svg'
import search from '../assets/search.svg'
import styles from '../styles/Home.module.css'
import add from '../assets/add.svg'
import msg from '../assets/msg.svg'
import user from '../assets/user.svg'
import { getLoggedUserId } from '../utils/getLoggedUserId'




export default function Header() {





    return (
        <div className={styles.header}>
            <div className={styles.header_content}>
                <div className={styles.header_left}>
                    <Image src={Logo} alt="Leboncoin Frontend Team" width={150} height={35} layout="fixed" />

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
                        <Image src={heart} alt="Leboncoin Frontend Team" width={45} height={25} layout="fixed" />

                        <p>Favoris</p>
                    </div>
                    <Link href="/conversations">
                        <div className={styles.header_msg} >
                            <Image src={msg} alt="Leboncoin Frontend Team" width={50} height={25} layout="fixed" />
                            <p>Messages</p>
                        </div>
                    </Link>
                    <div className={styles.header_user} >
                        <Image src={user} alt="Leboncoin Frontend Team" width={45} height={25} layout="fixed" />

                        <p>Mon compte
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}