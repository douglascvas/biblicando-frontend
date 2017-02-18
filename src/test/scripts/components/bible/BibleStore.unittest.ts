import {Bible} from "../../../../main/scripts/components/bible/Bible";
import {assert} from "chai";
import * as Sinon from "sinon";
import {LoggerFactory} from "../../../../main/scripts/components/common/logger/LoggerFactory";
import {BibleService} from "../../../../main/scripts/components/bible/BibleService";
import {TestLoggerFactory} from "../common/logger/TestLoggerFactory";
import {BibleStore} from "../../../../main/scripts/components/bible/BibleStore";
import SinonMockStatic = Sinon.SinonMockStatic;
import SinonMock = Sinon.SinonMock;

describe('BibleService', () => {
  let bibleStore: BibleStore,
    loggerFactory: LoggerFactory;

  beforeEach(() => {
    loggerFactory = new TestLoggerFactory();
    bibleStore = new BibleStore(loggerFactory);
  });

  describe('BibleStore', () => {
    describe('replaceAll', () => {
      it('should replace all items in the store', async() => {
        // assume
        const bibles = [aBible('1'), aBible('2')];

        // when
        await bibleStore.replaceAll(bibles);

        // then
        assert.deepEqual(bibleStore.items, bibles);
      });
    });

    describe('onChange', () => {
      it('should register a change listener and call it when the bibles are changed', async() => {
        // given
        const listener = Sinon.stub();

        // when
        bibleStore.onChange(listener);
        await bibleStore.replaceAll([aBible('1')]);

        // then
        assert.isTrue(listener.calledOnce);
      });

      it('should unregister the change listener', async() => {
        // given
        const listener = Sinon.stub();

        // when
        const unregister = bibleStore.onChange(listener);
        unregister();
        await bibleStore.replaceAll([aBible('2')]);

        // then
        assert.isTrue(listener.notCalled);
      });

      it('should not call change listener when same value is updated', async() => {
        // given
        const listener = Sinon.stub();
        const bibles = [aBible('1')];

        // when
        await bibleStore.replaceAll(bibles);
        bibleStore.onChange(listener);
        await bibleStore.replaceAll(bibles);

        // then
        assert.isTrue(listener.notCalled);
      });
    });
  });

  function aBible(prefix?: string) {
    prefix = prefix || "1";
    const bible: Bible = new Bible();
    bible.name = `${prefix}_test_bible`;
    bible._id = `${prefix}_test_bible_id`;
    return bible;
  }

});
