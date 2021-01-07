function comecar() {
  var button = document.getElementById("botao");
  button && button.addEventListener("click", init);

  var divContador = document.querySelector(".contador");
  divContador && criarContador();

  var botaoVoltar = document.getElementById("restart");
  botaoVoltar && botaoVoltar.addEventListener("click", voltarParaForm);
}

function init(e) {
  e.preventDefault();
  var dataInput = document.querySelector("#data");
  const valor = dataInput.value;
  const novoV = new Date(valor).getTime();
  window.localStorage.setItem("timestamp", novoV);
  window.location = "/contador.html?t=" + novoV;
}

function criarContador() {
  const valorInput = +window.location.search.replace("?t=", "");

  setInterval(() => {
    contar();
  }, 1000);

  function contar() {
    let final = false;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const days = hour * 24;
    const horaAgr = new Date(Date.now()).getTime();

    const containerD = document.getElementById("dias");
    const containerH = document.getElementById("horas");
    const containerM = document.getElementById("minutos");
    const containerS = document.getElementById("segundos");

    const diferenca = valorInput - horaAgr;

    const dias = Math.floor(diferenca / days);
    const hora = Math.floor(diferenca / hour);
    const minutos = Math.floor(diferenca / minute);
    const segundos = Math.floor(diferenca / second);

    if (!final) {
      containerD.innerHTML =
        dias <= 0 ? "00" : dias.toString().padStart(2, "0");
      containerH.innerHTML = (hora - 24 * dias).toString().padStart(2, "0");
      containerM.innerHTML = (minutos - 60 * hora).toString().padStart(2, "0");
      containerS.innerHTML = (segundos - 60 * minutos)
        .toString()
        .padStart(2, "0");
    } else if (dias < 0 && hora < 0 && minutos < 0 && segundos < 0) {
      let final = false;
      document.querySelector("h6").innerText = "Fim";
    }
  }
}

function voltarParaForm() {
  window.history.back();
}

comecar();
