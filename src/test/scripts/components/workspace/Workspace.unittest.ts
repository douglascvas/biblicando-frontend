import {SectionContext} from "../../../../main/scripts/components/studySection/SectionContext";
import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as Sinon from "sinon";
import {Book} from "../../../../main/scripts/components/book/Book";
import {Chapter} from "../../../../main/scripts/components/chapter/Chapter";
import {ServiceContainer} from "../../../../main/scripts/components/common/ServiceContainer";
import {LoggerFactory} from "../../../../main/scripts/components/common/LoggerFactory";
import {Workspace} from "../../../../main/scripts/components/workspace/Workspace";
import {StoreContainer} from "../../../../main/scripts/components/common/StoreContainer";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('Workspace', () => {
  let workspace: Workspace;
  let storeContainer: StoreContainer;
  let serviceContainer: ServiceContainer;

  beforeEach(() => {
    let storeContainer: StoreContainer = Sinon.createStubInstance(StoreContainer);
    let serviceContainer: ServiceContainer = Sinon.createStubInstance(ServiceContainer);
    (<any>serviceContainer.getLoggerFactory).returns(new LoggerFactory());

  });

  describe('Bibles', () => {
    it('should create an initial study section', async () => {
      // given

      // when
      workspace = new Workspace(storeContainer, serviceContainer);

      // then
      assert.equal(1, 1);
    });


  });


  function buildBible(prefix?: string) {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

  function buildBook(prefix?: string) {
    prefix = prefix || "1";
    const book: Book = new Book();
    book.name = `${prefix}_test_book`;
    book._id = `${prefix}_test_book_id`;
    return book;
  }

  function buildChapter(prefix?: string) {
    prefix = prefix || "1";
    const chapter: Chapter = new Chapter();
    chapter._id = `${prefix}_test_chapter_id`;
    return chapter;
  }
});
