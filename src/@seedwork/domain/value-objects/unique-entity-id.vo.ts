import InvalidUuidError from "../../errors/invalid-uuid-id.vo";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {

  constructor(readonly id?: string) {
    super(id ||  uuidv4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id)
    if(!isValid) {
      throw new InvalidUuidError();
    }
  }
}
