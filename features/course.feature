Feature: Course API Testing

  Background:
    Given the Course API service is available
  # ====================================================
  # COU011 - GET COURSE BY ID
  # ====================================================

  @COU011
  Scenario: Get Course using valid course ID from Excel
    When I send a GET course request for Excel test case "TC_COU_011"
    Then the Course response HTTP status code should match Excel
    And the Course response status should be "success"
    And the Course response error should be null
    And the Course response errorCode should be 0
    And the Course response should contain course ID 2
  # ====================================================
  # COU012 - GET COURSE LIST
  # ====================================================

  @COU012
  Scenario: Get Course List using parameters from Excel
    When I send a GET course list request for Excel test case "TC_COU_012"
    Then the Course response HTTP status code should match Excel
    And the Course response status should be "success"
    And the Course response error should be null
    And the Course response errorCode should be 0
    And the Course list response should contain course "HTML"
  # ====================================================
  # COU013 - CREATE COURSE
  # ====================================================

  @COU013
  Scenario: Create a new Course using data from Excel
    When I send a POST course request for Excel test case "TC_COU_013"
    Then the Course response HTTP status code should match Excel
    And the Course response status should be "success"
    And the Course response error should be null
    And the Course response errorCode should be 0
    And the created Course ID should be generated
    And the created Course name should be "Java"
  # ====================================================
  # COU014 - UPDATE COURSE
  # ====================================================

  @COU014
  Scenario: Update Course using data from Excel
    When I send a PUT course request for Excel test case "TC_COU_014"
    Then the Course response HTTP status code should match Excel
    And the Course response status should be "success"
    And the Course response error should be null
    And the Course response errorCode should be 0
    And the updated Course name should be "CSS"
  # ====================================================
  # COU015 - DELETE COURSE
  # ====================================================

  @COU015
  Scenario: Delete a Course using Excel test case
    When I create a temporary course for Excel test case "TC_COU_015"
    And I delete the created course
    Then the Course response HTTP status code should match Excel
    And the Course response status should be "success"
    And the Course response error should be null
    And the Course response errorCode should be 0
    And the delete Course message should be "Course Deleted Successfully"
    When I try to get the deleted course
    Then the deleted Course should not be available
