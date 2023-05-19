package agh.wfiis.weather.jwt.validator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

class ValidationResultTest {

    @Test
    void shouldValidationResultBeValid() {
        ValidationResult validationResult = givenValidValidationResult();

        thenIsValid(validationResult);
    }

    @Test
    void shouldContainEmptyErrorMessage() {
        ValidationResult validationResult = givenValidValidationResult();

        String errorMessage = whenGetErrorMessage(validationResult);

        thenErrorMessageIsEmpty(errorMessage);
    }

    @Test
    void shouldValidationResultBeInvalid() {
        ValidationResult validationResult = givenInvalidValidationResult();

        thenIsNotValid(validationResult);
    }

    @Test
    void shouldContainErrorMessage() {
        ValidationResult validationResult = givenInvalidValidationResult();

        String errorMessage = whenGetErrorMessage(validationResult);

        thenErrorMessageIsNotEmpty(errorMessage);
    }

    private ValidationResult givenValidValidationResult() {
        return new ValidationResult(Collections.emptyList());
    }

    private ValidationResult givenInvalidValidationResult() {
        return new ValidationResult(List.of("Test1", "Test2"));
    }

    private String whenGetErrorMessage(ValidationResult validationResult) {
        return validationResult.getErrorMessage();
    }

    public void thenErrorMessageIsEmpty(String errorMessage) {
        Assertions.assertTrue(errorMessage.isEmpty());
    }

    public void thenErrorMessageIsNotEmpty(String errorMessage) {
        Assertions.assertEquals("Test1\nTest2", errorMessage);
    }

    public void thenIsValid(ValidationResult validationResult) {
        Assertions.assertTrue(validationResult.isValid());
    }

    public void thenIsNotValid(ValidationResult validationResult) {
        Assertions.assertFalse(validationResult.isValid());
    }
}
