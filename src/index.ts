import { Form } from "./components/Form"
import { Item } from "./components/Item"
import { Page } from "./components/Page"
import { ToDoModel } from "./components/ToDoModel"
import "./styles/styles.css"
import { todos } from "./utils/constants"

const contentElement = document.querySelector('.content') as HTMLElement

const itemTemplate = document.querySelector(
  '#todo-item-template'
) as HTMLTemplateElement;
const formTemplate = document.querySelector(
  '#todo-form-template'
) as HTMLTemplateElement;

const page = new Page(contentElement)

const todoArray = new ToDoModel();
todoArray.items = todos;

const todoForm = new Form(formTemplate)
todoForm.setHandler(handleSubmitForm)

page.formContainer = todoForm.render();


function handleSubmitForm(data: string) {
  todoArray.addItem(data);
  todoForm.clearValue();
  renderTodoItems();
  }

function renderTodoItems() {
  page.todoContainer = todoArray.items.map(item => {
  const todoItem = new Item(itemTemplate);
  const itemElement = todoItem.render(item)
  return(itemElement)
}).reverse();
}

renderTodoItems();