import {Book} from "../../../../main/scripts/components/book/Book";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {BookService} from "../../../../main/scripts/components/book/BookService";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {HttpClientFactory, HttpClient} from "../../../../main/scripts/components/common/HttpClient";
import {Config} from "../../../../main/scripts/config/Config";
import {ConfigProd} from "../../../../main/scripts/config/ConfigProd";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('BookService', () => {
  let bookService: BookService,
    httpClientFactory: HttpClientFactory,
    httpClient: HttpClient,
    loggerFactory: LoggerFactory,
    config: Config;

  const bibleId = 'bibleId';
  const booksUrl = '/bilesApi';

  beforeEach(() => {
    config = <any>Sinon.createStubInstance(ConfigProd);
    (<Sinon.SinonStub>config.getBooksUrl).withArgs(bibleId).returns(booksUrl);

    httpClientFactory = <any>Sinon.createStubInstance(HttpClientFactory);
    httpClient = <any>Sinon.createStubInstance(HttpClient);
    (<Sinon.SinonStub>httpClientFactory.create).returns(httpClient);

    loggerFactory = new TestLoggerFactory();
    bookService = new BookService(config, httpClientFactory, loggerFactory);
  });

  describe('BookService', () => {
    it('should fetch all books from the server', async() => {
      // assume
      const books = [aBook('1'), aBook('2')];
      // given
      (<Sinon.SinonStub>httpClient.fetch).withArgs(booksUrl).returns(aResponseWithData(books));

      // when
      const result = await bookService.fetchBooks(bibleId);

      // then
      assert.deepEqual(result, books);
    });
  });

  function aResponseWithData(data: any) {
    return {
      data: data
    };
  }

  function aBook(prefix?: string) {
    prefix = prefix || "1";
    const book: Book = new Book();
    book.name = `${prefix}_test_book`;
    book._id = `${prefix}_test_book_id`;
    return book;
  }

});
