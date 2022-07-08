import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from '../assets/logo.png'
import search from '../assets/search.svg'
import styles from '../styles/Home.module.css'
import add from '../assets/add.svg'
import msg from '../assets/msg.svg'





export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <Image src={Logo} alt="Leboncoin Frontend Team" width={130} height={30} layout="fixed" />

                <div className={styles.header_add}>
                    <Image src={add} alt="Leboncoin Frontend Team" width={20} height={25} layout="fixed" />

                    Déposer une annonce
                </div>
                <div className={styles.header_search} >
                    <Image src={search} alt="Leboncoin Frontend Team" width={20} height={25} layout="fixed" />
                    Rechercher
                </div>
            </div>
            <div className={styles.header_right}>
                <div >
                    Mes recherches
                </div>
                <div className={styles.header_msg} >
                    <Image src={msg} alt="Leboncoin Frontend Team" width={50} height={25} layout="fixed" />
                    <Link href="/conversations"> Messages</Link>
                </div>
            </div>

        </div>
    );
}