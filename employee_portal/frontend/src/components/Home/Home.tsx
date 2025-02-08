import Header from "../Header/Header";
import Table from "../Table/Table";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Table />
    </div>
  );
};

export default Home;
