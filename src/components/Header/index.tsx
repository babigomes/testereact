import styles from './styles.module.scss';

import Image from 'next/image'
import logo from '../../../public/logo.png'

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export default function Header() {
  const currentDate = format(new Date(), 'EEEE, d, MMMM', {
    locale:ptBR,
  });
  
  return (
    <header className={styles.headerContainer}>
      <Image src={logo} alt="Logo React" />
    
      <p>Teste Dev React</p>

      <span>{currentDate}</span>
    </header>
  )
}