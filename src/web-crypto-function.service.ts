export class WebCryptoFunctionService {
  private crypto: Crypto;
  private subtle: SubtleCrypto;

  constructor(win: Window | typeof global) {
    this.crypto = typeof win.crypto !== "undefined" ? win.crypto : null;
    this.subtle =
      !!this.crypto && typeof win.crypto.subtle !== "undefined" ? win.crypto.subtle : null;
  }

  // Safely compare two values in a way that protects against timing attacks (Double HMAC Verification).
  // ref: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/february/double-hmac-verification/
  // ref: https://paragonie.com/blog/2015/11/preventing-timing-attacks-on-string-comparison-with-double-hmac-strategy
  async compare(a: Uint8Array, b: Uint8Array): Promise<boolean> {
    const macKey = await this.randomBytes(32);
    const signingAlgorithm = {
      name: "HMAC",
      hash: { name: "SHA-256" },
    };
    const impKey = await this.subtle.importKey("raw", macKey, signingAlgorithm, false, ["sign"]);
    const mac1 = await this.subtle.sign(signingAlgorithm, impKey, a);
    const mac2 = await this.subtle.sign(signingAlgorithm, impKey, b);

    if (mac1.byteLength !== mac2.byteLength) {
      return false;
    }

    const arr1 = new Uint8Array(mac1);
    const arr2 = new Uint8Array(mac2);
    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  randomBytes(length: number): Promise<Uint8Array> {
    const arr = new Uint8Array(length);
    this.crypto.getRandomValues(arr);
    return Promise.resolve(arr);
  }
}
