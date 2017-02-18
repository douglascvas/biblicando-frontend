import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {BibleService} from "../../../../main/scripts/components/bible/BibleService";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {HttpClientFactory, HttpClient} from "../../../../main/scripts/components/common/HttpClient";
import {Config} from "../../../../main/scripts/config/Config";
import {ConfigProd} from "../../../../main/scripts/config/ConfigProd";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('BibleService', () => {
  let bibleService: BibleService,
    httpClientFactory: HttpClientFactory,
    httpClient: HttpClient,
    loggerFactory: LoggerFactory,
    config: Config;

  const biblesUrl = '/bilesApi';

  beforeEach(() => {
    config = <any>Sinon.createStubInstance(ConfigProd);
    (<Sinon.SinonStub>config.getBiblesUrl).returns(biblesUrl);

    httpClientFactory = <any>Sinon.createStubInstance(HttpClientFactory);
    httpClient = <any>Sinon.createStubInstance(HttpClient);
    (<Sinon.SinonStub>httpClientFactory.create).returns(httpClient);

    loggerFactory = new TestLoggerFactory();
    bibleService = new BibleService(config, httpClientFactory, loggerFactory);
  });

  describe('BibleService', () => {
    it('should fetch all bibles from the server', async() => {
      // assume
      const bibles = [aBible('1'), aBible('2')];
      // given
      (<Sinon.SinonStub>httpClient.fetch).withArgs(biblesUrl).returns(aResponseWithData(bibles));

      // when
      const result = await bibleService.fetchBibles();

      // then
      assert.deepEqual(result, bibles);
    });
  });

  function aResponseWithData(data: any) {
    return {
      data: data
    };
  }

  function aBible(prefix?: string) {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

});
