import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import  Form  from '../form'

import styles from './todolist.module.scss';

import { useEffect } from 'react';

type ToDoList = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type UserId = {
  userId: number;
}

type ToDoListProps = {
  toDoLists: ToDoList [];
  userId : UserId;
}

export default function ToDoList({ toDoLists,userId }: ToDoListProps) {

  useEffect(() =>{
    localStorage.setItem('userId', userId.toString());
  }) 

  return (
    <div className={styles.toDoListPage}>
      <h2>To Do List</h2>
    <Form />
      <ul>
        {toDoLists.map(toDoList => {
          return (
            <li key={toDoList.id}>
                <div className={styles.listDetails} id="1">
                  {toDoList.completed == true ? (
                    <input type="checkbox" defaultChecked />
                  ):(
                    <input type="checkbox" />
                  )}
                  <p>{toDoList.title}</p>
                  <span>{toDoList.completed}</span>
                </div>
            </li>
          )
      })}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
 return {
   paths: [],
   fallback: 'blocking'
 }
}

export const  getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/users/${slug[1]}/todos`);

  const userId = slug[1];

  if (typeof window !== "undefined") {
    const setId = localStorage.setItem('userId', slug[1]);
    console.log(setId)
  }

  const toDoLists = data.map(toDoList => {
    return {
    userId: toDoList.userId,
    id: toDoList.id,
    title: toDoList.title,
    completed: toDoList.completed,
    }
  });

  return  {
    props: {
      toDoLists,
      userId,
    },
  }
}

