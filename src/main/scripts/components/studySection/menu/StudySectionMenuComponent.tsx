import {StudySectionMenu} from "./StudySectionMenu";
import * as React from "react";
import BibleMenuComponent from "../../bible/bibleMenu/BibleMenuComponent";
import BookMenuComponent from "../../book/bookMenu/BookMenuComponent";
import ChapterMenuComponent from "../../chapter/chapterMenu/ChapterMenuComponent";
import {AbstractMenu} from "../../menu/AbstractMenu";

export interface StudySectionMenuProperties {
  id: string,
  studySectionMenu: StudySectionMenu
}

interface StudySectionMenuItem {
  id: string,
  label: string,
  icon: string,
  menu: AbstractMenu<any>,
  component: any
}

export default class StudySectionMenuComponent extends React.Component<StudySectionMenuProperties, StudySectionMenu> {
  private menuItems: StudySectionMenuItem[];
  private _unregisterFunctions: Function[];

  constructor(props: StudySectionMenuProperties, context: any) {
    super(props, context);

    this._unregisterFunctions = [];

    this.menuItems = [
      {
        id: 'bible-menu',
        label: 'Version',
        icon: 'fa-language',
        menu: props.studySectionMenu.bibleMenu,
        component: BibleMenuComponent
      },
      {
        id: 'book-menu',
        label: 'Book',
        icon: 'fa-book',
        menu: props.studySectionMenu.bookMenu,
        component: BookMenuComponent
      },
      {
        id: 'chapter-menu',
        label: 'Chapter',
        icon: 'fa-clone',
        menu: props.studySectionMenu.chapterMenu,
        component: ChapterMenuComponent
      },
    ];
  }

  public componentWillMount() {
    const onMenuToggleUnsubscribe = this.props.studySectionMenu.onMenuToggle(this.onToggle.bind(this));
    this._unregisterFunctions.push(onMenuToggleUnsubscribe);
  }

  public componentWillUnmount() {
    this._unregisterFunctions.forEach(fn => fn());
  }

  private onToggle() {
    this.setState({});
  }

  private menuButtonClicked(menu: AbstractMenu<any>) {
    this.props.studySectionMenu.menuButtonClicked(menu);
  }

  private overlayClicked() {
    this.props.studySectionMenu.overlayClicked();
  }

  public render() {
    const menuItems = this.menuItems.map((item: StudySectionMenuItem, index: number) => (
      <li key={`menu-item:${index}`}>
        <a href="javascript:void(0)" onClick={()=>this.menuButtonClicked(item.menu)}>
          <i className={`fa ${item.icon} navbar__icon left`} aria-hidden="true"></i> {item.label}
        </a>
      </li>
    ));

    const renderMenu = (MenuComponent, menuItem: StudySectionMenuItem) => (<MenuComponent id={`${this.props.id}:${menuItem.id}`}
                                                                                          key={`${this.props.id}:${menuItem.id}`}
                                                                                          menu={menuItem.menu}
                                                                                          className="menu__wrapper push--left"/>);
    const currentMenu = this.menuItems
      .filter(menuItem => menuItem.menu.visible)
      .map(menuItem => renderMenu(menuItem.component, menuItem));

    const createOverlay = () => (<div id={`${this.props.id}:overlay`}
                                      className="overlay study-section__overlay"
                                      onClick={()=>this.overlayClicked()}></div>);
    return (
      <bc-study-section-menu>
        <nav className="page__navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="page__nav-wrapper">
            <ul>{menuItems}</ul>
          </div>
        </nav>

        {this.props.studySectionMenu.isOverlayVisible() ? createOverlay() : null}

        <div className="col s12">
          {currentMenu}
        </div>
      </bc-study-section-menu>
    )
  }
}
