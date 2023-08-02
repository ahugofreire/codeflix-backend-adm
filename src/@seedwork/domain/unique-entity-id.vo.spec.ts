import InvalidUuidError from "../../@seedwork/errors/invalid-uuid-id.vo";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate} from "uuid";


function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("Fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "d8bb2696-a2e3-49a2-8e33-6782fc142855";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid valid in constructor", () => {
    const validateSpy =spyValidateMethod();
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
