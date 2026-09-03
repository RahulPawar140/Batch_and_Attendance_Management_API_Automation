Feature: Batch API Testing

  Background:
    Given the Batch API service is available
  # ============================================================
  # B01 - GET BATCH BY ID
  # ============================================================

  @B01
  Scenario: Get Batch using valid batch ID from Excel
    When I send a GET request for Excel test case "TC_BAT_001"
    Then the response status code should match Excel
    And the batch response status should be success
    And the batch response error should be null
    And the batch response errorCode should be 0
    And the response should contain the batch ID from Excel
  # ============================================================
  # B02 - GET BATCHES LIST
  # ============================================================

  @B02
  Scenario: Get Batches List using parameters from Excel
    When I send a GET batches list request for Excel test case "TC_BAT_002"
    Then the response status code should match Excel
    And the batch response status should be success
    And the batch response error should be null
    And the batch response errorCode should be 0
    And the batch list should contain the expected batch
  # ============================================================
  # B03 - CREATE BATCH
  # ============================================================

  @B03
  Scenario: Create a new Batch using data from Excel
    When I send a POST create batch request for Excel test case "TC_BAT_003"
    Then the response status code should match Excel
    And the batch response status should be success
    And the batch response error should be null
    And the batch response errorCode should be 0
    And the created batch ID should be generated
    And the created batch name should match Excel
  # ============================================================
  # B04 - UPDATE BATCH
  # ============================================================

  @B04
  Scenario: Update Batch using data from Excel
    When I send a PUT update batch request for Excel test case "TC_BAT_004"
    Then the response status code should match Excel
    And the batch response status should be success
    And the batch response error should be null
    And the batch response errorCode should be 0
  # ============================================================
  # B05 - DELETE BATCH
  # ============================================================

  @B05
  Scenario: Delete a Batch using Excel test case
    When I create a temporary batch for deletion using Excel test case "TC_BAT_005"
    And I delete the created batch using Excel test case "TC_BAT_005"
    Then the response status code should match Excel
    And the batch response status should be success
    And the batch response error should be null
    And the batch response errorCode should be 0
    And the delete batch message should match Excel
    When I try to get the deleted batch
    Then the deleted batch should not be available
