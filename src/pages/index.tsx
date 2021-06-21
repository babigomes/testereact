import React from "react";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import Link from 'next/link';

import Image from 'next/image'
import userIcon from '../../public/user.png'

import styles from './home.module.scss';

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
}

type HomeProps = {
  users: Users[];
}

export default function Home({ users }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <h2>Usuários</h2>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Image src={userIcon} alt="User icon" />

              <div className={styles.userDetails}>
                <Link href={`/toDoList/users/${user.id}/todos`}>
                  <a>{user.name}</a>
                </Link>
                <p>{user.username}</p>
                <span>{user.email}</span>
                
                <Link href={`/toDoList/users/${user.id}/todos`} passHref>
                  <button type="button">To Do List</button>
                </Link> 
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('users')

  const users = data.map(user =>{
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }
  })

  return {
    props: {
      users: users,
    },
    revalidate: 60 * 60 * 8,
  }
}
