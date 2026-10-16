document.addEventListener("DOMContentLoaded", () => {

  const perguntas = document.querySelectorAll(".faq-pergunta");

  perguntas.forEach(pergunta => {
    pergunta.addEventListener("click", () => {

      const resposta = pergunta.nextElementSibling;

     
      document.querySelectorAll(".faq-resposta").forEach(item => {
        if (item !== resposta) {
          item.style.display = "none";
        }
      });

      
      if (resposta.style.display === "block") {
        resposta.style.display = "none";
      } else {
        resposta.style.display = "block";
      }

    });
  });

});