import type { DidDocument, VerificationMethod } from '@tbd54566975/dwn-sdk-js';

export type Jwk = {
  /** The "alg" (algorithm) parameter identifies the algorithm intended for use with the key. */
  alg?: string;
  /** The "alg" (algorithm) parameter identifies the algorithm intended for use with the key. */
  kid?: string;
  /** identifies the cryptographic algorithm family used with the key, such "EC". */
  kty: string;

  crv: string;
};

export type PublicKeyJwk = Jwk & {
  /** The "crv" (curve) parameter identifies the cryptographic curve used with the key.
   * MUST be present for all EC public keys
   */
  crv: string;
  /**
   * the x coordinate for the Elliptic Curve point.
   * Represented as the base64url encoding of the octet string representation of the coordinate.
   * MUST be present for all EC public keys
   */
  x: string;
  /**
   * the y coordinate for the Elliptic Curve point.
   * Represented as the base64url encoding of the octet string representation of the coordinate.
   */
  y?: string;
};

export type PrivateKeyJwk = PublicKeyJwk & {
  /**
   * the Elliptic Curve private key value.
   * It is represented as the base64url encoding of the octet string representation of the private key value
   * MUST be present to represent Elliptic Curve private keys.
   */
  d: string;
};

// TODO: remove this once we've figured out keystore stuff
export type VerificationMethodWithPrivateKeyJwk = VerificationMethod & {
  privateKeyJwk: PrivateKeyJwk;
};

export type DidState = {
  id: string;
  internalId: string;
  didDocument?: DidDocument;
  keys: VerificationMethodWithPrivateKeyJwk[];
  methodData: { [prop: string]: any };
};

export type Profile = {
  id: string;
  did: DidState;
  name: string;
  icon: string;
  connections: any[];
  dateCreated: Date;
};

export interface ProfileManager {
  createProfile(options: CreateProfileOptions): Promise<Profile>;
  getProfile(id: string): Promise<Profile | undefined>;
  listProfiles(): Promise<Profile[]>;
}

export type CreateProfileOptions = {
  id?: string;
  did?: DidState;
  didMethod?: 'ion' | 'key';
  name?: string;
  icon?: string;
  // TODO: figure out concrete type for Connection
  connections?: any[];
};
