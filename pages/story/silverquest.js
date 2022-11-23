import styles from '../../styles/Home.module.css'
import Player from '../../components/Player';

export default function Story(){
  return (
    <>
      <div className={styles.App}>
        <Player id="silverquest"/>
      </div>
    </>
  );
}