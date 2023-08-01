import { WebCryptoFunctionService } from './web-crypto-function.service';

describe("WebCryptoFunctionService", () => {
  describe("compare", () => {
    it("should successfully compare two of the same values", async () => {
      const cryptoFunctionService = getWebCryptoFunctionService();
      const a = new Uint8Array(2);
      a[0] = 1;
      a[1] = 2;
      const equal = await cryptoFunctionService.compare(a, a);
      expect(equal).toBe(true);
    });
  });
});

function getWebCryptoFunctionService({ mockRandomBytes } = { mockRandomBytes: true }) {
  const sut = new WebCryptoFunctionService(window);

  return sut;
}
