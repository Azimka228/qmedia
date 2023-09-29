import styles from "./page.module.scss"

import {Container} from "@shared/ui"
import {BeautyQuestionsBlock} from "@widgets/BeautyQuestionsBlock"

const Home = () => (
  <main className={styles.main}>
    <Container>
      <BeautyQuestionsBlock />
    </Container>
  </main>
)

export default Home
