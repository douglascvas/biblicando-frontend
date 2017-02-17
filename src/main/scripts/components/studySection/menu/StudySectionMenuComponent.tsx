import {StudySectionMenu} from "./StudySectionMenu";
import * as React from "react";
import {EventHandler, MouseEvent} from "react";
import BibleMenuComponent from "../../bible/bibleMenu/BibleMenuComponent";
import BookMenuComponent from "../../book/bookMenu/BookMenuComponent";
import ChapterMenuComponent from "../../chapter/chapterMenu/ChapterMenuComponent";
import {BibleMenu} from "../../bible/bibleMenu/BibleMenu";
import {BookMenu} from "../../book/bookMenu/BookMenu";
import {ChapterMenu} from "../../chapter/chapterMenu/ChapterMenu";

export interface StudySectionMenuProperties {
  id: string,
  studySectionMenu: StudySectionMenu
}

interface StudySectionMenuItem {
  label: string,
  icon: string,
  onClick: EventHandler<MouseEvent<any>>
}

export default class StudySectionMenuComponent extends React.Component<StudySectionMenuProperties, StudySectionMenu> {
  private menuItems: StudySectionMenuItem[];
  private _unregisterFunctions: Function[];

  constructor(props: StudySectionMenuProperties, context: any) {
    super(props, context);

    this._unregisterFunctions = [];

    this.menuItems = [
      {label: 'Version', icon: 'fa-language', onClick: this.toggleBibleMenu.bind(this)},
      {label: 'Book', icon: 'fa-book', onClick: this.toggleBookMenu.bind(this)},
      {label: 'Chapter', icon: 'fa-clone', onClick: this.toggleChapterMenu.bind(this)},
    ];
  }

  public componentWillMount() {
    const bibleMenuToggleUnsubscribe = this.props.studySectionMenu.onBibleMenuToggle(this.onToggle.bind(this));
    const bookMenuToggleUnsubscribe = this.props.studySectionMenu.onBookMenuToggle(this.onToggle.bind(this));
    const chapterMenuToggleUnsubscribe = this.props.studySectionMenu.onChapterMenuToggle(this.onToggle.bind(this));
    this._unregisterFunctions.push(bibleMenuToggleUnsubscribe, bookMenuToggleUnsubscribe, chapterMenuToggleUnsubscribe);
  }

  public componentWillUnmount() {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private onToggle() {
    this.setState({});
  }

  private toggleBibleMenu() {
    this.props.studySectionMenu.bibleMenuButtonClicked();
  }

  private toggleBookMenu() {
    this.props.studySectionMenu.bookMenuButtonClicked();
  }

  private toggleChapterMenu() {
    this.props.studySectionMenu.chapterMenuButtonClicked();
  }

  private closeMenu() {
    this.props.studySectionMenu.hideAll();
  }

  public render() {
    const menuItems = this.menuItems.map((item: StudySectionMenuItem, index: number) => (
      <li key={`menu-item:${index}`}>
        <a href="javascript:void(0)" onClick={item.onClick}>
          <i className={`fa ${item.icon} navbar__icon left`} aria-hidden="true"></i> {item.label}
        </a>
      </li>
    ));

    const createBibleMenu = () => (<BibleMenuComponent id={`${this.props.id}:bible-menu`}
                                                       menu={this.props.studySectionMenu.bibleMenu as BibleMenu}
                                                       className="menu__wrapper push--left"/>);
    const createBookMenu = () => (<BookMenuComponent id={`${this.props.id}:book-menu`}
                                                     menu={this.props.studySectionMenu.bookMenu as BookMenu}
                                                     className="menu__wrapper push--left"/>);
    const createChapterMenu = () => (<ChapterMenuComponent id={`${this.props.id}:chapter-menu`}
                                                           menu={this.props.studySectionMenu.chapterMenu as ChapterMenu}
                                                           className="menu__wrapper push--left"/>);
    const createOverlay = () => (<div id={`${this.props.id}:overlay`}
                                      className="overlay study-section__overlay"
                                      onClick={()=>this.closeMenu()}></div>);
    return (
      <div>
        <nav className="page__navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="page__nav-wrapper">
            <ul>{menuItems}</ul>
          </div>
        </nav>

        {this.props.studySectionMenu.isOverlayVisible() ? createOverlay() : null}

        <div className="col s12">
          {this.props.studySectionMenu.bibleMenu.visible ? createBibleMenu() : null}
          {this.props.studySectionMenu.bookMenu.visible ? createBookMenu() : null}
          {this.props.studySectionMenu.chapterMenu.visible ? createChapterMenu() : null}
        </div>
      </div>
    )
  }
}
