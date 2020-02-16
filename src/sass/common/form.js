document.body.addEventListener("input", handleinput);
function handleinput(e) {
  if (e.target.type == "textarea") {
    const textarea = e.target;
    textarea.style.height = "";
    textarea.style.height = e.target.scrollHeight + 10 + "px";
  }
}
