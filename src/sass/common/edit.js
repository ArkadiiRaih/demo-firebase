window.addEventListener("DOMContentLoaded", () =>
  document.body.addEventListener("click", handleEdit)
);

function handleEdit(e) {
  if (e.target.matches(".edit")) {
    if (!e.target.dataset.target) {
      return;
    }
    const targetId = e.target.dataset.target;
    const editable = document.getElementById(targetId);
    if (e.target.dataset.action == "edit") {
      editable.contentEditable = "true";
      editable.classList.add("editing");
      e.target.innerText = "/ok";
      e.target.dataset.action = "save";
    } else {
      editable.contentEditable = "false";
      editable.classList.remove("editing");
      e.target.innerText = "/edit";
      e.target.dataset.action = "edit";
    }
  }
}
