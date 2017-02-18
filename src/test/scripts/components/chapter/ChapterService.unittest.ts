import {Chapter} from "../../../../main/scripts/components/chapter/Chapter";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {ChapterService} from "../../../../main/scripts/components/chapter/ChapterService";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {HttpClientFactory, HttpClient} from "../../../../main/scripts/components/common/HttpClient";
import {Config} from "../../../../main/scripts/config/Config";
import {ConfigProd} from "../../../../main/scripts/config/ConfigProd";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('ChapterService', () => {
  let chapterService: ChapterService,
    httpClientFactory: HttpClientFactory,
    httpClient: HttpClient,
    loggerFactory: LoggerFactory,
    config: Config;

  const bookId = 'bookId';
  const chaptersUrl = '/bilesApi';

  beforeEach(() => {
    config = <any>Sinon.createStubInstance(ConfigProd);
    (<Sinon.SinonStub>config.getChaptersUrl).withArgs(bookId).returns(chaptersUrl);

    httpClientFactory = <any>Sinon.createStubInstance(HttpClientFactory);
    httpClient = <any>Sinon.createStubInstance(HttpClient);
    (<Sinon.SinonStub>httpClientFactory.create).returns(httpClient);

    loggerFactory = new TestLoggerFactory();
    chapterService = new ChapterService(config, httpClientFactory, loggerFactory);
  });

  describe('ChapterService', () => {
    it('should fetch all chapters from the server', async() => {
      // assume
      const chapters = [aChapter('1'), aChapter('2')];
      // given
      (<Sinon.SinonStub>httpClient.fetch).withArgs(chaptersUrl).returns(aResponseWithData(chapters));

      // when
      const result = await chapterService.fetchChapters(bookId);

      // then
      assert.deepEqual(result, chapters);
    });
  });

  function aResponseWithData(data: any) {
    return {
      data: data
    };
  }

  function aChapter(prefix?: string) {
    prefix = prefix || "1";
    const chapter: Chapter = new Chapter();
    chapter._id = `${prefix}_test_chapter_id`;
    return chapter;
  }

});
