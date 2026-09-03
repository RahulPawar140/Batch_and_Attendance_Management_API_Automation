Feature: Student API Testing

  @STU023
  Scenario: Get Student using valid student ID from Excel
    Given I load Student test case "TC_STU_023" from Excel
    When I send a GET Student request for Excel test case "TC_STU_023"
    Then the student response status code should match Excel
    And the student details should be returned successfully

  @STU024
  Scenario: Get Student List using parameters from Excel
    Given I load Student test case "TC_STU_024" from Excel
    When I send a GET Student List request for Excel test case "TC_STU_024"
    Then the student response status code should match Excel
    And the student list should be returned successfully

  @STU025
  Scenario: Create a new Student using data from Excel
    Given I load Student test case "TC_STU_025" from Excel
    When I send a POST Student request for Excel test case "TC_STU_025"
    Then the student response status code should match Excel
    And the student should be created successfully

  @STU026
  Scenario: Delete a Student using Excel test case
    Given I load Student test case "TC_STU_026" from Excel
    When I create a temporary Student for DELETE testing
    And I delete the temporary Student
    Then the student response status code should match Excel
    And the student should be deleted successfully
    And the deleted Student should not be retrievable
