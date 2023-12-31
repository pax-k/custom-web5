import type { QueryStore } from '@tbd54566975/web5-agent';

import {
  CreateProfileOptions,
  Profile,
  ProfileManager,
} from './extracted-types.js';
import { CustomProfileStore } from './custom-profile-store.js';

export class ProfileApi implements ProfileManager {
  private store: QueryStore<Profile>;

  constructor(store?: QueryStore<Profile>) {
    this.store = store ||= new CustomProfileStore();
  }

  async createProfile(options: CreateProfileOptions): Promise<Profile> {
    if (!options.did && !options.didMethod) {
      throw new Error('must provide did or didMethod');
    }

    const profile: Partial<Profile> = {
      name: options.name,
      icon: options.icon,
      dateCreated: new Date(),
    };

    if (options.did) {
      profile.did = options.did;
    } else {
      // TODO: create DID based on didMethod
    }

    profile.id = options.did?.id;
    await this.store.put(profile as Profile);

    return profile as Profile;
  }

  getProfile(id: string): Promise<Profile | undefined> {
    return this.store.get(id);
  }

  // TODO: discuss whether we want to rename this to getProfiles instead
  listProfiles(): Promise<Profile[]> {
    return this.store.all();
  }
}
