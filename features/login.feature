Feature: Login

Scenario: login with success
    Given the user has a Valid email and password 
    When  I click in login button
    Then  the user is logged with success