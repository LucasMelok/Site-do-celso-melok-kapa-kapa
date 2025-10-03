// ==== Dados do jogo ====
const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"];
const nome = nomes[Math.floor(Math.random() * nomes.length)];

const perguntas = [
    {
        enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia, um chat que consegue responder todas as dúvidas que uma pessoa pode ter, ele também gera imagens e áudios hiper-realistas. Qual o primeiro pensamento?",
        alternativas: [
            {
                texto: "Isso é assustador!",
                afirmacao: [
                    "No início ficou com medo do que essa tecnologia pode fazer.",
                    "Achou assustador pensar na velocidade na qual a tecnologia está avançando."
                ],
                proxima: 1
            },
            {
                texto: "Isso é maravilhoso!",
                afirmacao: [
                    "Quis saber como usar IA no seu dia a dia.",
                    "Pensou que IA pode ajudar em tarefas da sua vida."
                ],
                proxima: 1
            }
        ]
    },
    {
        enunciado: "Utilizar uma IA pode ser aterrorizante mesmo, e foi pensando nisso que uma professora de tecnologia da escola decidiu fazer uma sequência de aulas sobre esta tecnologia. No fim de uma aula ela pede que você escreva um trabalho sobre o uso de IA em sala de aula. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Usa IA para buscar informações e explica de forma simplificada.",
                afirmacao: [
                    "Conseguiu utilizar a IA para buscar informações úteis.",
                    "Percebeu que a IA pode ajudar a encontrar informações úteis na internet de forma mais rápida e direcionada."
                ]
            },
            {
                texto: "Escreve com base nas próprias pesquisas e colegas.",
                afirmacao: [
                    "Sentiu mais facilidade em utilizar seus próprios recursos para escrever seu trabalho.",
                    "Sentiu um pouco de medo de quais dados pessoais a IA poderia utilizar."
                ]
            }
        ]
    }
];

// ==== Seleção de elementos do DOM ====
const telaInicial = document.querySelector(".tela-inicial");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

// ==== Variáveis de controle ====
let atual = 0;
let historiaFinal = "";

// ==== Funções do jogo ====
botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const pergunta = perguntas[atual];
    // Substitui "você" pelo nome aleatório
    caixaPerguntas.textContent = pergunta.enunciado.replace(/você/g, nome);
    caixaPerguntas.style.display = "block";

    caixaAlternativas.innerHTML = "";
    caixaAlternativas.style.display = "flex";

    pergunta.alternativas.forEach((alt, index) => {
        const botao = document.createElement("button");
        botao.textContent = alt.texto;
        botao.classList.add("btn");
        botao.addEventListener("click", () => {
            const afirmacao = alt.afirmacao[Math.floor(Math.random() * alt.afirmacao.length)];
            historiaFinal += afirmacao + " ";
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botao);
    });
}

function mostraResultado() {
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    textoResultado.textContent = `Em 2049, ${nome}... ` + historiaFinal;
    caixaResultado.classList.add("mostrar");
}
