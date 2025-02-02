import { IItem } from "../types";

export interface IViewItem {
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
  setDeleteHandler(handleDeleteItem: Function): void;
  setCopyHandler(handleCopyItem: Function): void;
}

export interface IViewItemConstructor {
  new(template: HTMLTemplateElement): IViewItem;
}
export class Item implements IViewItem {

    protected itemElement: HTMLElement;
    protected title: HTMLElement;
    protected _id: string;
    protected deleteButton: HTMLButtonElement;
    protected copyButton: HTMLButtonElement;
    protected handleDeleteItem: Function;
    protected handleCopyItem: Function;

    constructor (template: HTMLTemplateElement) {
        this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
        this.title = this.itemElement.querySelector('.todo-item__text');
        this.deleteButton = this.itemElement.querySelector('.todo-item__del');
        this.copyButton = this.itemElement.querySelector('.todo-item__copy');
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id || '';
    }

    set name(value: string) {
        this.title.textContent = value;
    }

    get name(): string {
        return this.title.textContent || '';
    }

    setDeleteHandler(handleDeleteItem: Function) {
      this.handleDeleteItem = handleDeleteItem;
      this.deleteButton.addEventListener('click', (evt) => {
        this.handleDeleteItem(this);
      })
    }

    setCopyHandler(handleCopyItem: Function) {
      this.handleCopyItem = handleCopyItem;
      this.copyButton.addEventListener('click', (evt) => {
        this.handleCopyItem(this);
      })
    }

    render(item: IItem) {
        this.name = item.name;
        this.id = item.id;
        return this.itemElement;
    }

}