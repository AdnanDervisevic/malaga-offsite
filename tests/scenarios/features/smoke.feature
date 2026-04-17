Feature: App boots
  A sanity check that the BDD harness and the web app both work.

  Scenario: Landing page renders
    When I open the app
    Then I see the heading "Pet Concierge"

  Scenario: Petting the dog increments the count
    Given I have opened the app
    When I pet the dog 3 times
    Then the pet count shows 3
