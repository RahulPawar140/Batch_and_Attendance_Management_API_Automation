Feature: User API Testing

  @USE027
  Scenario: Get User by ID
    Given the User API test case "TC_USE_027" is loaded from Excel
    When I send a GET request for the User
    Then the User HTTP status code should match the expected status
    And the User details should be returned successfully

  @USE028
  Scenario: Create User using data from Excel
    Given the User API test case "TC_USE_028" is loaded from Excel
    When I send a POST request to create the User
    Then the User HTTP status code should match the expected status
    And the User should be created successfully
