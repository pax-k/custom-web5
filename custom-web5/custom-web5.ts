import {
  DataStoreLevel,
  Dwn,
  EventLogLevel,
  MessageStoreLevel,
} from '@tbd54566975/dwn-sdk-js';
import { Web5UserAgent } from '@tbd54566975/web5-user-agent';
import { CustomProfileStore } from './custom-profile-store';
import { ProfileApi } from './extracted-profile-api';
import { MemoryLevel } from 'memory-level';

const initMemoryDwn = async () => {
  const messageStore = new MessageStoreLevel({
    createLevelDatabase: (_, options?: any) =>
      Promise.resolve(new MemoryLevel(options)),
  });

  const dataStore = new DataStoreLevel({
    createLevelDatabase: (_, options?) =>
      Promise.resolve(new MemoryLevel(options)),
  });

  const eventLog = new EventLogLevel({
    createLevelDatabase: (_, options?) =>
      Promise.resolve(new MemoryLevel(options)),
    location: 'EVENTLOG',
  });

  const dwn = await Dwn.create({ messageStore, dataStore, eventLog });
  return dwn;
};

const profileStore = new CustomProfileStore();
const profileApi = new ProfileApi(profileStore);
const dwn = initMemoryDwn();
