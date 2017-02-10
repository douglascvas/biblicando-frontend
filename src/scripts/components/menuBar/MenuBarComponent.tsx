import {MenuBar} from "./MenuBar";
import * as React from "react";
import {EventHandler, MouseEvent} from "react";
import BibleMenuComponent from "../bible/bibleMenu/BibleMenuComponent";
import OverlayComponent from "../menu/OverlayComponent";

export interface MenuBarProperties {
  id: string,
  menuBar: MenuBar
}

export interface MenuBarState {
}

interface MenuItem {
  label: string,
  icon: string,
  onClick: EventHandler<MouseEvent>
}

export default class MenuBarComponent extends React.Component<MenuBarProperties, MenuBarState> {
  private menuItems: MenuItem[];

  constructor(props: MenuBarProperties, context: any) {
    super(props, context);

    this.menuItems = [
      {label: 'Version', icon: 'fa-language', onClick: this.toggleBibleMenu.bind(this)},
      {label: 'Book', icon: 'fa-book', onClick: this.toggleBookMenu.bind(this)},
      {label: 'Chapter', icon: 'fa-clone', onClick: this.toggleChapterMenu.bind(this)},
    ];
  }

  private toggleBibleMenu() {
    this.props.menuBar.bibleMenuButtonClicked();
  }

  private toggleBookMenu() {
    this.props.menuBar.bookMenuButtonClicked();
  }

  private toggleChapterMenu() {
    this.props.menuBar.chapterMenuButtonClicked();
  }

  private closeMenu() {
    this.props.menuBar.hideAll();
  }

  public render() {
    const items = this.menuItems.map((item: MenuItem, index: number) => (
      <a href="javascript:void(0)" onClick={item.onClick} key={`menu-item:${index}`}>
        <i class={`fa ${item.icon} navbar__icon left`} aria-hidden="true"></i> {item.label}
      </a>
    ));

    return (
      <div>
        <nav className="page__navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="page__nav-wrapper">
            <ul>{items}</ul>
          </div>
        </nav>
        <OverlayComponent id={`${this.props.id}:overlay`}
                          overlay={this.props.menuBar.overlay}
                          className="bible-page__overlay"
                          onClick={this.closeMenu.bind(this)}/>
        <div className="col s12">
          {this.props.menuBar.bibleMenu.visible ?
            <BibleMenuComponent id={`${this.props.id}:menu-bar`} menu={this.props.menuBar.bibleMenu} className="menu__wrapper push--left"/> : null}
          {/*{this.props.menuBar.bookMenu.visible ? <BookMenu menu={this.props.menuBar.bookMenu} className="menu__wrapper push--left"/> : null}*/}
          {/*{this.props.menuBar.chapterMenu.visible ? <ChapterMenu menu={this.props.menuBar.chapterMenu} class="menu__wrapper push--left"/> : null}*/}
        </div>
      </div>
    )
  }
}
