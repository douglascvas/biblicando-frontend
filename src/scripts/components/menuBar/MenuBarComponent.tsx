import {MenuBar} from "./MenuBar";
import * as React from "react";
import {EventHandler, MouseEvent} from "react";
import BibleMenuComponent from "../bible/bibleMenu/BibleMenuComponent";
import OverlayComponent from "../menu/OverlayComponent";

export interface MenuBarProperties {
  id: string,
  menuBar: MenuBar
}

interface MenuItem {
  label: string,
  icon: string,
  onClick: EventHandler<MouseEvent<any>>
}

export default class MenuBarComponent extends React.Component<MenuBarProperties, MenuBar> {
  private menuItems: MenuItem[];
  private _bibleMenuToggleUnsubscribe: Function;

  constructor(props: MenuBarProperties, context: any) {
    super(props, context);

    this.menuItems = [
      {label: 'Version', icon: 'fa-language', onClick: this.toggleBibleMenu.bind(this)},
      {label: 'Book', icon: 'fa-book', onClick: this.toggleBookMenu.bind(this)},
      {label: 'Chapter', icon: 'fa-clone', onClick: this.toggleChapterMenu.bind(this)},
    ];
  }

  public componentWillMount() {
    this._bibleMenuToggleUnsubscribe = this.props.menuBar.onBibleMenuToggle(this.onToggle.bind(this));
  }

  public componentWillUnmount() {
    this._bibleMenuToggleUnsubscribe();
  }

  private onToggle() {
    this.setState({});
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
      <li key={`menu-item:${index}`}>
        <a href="javascript:void(0)" onClick={item.onClick}>
          <i className={`fa ${item.icon} navbar__icon left`} aria-hidden="true"></i> {item.label}
        </a>
      </li>
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
          {/*{this.state.bookMenu.visible ? <BookMenu menu={this.state.bookMenu} className="menu__wrapper push--left"/> : null}*/}
          {/*{this.state.chapterMenu.visible ? <ChapterMenu menu={this.state.chapterMenu} className="menu__wrapper push--left"/> : null}*/}
        </div>
      </div>
    )
  }
}
