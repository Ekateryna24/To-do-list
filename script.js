function onPageLoaded() {
  const saveButton = document.querySelector("button.save");
  const clearButton = document.querySelector("button.clear");
  const showTipsButton = document.querySelector("button.showTips");
  const closeTipsButton = document.querySelector("a.closeTips");
  const addButton = document.querySelector("button.addButton");
  const overlay = document.querySelector("#overlay");
  const pensil = document.querySelector("#pensil");

  const input = document.querySelector("input[type='text']");
  const ul = document.querySelector(".todos");


  pensil.addEventListener("click", () => {
    viewInput();
  });

  addButton.addEventListener("click", () => {
    CreateTodo();
  });
  saveButton.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });
  clearButton.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem("todos", ul.innerHTML)
  });
  showTipsButton.addEventListener("click", () => {
    overlay.style.height = "100%";
  });
  closeTipsButton.addEventListener("click", () => {
    overlay.style.height = "0";
  });

  function CreateTodo() {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    const newTodo = input.value;
    textSpan.append(newTodo);


    const DeleteBtn = document.createElement("span");
    DeleteBtn.classList.add("todo-trash");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");
    DeleteBtn.appendChild(icon);

    ul.appendChild(li).append(textSpan, DeleteBtn);
    input.value = "";
    listenDeleteTodo(DeleteBtn);
  }


  function viewInput() {
    input.style.display = input.style.display === "block" ? "none" : "block"
  }


  function onClickTodo(event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");

    }
  }

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      event.stopPropagation();
    });
  }

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
      ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const button of deleteButtons) {
      listenDeleteTodo(button);
    }
  }



  input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;

    if (keyPressed.which === keyEnter) {
      CreateTodo();
    }
  });


  ul.addEventListener("click", onClickTodo);
  loadTodos()
}
document.addEventListener("DOMContentLoaded", onPageLoaded);
