import {Verse} from "../../../../main/scripts/components/verse/Verse";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {VerseService} from "../../../../main/scripts/components/verse/VerseService";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {HttpClientFactory, HttpClient} from "../../../../main/scripts/components/common/HttpClient";
import {Config} from "../../../../main/scripts/config/Config";
import {ConfigProd} from "../../../../main/scripts/config/ConfigProd";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('VerseService', () => {
  let verseService: VerseService,
    httpClientFactory: HttpClientFactory,
    httpClient: HttpClient,
    loggerFactory: LoggerFactory,
    config: Config;

  const chapterId = 'chapterId';
  const versesUrl = '/bilesApi';

  beforeEach(() => {
    config = <any>Sinon.createStubInstance(ConfigProd);
    (<Sinon.SinonStub>config.getVersesUrl).withArgs(chapterId).returns(versesUrl);

    httpClientFactory = <any>Sinon.createStubInstance(HttpClientFactory);
    httpClient = <any>Sinon.createStubInstance(HttpClient);
    (<Sinon.SinonStub>httpClientFactory.create).returns(httpClient);

    loggerFactory = new TestLoggerFactory();
    verseService = new VerseService(config, httpClientFactory, loggerFactory);
  });

  describe('VerseService', () => {
    it('should fetch all verses from the server', async() => {
      // assume
      const verses = [aVerse('1'), aVerse('2')];
      // given
      (<Sinon.SinonStub>httpClient.fetch).withArgs(versesUrl).returns(aResponseWithData(verses));

      // when
      const result = await verseService.fetchVerses(chapterId);

      // then
      assert.deepEqual(result, verses);
    });
  });

  function aResponseWithData(data: any) {
    return {
      data: data
    };
  }

  function aVerse(prefix?: string) {
    prefix = prefix || "1";
    const verse: Verse = new Verse();
    verse._id = `${prefix}_test_verse_id`;
    return verse;
  }

});
