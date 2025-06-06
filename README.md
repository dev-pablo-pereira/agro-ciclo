
# Agro Ciclo

## O que é?
Agro Ciclo é um aplicativo voltado para pequenos agricultores e produtores familiares, com o objetivo de auxiliar na gestão e planejamento de suas plantações. 
A proposta do sistema é oferecer uma maneira simples e eficiente para o produtor visualizar, organizar e acompanhar suas áreas de cultivo, além de estimar os recursos necessários para 
o plantio.

## Funcionalidades básicas (prioritárias para implementação)

[ ] Permitir que o usuário defina áreas de cultivo com base em sua localização geográfica, marcando os pontos no mapa para determinar os limites da área.

[ ] Calcular automaticamente a dimensão total da propriedade e das áreas cultivadas.

[ ] Associar culturas específicas a cada área delimitada (ex: milho, feijão, soja, etc.).

[ ] Estimar a quantidade de recursos necessários para o cultivo de cada área, como:

> [ ] Quantidade de sacos de sementes ou grãos.

> [ ] Quantidade de adubo.

> [ ] Quantidade de defensivos agrícolas (venenos).

## Funcionalidades adicionais (possíveis trabalhos futuros)

[ ] Cadastro e histórico de colheitas por área.

[ ] Previsão de gastos e lucros com base nas culturas plantadas.

[ ] Alertas e notificações sobre o período ideal de plantio e colheita.

[ ] Integração com dados climáticos da região.

[ ] Módulo de planejamento de rotação de culturas.

## Checklist de Implementação (atualizada a cada Checkpoint)

[ ] Interface de marcação de áreas no mapa.

[ ] Cálculo da área total e áreas cultivadas.

[ ] Associação de culturas por área.

[ ] Estimativa de recursos por tipo de cultura.

## Telas Figma

https://www.figma.com/design/aqRxgdvIgqb72gVDoeYK83/Agro-Ciclo?node-id=0-1&t=wUE1s647r6qLDyXg-1

## Diagrama banco de dados
 
https://viewer.diagrams.net/index.html?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=AgroCiclo.drawio&dark=auto#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fdev-pablo-pereira%2Fagro-ciclo%2Fmain%2FAgroCiclo.drawio#%7B%22pageId%22%3A%22kOlUkbhUVTrSechtVCCX%22%7D

## Sprints
### semana 21 / 25 abril
- foi criado o banco de dados com base na video aula sobre o tema, porém vai ser modificado

1. Criação banco de dados
2. Criação usuário
3. login do usuário
4. testes do mesmo

### semana 28 / 02 de maio
Foi criado apenas a interface visual da criação de uma nova área, e utilizado mocks

1. CRUD área
2. Interface CRUD
3. Testes área
4. CRUD coordenada
5. Interface CRUD
6. Testes CRUD

### semana 06 / 09

Realocada para a semana 09 / 13 de junho

1. CRUD produto
2. Interface CRUD produto
3. testes produto
4. CRUD safra
5. Interface safra
6. Testes safra

### semana 12 / 16

Realocada para a semana 16 / 20 de junho

1. CRUD cultivo
2. Inteface cultivo
3. Testes cultivos

### semana 19 / 23

Realocada para a semana semana 23 / 27 de junho

1. Refatorações e melhorias técnicas
2. Testes de fluxo

### semana 26 / 30

1. Implementação do ORM Drizzle
2. CRUD usuários
3. criação do CRUD de área

### semana 02 / 06 junho

1. CRUD produto
2. Interface CRUD produto
3. testes produto
4. CRUD safra
5. Interface safra
6. Testes safra

### semana 09 / 13

1. Tela lateral de navegação funcional
2. Adicionar calculo da estimativa
3. Implementar visualização da estimativa com base em área e produto
4. Testes para calculo de estimativa

### semana 16 / 20

1. CRUD cultivo
2. Inteface cultivo
3. Testes cultivos

### semana 23 / 27

1. Teste de fluxo completo
2. Refatorações e melhorias técnicas

## Atualizações desde o último checkpoint

1. Implementei o expo-router para criação das telas no formato stack e utilizei o hook useRouter para navegação entre telas, com os métodos push e navigate.
2. Tentei integrar o NativeWind para estilização, mas enfrentei um erro que não consegui resolver. Como alternativa, utilizei o StyleSheet do react-native.
3. Utilizei componentes da React Native Elements como Button, Input, Icon e Card.
4. Seguindo o fluxo passado na aula 05 foi criado as tarefas em um projeto destinado ao repositorio do código no gitHub.
5. Tentei seguir as boas praricas de criação de componentes seguindo a ideia do Atomic design em todos os meus componentes.
  
### Aplicação dos conceitos da aula “Boas práticas para a criação de componentes reutilizáveis” 
- Utilizei o padrão Atomic Design na construção dos componentes.
- Criei mocks para simular dados e testar o comportamento dos componentes — por exemplo, na tela Home, onde são listadas as áreas cadastradas.
- No componente CustomButton, adicionei uma prop que recebe uma callback no onPress, permitindo que o componente pai defina o comportamento.
- O Atomic Design foi aplicado nos seguintes componentes:
  - CustomButton
  - CustomInput
  - CardArea
  - CardLocation
  - ColorArea
  - PickColor
