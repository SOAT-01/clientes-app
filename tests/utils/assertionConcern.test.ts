import { AssertionConcern } from "utils/assertionConcern";
import { ValidationError } from "utils/errors/validationError";

describe("Assertion Concern", () => {
    describe("Given assertArgumentNotEmpty", () => {
        describe("When the sent argument is empty", () => {
            it("should throw an Validation Error when a null value is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        null,
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
            it("should throw an Validation Error when a undefined value is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        undefined,
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
            it("should throw an Validation Error when an empty object is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        {},
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
        });
        describe("When the sent argument is not empty", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        "not empty",
                        "Item should not be empty",
                    );
                }).not.toThrow(new ValidationError("Item should not be empty"));
            });
        });
    });

    describe("Given assertArgumentIsValidEmail", () => {
        describe("When the sent argument is not a valid e-mail", () => {
            it("should throw an Validation Error when an invalid e-mail is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValidEmail(
                        "invalid-email",
                        "Invalid e-mail!",
                    );
                }).toThrow("Invalid e-mail!");
            });
        });
        describe("When the sent argument is not an invalid e-mail", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValidEmail(
                        "valid-email@email.com",
                        "Invalid e-mail!",
                    );
                }).not.toThrow("Invalid e-mail!");
            });
        });
    });

    describe("Given assertArgumentIsValidCpf", () => {
        describe("When the sent argument is not a valid CPF", () => {
            it("should throw an Validation Error when an invalid CPF is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValidCpf(
                        "00000",
                        "Invalid CPF!",
                    );
                }).toThrow("Invalid CPF!");
            });
        });
        describe("When the sent argument is not an invalid CPF", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValidCpf(
                        "371.259.377-57",
                        "Invalid CPF!",
                    );
                }).not.toThrow("Invalid CPF!");
            });
        });
    });
    describe("Given assertArgumentIsObject", () => {
        describe("When the sent argument is not a valid object", () => {
            it("should return false if the object is not valid", () => {
                expect(AssertionConcern.assertArgumentIsObject(null)).toBe(
                    false,
                );
            });
        });
        describe("When the sent argument is not an invalid object", () => {
            it("should return true", () => {
                expect(AssertionConcern.assertArgumentIsObject({})).toBe(true);
            });
        });
    });
    describe("Given assertObjectEquality", () => {
        describe("When the sent objects are not equal", () => {
            it("should return false if the objects are not equal to each other", () => {
                expect(
                    AssertionConcern.assertObjectEquality({}, { price: 1 }),
                ).toBe(false);
            });
        });
        describe("When the sent objects are equal", () => {
            it("should return true", () => {
                expect(
                    AssertionConcern.assertObjectEquality(
                        { price: 1 },
                        { price: 1 },
                    ),
                ).toBe(true);
            });
        });
    });
});
