# 3D Sex Simulator

Simulador interativo de cenas 3D com boneca e parceiro.

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/geovsne/3d-sex-simulator.git
cd 3d-sex-simulator

# 2. Instale as dependências
npm install

# 3. Rode o projeto
npm run dev
```

Abre em `http://localhost:3000`

## O que já tem

- Cena 3D com React Three Fiber
- 5 posições: Missionário, De quatro, Cowgirl, Em pé, De ladinho
- Animação de thrust (vai e vem)
- Controle de play/pause e velocidade
- Câmera orbitável (arraste para girar)
- Modelos placeholder (formas geométricas)

## Próximos passos

1. Substituir os placeholders por modelos .glb reais (boneca + parceiro)
2. Adicionar mais posições
3. Customização da boneca (corpo, seios, etc.)
4. Expressões e sons (opcional)

## Estrutura

```
src/
  App.jsx              → App principal + Canvas
  components/
    Scene.jsx          → Cena 3D + figuras + animação
    Controls.jsx       → UI de posições e controles
```
