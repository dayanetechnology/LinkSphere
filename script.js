// =====================================================
// LINKSPHERE
// JAVASCRIPT FINAL
// Desenvolvido para HTML + CSS enviado
// =====================================================



// =====================================================
// MODO CLARO / ESCURO
// =====================================================


const themeButton = document.getElementById("themeButton");


if(themeButton){


    if(localStorage.getItem("tema") === "escuro"){


        document.body.classList.add("dark");

        themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }



    themeButton.addEventListener("click",()=>{


        document.body.classList.toggle("dark");



        if(document.body.classList.contains("dark")){


            localStorage.setItem(
                "tema",
                "escuro"
            );


            themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';


        }else{


            localStorage.setItem(
                "tema",
                "claro"
            );


            themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';


        }


    });


}





// =====================================================
// SISTEMA DE CURTIDAS
// =====================================================



const botoesCurtir =
document.querySelectorAll(".like-btn");



let curtidasSalvas =
JSON.parse(localStorage.getItem("curtidas"))
|| {};



botoesCurtir.forEach((botao,index)=>{


const contador =
botao.querySelector(".likes");



if(curtidasSalvas[index]){


contador.textContent =
curtidasSalvas[index];


}




botao.addEventListener("click",()=>{


let numero =
Number(contador.textContent);



if(!botao.classList.contains("curtido")){


numero++;


botao.classList.add("curtido");


botao.style.background =
"#ff1744";


botao.style.color =
"white";



}else{


numero--;


botao.classList.remove("curtido");


botao.style.background =
"";


botao.style.color =
"";



}



contador.textContent =
numero;



curtidasSalvas[index]=numero;



localStorage.setItem(

"curtidas",

JSON.stringify(curtidasSalvas)

);



});



});







// =====================================================
// CHAT
// =====================================================



const amigos =
document.querySelectorAll(".friend");



const chat =
document.querySelector(".chat-window");



const fecharChat =
document.getElementById("closeChat");



const tituloChat =
document.querySelector(".chat-header h3");



let amigoSelecionado =
"";





amigos.forEach(amigo=>{


amigo.addEventListener("click",()=>{


amigoSelecionado =
amigo.querySelector("p").textContent;



if(tituloChat){

tituloChat.textContent =
amigoSelecionado;

}



if(chat){

chat.style.display =
"flex";

}



});



});





if(fecharChat){


fecharChat.addEventListener("click",()=>{


chat.style.display =
"none";


});


}





// =====================================================
// ENVIO DE MENSAGENS
// =====================================================



const campoMensagem =
document.querySelector(".chat-footer input");



const botaoEnviar =
document.querySelector(".chat-footer button");



const corpoChat =
document.querySelector(".chat-body");




function enviarMensagem(){



if(!campoMensagem.value.trim()){

return;

}



const mensagem =
document.createElement("div");



mensagem.classList.add(
"message",
"my-message"
);



mensagem.textContent =
campoMensagem.value;



corpoChat.appendChild(mensagem);



let texto =
campoMensagem.value;



campoMensagem.value =
"";



corpoChat.scrollTop =
corpoChat.scrollHeight;





setTimeout(()=>{


const resposta =
document.createElement("div");



resposta.classList.add(
"message",
"friend-message"
);



resposta.textContent =

`${amigoSelecionado || "Amigo"}: 
Recebi sua mensagem 😊`;



corpoChat.appendChild(resposta);



corpoChat.scrollTop =
corpoChat.scrollHeight;



},1200);



}





if(botaoEnviar){


botaoEnviar.addEventListener(
"click",
enviarMensagem
);


}





if(campoMensagem){


campoMensagem.addEventListener(
"keypress",
(e)=>{


if(e.key==="Enter"){

enviarMensagem();

}


});


}





// =====================================================
// CARREGAMENTO
// =====================================================


window.addEventListener("load",()=>{


console.log(
"🚀 LinkSphere iniciado com sucesso!"
);


});
// =====================================================
// PESQUISA DE PUBLICAÇÕES
// =====================================================


const campoPesquisa =
document.querySelector(".search-box input");


const publicacoes =
document.querySelectorAll(".post");



if(campoPesquisa){


campoPesquisa.addEventListener("input",()=>{


let texto =
campoPesquisa.value.toLowerCase();



publicacoes.forEach(post=>{


let conteudo =
post.innerText.toLowerCase();



if(conteudo.includes(texto)){


post.style.display="block";


}else{


post.style.display="none";


}



});



});


}





// =====================================================
// NOVA PUBLICAÇÃO
// =====================================================



const caixaPost =
document.querySelector(".new-post");



const campoNovaPublicacao =
document.querySelector(".new-post input");



const feed =
document.querySelector(".feed");





// Criar botão publicar automaticamente


let botaoPublicar =
document.createElement("button");



botaoPublicar.classList.add(
"publish-button"
);



botaoPublicar.innerHTML =
`
<i class="fa-solid fa-paper-plane"></i>
Publicar
`;



if(caixaPost){


caixaPost.appendChild(
botaoPublicar
);


}






let postsSalvos =
JSON.parse(localStorage.getItem("posts"))
|| [];





// Carregar publicações salvas


postsSalvos.forEach(post=>{


criarPublicacao(post);


});






function criarPublicacao(texto){



const novoPost =
document.createElement("article");



novoPost.classList.add(
"post"
);



novoPost.innerHTML =

`

<div class="post-header">


<img 
src="img/avatar1.jpg"
class="avatar">


<div>

<h3>
Dayane Cardozo
</h3>


<span>
Agora mesmo • Online
</span>


</div>


</div>



<p class="post-text">

${texto}

</p>



<div class="post-actions">


<button class="like-btn">

❤️ Curtir

<span class="likes">
0
</span>


</button>



<button>

💬 Comentar

</button>



<button>

📤 Compartilhar

</button>



<button>

⭐ Salvar

</button>


</div>

`;



feed.prepend(novoPost);




ativarCurtidaNovoPost(novoPost);



}







if(botaoPublicar){



botaoPublicar.addEventListener(
"click",
()=>{


if(!campoNovaPublicacao.value.trim()){


alert(
"Digite algo para publicar!"
);


return;


}



let texto =
campoNovaPublicacao.value;



criarPublicacao(texto);



postsSalvos.push(texto);



localStorage.setItem(

"posts",

JSON.stringify(postsSalvos)

);



campoNovaPublicacao.value="";



}

);


}







// =====================================================
// CURTIDA DOS NOVOS POSTS
// =====================================================



function ativarCurtidaNovoPost(post){



const botao =
post.querySelector(".like-btn");



const contador =
post.querySelector(".likes");



botao.addEventListener(
"click",
()=>{


let numero =
Number(contador.textContent);



if(!botao.classList.contains("curtido")){


numero++;


botao.classList.add("curtido");


botao.style.background =
"#ff1744";


botao.style.color =
"white";


}else{


numero--;


botao.classList.remove("curtido");


botao.style.background =
"";


botao.style.color =
"";


}



contador.textContent =
numero;



});


}







// =====================================================
// STORIES
// =====================================================



const stories =
document.querySelectorAll(".story");



stories.forEach(story=>{


story.addEventListener(
"click",
()=>{


story.style.transform =
"scale(1.12)";



setTimeout(()=>{


story.style.transform =
"scale(1)";


},300);



alert(

`📸 Story de ${
story.querySelector("span").textContent
}`

);



});



});







// =====================================================
// NOTIFICAÇÕES
// =====================================================



const botoesHeader =
document.querySelectorAll(
".header-icons button"
);



if(botoesHeader.length > 1){



const botaoNotificacao =
botoesHeader[1];



botaoNotificacao.addEventListener(
"click",
()=>{


alert(

`🔔 NOTIFICAÇÕES


❤️ Amanda curtiu sua publicação.


💬 Carlos comentou seu post.


👥 Fernanda enviou uma solicitação.


📢 João compartilhou uma publicação.`


);



}

);


}
// =====================================================
// MENU MOBILE
// =====================================================


const sidebar =
document.querySelector(".sidebar");



const menuMobile =
document.createElement("button");



menuMobile.classList.add(
"menu-mobile"
);



menuMobile.innerHTML =
`
<i class="fa-solid fa-bars"></i>
`;



document.body.appendChild(menuMobile);





menuMobile.addEventListener(
"click",
()=>{


sidebar.classList.toggle(
"active"
);


});






// Fechar menu ao clicar fora


document.addEventListener(
"click",
(e)=>{


if(

sidebar &&

!sidebar.contains(e.target)

&&

!menuMobile.contains(e.target)

){


sidebar.classList.remove(
"active"
);


}



});







// =====================================================
// ANIMAÇÃO DOS CARDS
// =====================================================



const cards =
document.querySelectorAll(".post");



const observador =
new IntersectionObserver(
(entradas)=>{


entradas.forEach(
(entrada)=>{


if(
entrada.isIntersecting
){


entrada.target.classList.add(
"show"
);


}



});


},

{

threshold:0.15

}

);





cards.forEach(
(card)=>{


observador.observe(card);


});








// =====================================================
// EFEITO DE CLIQUE NOS BOTÕES
// =====================================================



const todosBotoes =
document.querySelectorAll(
"button"
);



todosBotoes.forEach(
(botao)=>{


botao.addEventListener(
"mousedown",
()=>{


botao.style.transform =
"scale(.95)";


});




botao.addEventListener(
"mouseup",
()=>{


botao.style.transform =
"scale(1)";


});


});







// =====================================================
// SOMBRA DO HEADER AO ROLAR
// =====================================================



const header =
document.querySelector("header");



if(header){


window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.style.boxShadow =
"0 15px 35px rgba(0,0,0,.20)";



}else{


header.style.boxShadow =
"var(--shadow)";


}



});


}







// =====================================================
// BOTÃO VOLTAR AO TOPO
// =====================================================



const botaoTopo =
document.createElement("button");



botaoTopo.classList.add(
"top-button"
);



botaoTopo.innerHTML =
`
<i class="fa-solid fa-arrow-up"></i>
`;



document.body.appendChild(
botaoTopo
);





botaoTopo.style.display =
"none";






window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 500){


botaoTopo.style.display =
"flex";


}else{


botaoTopo.style.display =
"none";


}



});







botaoTopo.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});







// =====================================================
// ATIVIDADE ONLINE
// =====================================================



const amigosOnline =
document.querySelectorAll(
".online"
);



amigosOnline.forEach(
(status)=>{


status.title =
"Usuário Online 🟢";


});







// =====================================================
// BOTÃO EDITAR PERFIL
// =====================================================



const editarPerfil =
document.querySelector(
".edit-profile"
);



if(editarPerfil){



editarPerfil.addEventListener(
"click",
()=>{


alert(

"Área de edição de perfil em desenvolvimento 🚀"

);


});


}







// =====================================================
// BOTÕES FOTO / VÍDEO / EMOJI
// =====================================================



const botoesPost =
document.querySelectorAll(
".post-buttons button"
);



botoesPost.forEach(
(botao)=>{


botao.addEventListener(
"click",
()=>{


alert(

`${botao.innerText} selecionado 📌`

);


});


});







// =====================================================
// ANIMAÇÃO INICIAL
// =====================================================



window.addEventListener(
"load",
()=>{


document.body.style.opacity =
"1";



console.log(
"🌎 LinkSphere carregado com sucesso!"
);



});







// =====================================================
// PROTEÇÃO CONTRA ERROS
// =====================================================



window.addEventListener(
"error",
(evento)=>{


console.warn(
"LinkSphere:",
evento.message
);


});
