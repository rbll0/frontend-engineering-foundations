import { Header } from './components/Header'
import { Post } from './Post'

import "./global.css"

export default function App() {
  return (
    <div>
      <Header />
      <Post
        author="Gustavo Rabelo Frere"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat exercitationem perspiciatis quo dolorem necessitatibus numquam ipsam ratione libero reiciendis quibusdam in molestiae iusto excepturi rem aliquam, fuga consequuntur quasi quaerat." />

      <Post
        author="Esther Rabelo"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat exercitationem perspiciatis quo dolorem necessitatibus numquam ipsam ratione libero reiciendis quibusdam in molestiae iusto excepturi rem aliquam, fuga consequuntur quasi quaerat." />
    </div>
  )
}
