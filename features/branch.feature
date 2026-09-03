Feature: Branch API Testing

  Background:
    Given the Branch API service is available
  # ============================================================
  # BRA006 - GET BRANCH BY ID
  # ============================================================

  @BRA006
  Scenario: Get Branch using valid branch ID from Excel
    When I send a GET branch request for Excel test case "TC_BRA_006"
    Then the branch response status code should match Excel
    And the branch response status should be success
    And the branch response error should be null
    And the branch response errorCode should be 0
    And the response should contain the branch ID from Excel
  # ============================================================
  # BRA007 - GET BRANCH LIST
  # ============================================================

  @BRA007
  Scenario: Get Branch List using parameters from Excel
    When I send a GET branch list request for Excel test case "TC_BRA_007"
    Then the branch response status code should match Excel
    And the branch response status should be success
    And the branch response error should be null
    And the branch response errorCode should be 0
    And the branch list should contain the expected branch
  # ============================================================
  # BRA008 - CREATE BRANCH
  # ============================================================

  @BRA008
  Scenario: Create a new Branch using data from Excel
    When I send a POST create branch request for Excel test case "TC_BRA_008"
    Then the branch response status code should match Excel
    And the branch response status should be success
    And the branch response error should be null
    And the branch response errorCode should be 0
    And the created branch ID should be generated
    And the created branch name should match Excel
  # ============================================================
  # BRA009 - UPDATE BRANCH
  # ============================================================

  @BRA009
  Scenario: Update Branch using data from Excel
    When I send a PUT update branch request for Excel test case "TC_BRA_009"
    Then the branch response status code should match Excel
    And the branch response status should be success
    And the branch response error should be null
    And the branch response errorCode should be 0
  # ============================================================
  # BRA010 - DELETE BRANCH
  # ============================================================

  @BRA010
  Scenario: Delete a Branch using Excel test case
    When I create a temporary branch for deletion using Excel test case "TC_BRA_010"
    And I delete the created branch using Excel test case "TC_BRA_010"
    Then the branch response status code should match Excel
    And the branch response status should be success
    And the branch response error should be null
    And the branch response errorCode should be 0
    And the delete branch message should match Excel
    When I try to get the deleted branch
    Then the deleted branch should not be available
