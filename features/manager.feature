Feature: Manager API Testing

  @MAN020
  Scenario: Get Manager using valid manager ID from Excel
    Given the Manager API test is started
    When I send a GET Manager request for Excel test case "TC_MAN_020"
    Then the manager response status code should match Excel
    And the manager response should contain manager details

  @MAN021
  Scenario: Get Manager List using parameters from Excel
    Given the Manager API test is started
    When I send a GET Manager List request for Excel test case "TC_MAN_021"
    Then the manager list response status code should match Excel
    And the manager list response should contain manager data

  @MAN022
  Scenario: Delete a Manager using Excel test case
    Given the Manager API test is started
    When I send a DELETE Manager request for Excel test case "TC_MAN_022"
    Then the manager delete response status code should match Excel
    And the manager should be deleted successfully
    And the deleted manager should not be available
