import { api } from '../../services/api';

import styles from './form.module.scss';

export default function Form() {
  const addListItem = async event => {
   event.preventDefault()

   const userIdString = localStorage.getItem("userId");
   const toNumber = parseInt(userIdString);

   const response = await api.post(`todos`,
   {
     userId: toNumber,
     title: event.target.title.value,
     completed:false
   });

   if (response.status === 201){
    console.log(response)
    alert("Status: "+response.status+" Item criado com sucesso!! :)")
   } else {
    console.log(response)
    alert ("Status: "+response.status+" Ocorreu um erro tente novamente :(")
   }

 }

  return (
  <div className={styles.addItem}>
    <form onSubmit={addListItem}>
      <label>Adicionar item: </label>
      <input type="text" name="title" />
      <button type="submit">Adicionar</button>
    </form>
  </div>
  )
}