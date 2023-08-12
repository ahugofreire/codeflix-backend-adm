import { validateSync } from "class-validator";
import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields-interfaces";

class ClassValidatorFields<PropsValidated>
 implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if(errors.length) {
      for(const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints)
      }
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}
