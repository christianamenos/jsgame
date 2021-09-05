class Message {
  static openDialog(text, btnText) {
    if (!btnText) btnText = "CLOSE";
    let div = document.createElement("div");
    let btn = document.createElement("button");
    btn.textContent = btnText;
    btn.onclick = (Message.closeDialog);
    div.innerHTML = text;
    div.appendChild(btn);
    div.classList.add("msg");
    document.getElementById("viewportWrapper").appendChild(div);
    isPaused = true;
  }

  static closeDialog() {
    document.querySelectorAll(".msg").forEach((elem) => {
      elem.remove();
    });
    isPaused = false;
  }
}
