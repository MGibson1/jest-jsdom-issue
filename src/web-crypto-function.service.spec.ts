import { WebCryptoFunctionService } from './web-crypto-function.service';

describe("WebCryptoFunctionService", () => {
  describe("compare", () => {
    it("should successfully compare two of the same values", async () => {
      const cryptoFunctionService = getWebCryptoFunctionService();
      const a = new Uint8Array(2);
      a[0] = 1;
      a[1] = 2;
      const equal = await cryptoFunctionService.compare(a.buffer, a.buffer);
      expect(equal).toBe(true);
    });

    it("should successfully compare two different values of the same length", async () => {
      const cryptoFunctionService = getWebCryptoFunctionService();
      const a = new Uint8Array(2);
      a[0] = 1;
      a[1] = 2;
      const b = new Uint8Array(2);
      b[0] = 3;
      b[1] = 4;
      const equal = await cryptoFunctionService.compare(a.buffer, b.buffer);
      expect(equal).toBe(false);
    });

    it("should successfully compare two different values of different lengths", async () => {
      const cryptoFunctionService = getWebCryptoFunctionService();
      const a = new Uint8Array(2);
      a[0] = 1;
      a[1] = 2;
      const b = new Uint8Array(2);
      b[0] = 3;
      const equal = await cryptoFunctionService.compare(a.buffer, b.buffer);
      expect(equal).toBe(false);
    });
  });
});

function getWebCryptoFunctionService({ mockRandomBytes } = { mockRandomBytes: true }) {
  const sut = new WebCryptoFunctionService(window);

  return sut;
}
