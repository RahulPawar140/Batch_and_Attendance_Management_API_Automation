Feature: Faculty API Testing

  Background:
    Given the Faculty API service is available

  @FAC016
  Scenario: Get Faculty using valid faculty ID from Excel
    When I send a GET Faculty request for Excel test case "TC_FAC_016"
    Then the faculty response status code should match Excel
    And the faculty response status should be "success"
    And the faculty response error should be null
    And the faculty response errorCode should be 0
    And the faculty response should contain faculty ID from Excel

  @FAC017
  Scenario: Get Faculty List using parameters from Excel
    When I send a GET Faculty List request for Excel test case "TC_FAC_017"
    Then the faculty list response status code should match Excel
    And the faculty list response status should be success
    And the faculty list response error should be null
    And the faculty list response errorCode should be 0
    And the faculty list response should contain the Excel search text

  @FAC018
  Scenario: Create a new Faculty using data from Excel
    When I send a POST Faculty request for Excel test case "TC_FAC_018"
    Then the create faculty response status code should match Excel
    And the create faculty response status should be success
    And the create faculty response error should be null
    And the create faculty response errorCode should be 0
    And the created faculty ID should be generated
    And the created faculty name should match Excel

  @FAC019
  Scenario: Delete a Faculty using Excel test case
    When I create a temporary faculty for deletion using Excel test case "TC_FAC_019"
    And I delete the created faculty
    Then the delete faculty response status code should match Excel
    And the delete faculty response status should be success
    And the delete faculty response error should be null
    And the delete faculty response errorCode should be 0
    And the delete faculty message should be "Faculty Deleted Successfully"
    When I try to get the deleted faculty
    Then the deleted faculty should not be available
