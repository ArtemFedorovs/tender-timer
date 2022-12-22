import styles from './Header.module.css';


function Header({title}: {title: string}) {
  
    return (
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
    
    );
}

export default Header;