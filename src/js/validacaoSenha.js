const form = document.querySelector(".form-cadastro");
const senha = document.getElementById("senha");
const repetirSenha = document.getElementById("repetir-senha");
const erroMsg = document.getElementById("senha-erro");

form.addEventListener("submit", function (e) {
  if (senha.value !== repetirSenha.value) {
    e.preventDefault();
    erroMsg.textContent = "As senhas não coincidem.";
    repetirSenha.classList.add("erro");
  } else {
    erroMsg.textContent = "";
    repetirSenha.classList.remove("erro");
  }
});
