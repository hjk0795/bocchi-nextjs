import { handleHttpError } from "./handleHttpError";

describe('Unit test for handleHttpError', () => {
    it('should generate an error object according to the status code', () => {
        assert.deepEqual(handleHttpError(400), { error: "400 Bad Request" });
        expect(handleHttpError(400)).to.deep.equal({ error: "400 Bad Request" });
        // expect(handleHttpError(400)).to.include({ error: "400 Bad Request" });
        // expect(handleHttpError(410)).to.include({ error: "410 Client Error" });
        // expect(handleHttpError(510)).to.include({ error: "510 Server Error" });
        // expect(handleHttpError(310)).to.include({ error: "310 Informational response(1xx) or Redirection(3xx)" });
    });

    // it('should generate an error object according to the input string', () => {
    //     expect(handleHttpError("Test")).to.eq({ error: "Test" });
    // });
});