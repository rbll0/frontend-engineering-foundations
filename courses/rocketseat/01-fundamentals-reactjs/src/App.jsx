import { Header } from './components/Header'
import { Post } from './Post';
import styles from './App.module.css';

import "./global.css"

export default function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <aside>
          sidebar
        </aside>
        <main>
          <Post
            author="Gustavo Rabelo"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Amet voluptate velit dicta, hic ex autem quam sapiente accusantium. 
            Illo culpa dolore incidunt dicta maiores pariatur minima quod esse 
            tenetur a?"
          />

          <Post
            author="Esther Rabelo"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Amet voluptate velit dicta, hic ex autem quam sapiente accusantium. 
            Illo culpa dolore incidunt dicta maiores pariatur minima quod esse
            tenetur a?"
          />

        </main>
      </div>
    </div>
  )
}
