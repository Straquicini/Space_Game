# 🚀 Space Game

Um jogo 2D de nave espacial feito com **HTML5, CSS3 e JavaScript puro**.  
Seu objetivo é destruir o maior número possível de inimigos antes que sua nave seja destruída.  
O jogo possui sistema de pontuação, scoreboard, música de fundo, sons e pausa interativa.

---

## 🪐 Funcionalidades

- 🎮 **Movimentação fluida** do jogador (setas esquerda/direita)
- 🔫 **Disparo com clique do mouse**
- 👾 **Inimigos de diferentes níveis** (fraco, médio e forte)
- 💥 **Efeitos sonoros** para tiros, explosões e game over
- 🎵 **Trilha sonora de fundo**
- 💾 **Sistema de pontuação com integração a API (scoreboard)**
- ⏸️ **Menu de pausa** e opção de retorno ao menu principal
- 🧑‍🚀 **Identificação de jogador por nickname**
- 🏆 **Ranking (top 5 scores)** carregado dinamicamente

---

## 🧩 Estrutura do Projeto

SpaceGame/\
├── index.html # Estrutura principal da página\
├── style.css # Estilos do jogo e do menu\
├── script.js # Lógica e mecânica do jogo\
├── images/ # Imagens das naves e fundos\
│ ├── Fundo_Menu.jpg\
│ ├── Fundo_Espacial.png\
│ ├── NavePrincipal.png\
│ ├── NaveInimiga1.png\
│ ├── NaveInimiga2.png\
│ ├── NaveInimiga3.png\
│ └── Logo.png\
└── audio/ # Trilhas e efeitos sonoros\
├── background.mp3\
├── shot.mp3\
├── explosion.mp3\
├── gameover-music.mp3\
└── gameover-voice.mp3


---

## 🕹️ Como Jogar

1. Abra o arquivo **`index.html`** no navegador.  
2. Digite seu **nickname** e clique em **Jogar**.  
3. Use as **setas ← e →** para mover a nave.  
4. **Clique com o mouse** para atirar.  
5. Pressione **"P"** para **pausar** o jogo.  
6. Derrote os inimigos e **aumente sua pontuação**!  

Quando sua nave for destruída, o jogo exibirá a tela de **Game Over**  
e salvará sua pontuação automaticamente no **scoreboard** (via API local).

---

## 💾 API do Scoreboard

O jogo envia e busca pontuações de uma API local:\  
http://localhost:3000/api/scores/

### Estrutura esperada no backend:
- **Método POST** → Salva uma pontuação:
  ```json
  {
    "datascore": "2025-10-22T15:00:00Z",
    "nickname": "Jogador1",
    "score": 42,
    "game": "Space Game"
  }
Método GET → Retorna uma lista de pontuações:\

[\
  { "nickname": "Jogador1", "score": 42 },\
  { "nickname": "Jogador2", "score": 35 }\
]\
💡 Caso não tenha a API, você pode desativar as chamadas fetch() em script.js para jogar offline.

⚙️ Tecnologias Usadas
HTML5 → renderização do jogo

CSS3 → interface e layout do menu

JavaScript (ES6) → lógica, eventos e colisões

Fetch API → comunicação com o backend

Áudio HTML5 → efeitos sonoros e música

🔊 Controles
Ação	Tecla / Botão\
Mover para a esquerda	⬅️ seta esquerda\
Mover para a direita	➡️ seta direita\
Atirar	🖱️ clique do mouse\
Pausar / Continuar	🔤 tecla "P"\
Voltar ao menu	botão “Sair para o menu”

🧠 Lógica do Jogo
O jogador se move horizontalmente e dispara projéteis.

Os inimigos aparecem de forma aleatória e atiram de tempos em tempos.

Cada inimigo possui vida, dano e chance de disparo diferentes.

A colisão entre tiros e inimigos ou inimigos e jogador reduz a vida.

Ao zerar a vida do jogador → Game Over.

A pontuação é incrementada conforme inimigos destruídos.

🧑‍💻 Autor
Desenvolvido por [Renan Straquicini]

💬 Projeto feito para estudos de HTML5, CSS3 e JavaScript.

🏁 Licença
Este projeto está sob a licença MIT — sinta-se à vontade para usar e modificar.\
Créditos de imagens e áudios pertencem aos seus respectivos autores.

