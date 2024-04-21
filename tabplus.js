const personagem = document.querySelector('.personagem');


const jump = () => {
    personagem.classList.add("jump");

    setTimeout( () =>{

        personagem.classList.remove("jump")

    },1000)

}


document.addEventListener('click',jump)