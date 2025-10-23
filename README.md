🚀 Jogo Espacial
Um jogo 2D de nave espacial feito com HTML5, CSS3 e JavaScript .
Seu objetivo é destruir o maior número possível de inimigos antes que sua nave seja destruída.
O jogo possui sistema de pontuação, placar, música de fundo, sons e pausa interativa.

---

🪐 Funcionalidades
🎮 Movimentação fluida do jogador (setas esquerda/direita)
🔫 Disparo com clique do mouse
👾 Inimigos de diferentes níveis (fraco, médio e forte)
💥 Efeitos sonoros para tiros, explosões e game over
🎵 Trilha sonora de fundo
💾 Sistema de pontuação com integração a API (scoreboard)
⏸️ Menu de pausa e opção de retorno ao menu principal
🧑‍🚀 Identificação do jogador por apelido
🏆 Ranking (top 5 pontuações) carregado dinamicamente
🧩 Estrutura do Projeto
SpaceGame/ ├── index.html # Estrutura principal da página ├── style.css # Estilos do jogo e do menu ├── script.js # Lógica e mecânica do jogo ├── images/ # Imagens das naves e fundos │ ├── Fundo_Menu.jpg │ ├── Fundo_Espacial.png │ ├── NavePrincipal.png │ ├── NaveInimiga1.png │ ├── NaveInimiga2.png │ ├── NaveInimiga3.png │ └── Logotipo.png └── áudio/ # Trilhas e efeitos sonoros ├── background.mp3 ├── shot.mp3 ├── explosão.mp3 ├── gameover-music.mp3 └── gameover-voice.mp3

---

🕹️ Como Jogar
Digite seu apelido e clique em Jogar .
Use como setas ← e → para mover a nave.
Clique com o mouse para atirar.
Pressione "P" para pausar o jogo.
Derrote os inimigos e aumente sua pontuação !
Quando sua nave for destruída, o jogo exibirá a tela de Game Over
e salvará sua pontuação automaticamente no placar (via API local).

---

💾 API do Scoreboard
O jogo envia e busca encontrada de uma API local:
http://localhost:3000/api/scores/

Estrutura esperada no backend:
Método POST → Salvar uma pontuação:
{
  "datascore": "2025-10-22T15:00:00Z",
  "nickname": "Jogador1",
  "score": 42,
  "game": "Space Game"
}
Método GET → Retorna uma lista de conquistas:

json [ { "apelido": "Jogador1", "pontuação": 42 }, { "apelido": "Jogador2", "pontuação": 35 } ]

💡 Caso não tenha uma API, você pode desativar as chamadas fetch() em script.js para jogar offline.

⚙️ Tecnologias Usadas HTML5 → renderização do jogo

CSS3 → interface e layout do menu

JavaScript → lógica, eventos e colisões

Buscar API → comunicação com o backend

Áudio HTML5 → efeitos sonoros e música

🔊 Controles Ação Tecla / Botão Mover para a esquerda ⬅️ seta esquerda Mover para a direita ➡️ seta direita Atirar 🖱️ clique do botão direito do mouse Pausar / Continuar 🔤 tecla "P" Voltar ao menu botão “Sair para o menu”

🧠 Lógica do Jogo O jogador se move horizontalmente e dispara projetos.

Os inimigos apareceram de forma solicitada e atiram de tempos em tempos.

Cada inimigo possui vida, dano e chance de disparo diferentes.

A divisão entre tiros e inimigos ou inimigos e jogador reduz a vida.

Ao zerar a vida do jogador → Game Over.

A pontuação é incrementada conforme inimigos destruídos.

🧑‍💻 Autor Desenvolvido por [Renan Tertuliano Straquicini] 💬 Projeto feito para estudos de desenvolvimento web. 📧 Contato: [ a14642@oficina.pt ]

🏁 Licença Este projeto está sob licença MIT — sinta-se à vontade para usar e modificar. Créditos de imagens e áudios pertencentes aos seus respectivos autores.
