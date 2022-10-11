Feature: Minesweeper

# Definir los datos que usaremos para el test
# "n" = cellNumber
# "c" = cell
# "o" = cell empty
# "." = hidden cell 
# "!" = flag
# "?" = Question Mark

# # Definir los datos que habra debajo del tablero
# "*" = mines
# "o" = cell


Background:
Given the user opens the app

# Board

Scenario: Default board --> All the cells should be hidden
Then all the cells should be hidden

Scenario Outline: Validating board dimensions
Given the user loads the following mock data: "<board>"
Then the number of rows in the board should be "<rows>"
And the number of columns in the board should be "<columns>"

Examples:
|board    | rows | columns |
|*o-*o    | 2    | 2       |
|*ooo-*o*o| 2    | 4       |



Scenario: Reveal a cell -->  the cell should show their content
When the user reveals the cell "0-0"
Then the cell "0-0" should be revealed

# # Revealing cells

# Scenario: The game is over when the user reveals a cell that contains a mine
# Given the user loads the following mock data: "*oo-ooo-ooo"
# When the user reveals the cell "1-1"
# Then the game should be finished with the following result: "Game over"

# Scenario: Revealing all the cells that not contains a mine -> Game won
# Given the user loads the following mock data: "*o"
# When the user reveals the cell "1-2"
# Then the game should be finished with the following result: "Win"

Scenario: All the mines are revealed when the user reveals a cell that contains a mine
Given the user loads the following mock data: "**-*o"
When the user reveals the cell "0-0"
Then the cell "0-0" should be revealed
And the cell "0-1" should be revealed
And the cell "1-0" should be revealed

Scenario: A bomb image is displayed when the user reveals a cell that contains a mine
Given the user loads the following mock data: "*oo-ooo-ooo"
When the user reveals the cell "0-0"
Then the cell "0-0" should display a bomb



Scenario Outline: Revealing a cell without mine but with adjacent mines, counting the number of adjacent mines
Given the user loads the following mock data: "<board>"
When the user reveals the cell "1-1"
Then the cell "1-1" should show <adjacentMines>

Examples:
    | board       | adjacentMines |
    | ooo-ooo-ooo |       0       | 
    | *oo-ooo-ooo |       1       |
    | **o-ooo-ooo |       2       |
    | ***-ooo-ooo |       3       |
    | ***-*oo-ooo |       4       |
    | ***-*o*-ooo |       5       |
    | ***-*o*-*oo |       6       |
    | ***-*o*-**o |       7       |
    | ***-*o*-*** |       8       |

Scenario: Cell status by default: enabled
Given the user loads the following mock data: "*o-*o"
Then all the cells should be enabled

# Scenario: Reseting the game, the default status should be set
# Given Load mock data "*o*-oo*-**o"
# And the user reveals the cell "1-2"
# And the user reveals the cell "1-1"
# When the user reset the game
# Then all the cells should be hidden
# And all the cells should be enabled
# And the flag counter should be "4"
# And the time counter should be ""

# # Marking cells as something 

Scenario: The user can tag a cell as mined when suspects that the cell contains a mine (flag)
Given the user loads the following mock data: "oo-o*"
When the user marks the cell "0-0" as mined
Then the cell "0-0" should show a flag

Scenario: The user can tag a cell as uncertainn when doesn't have enough info to determine if the cell contains a mine (uncertain symbol)
When the user marks the cell "1-1" as uncertain
Then the cell "1-1" should show a question mark

Scenario: Removing a mark from a cell
When the user marks the cell "1-1" as no-marked
Then the cell "1-1" should show void

# # Flag counter

# # // Scenario: Flag Counter --> Number that shows how many flags you're able to mark on the board when you haven't marked any cell as a flag
Scenario Outline: Default number of flags that shows how many flags left you can put on the board
Given the user loads the following mock data: "<board>"
Then the tag left counter should be "<count>"

Examples:
|board    | count |
|*o-*o    | 2    | 
|*ooo-*o*o| 3    | 


Scenario: Substract "-1" from the Flag Counter every time a cell is marked with a flag.
Given the user loads the following mock data: "***-ooo-***"
When the user marks the cell "0-0" as mined
Then the flag counter should show "5"

Scenario: Removing the Flag Mark from a cell
Given the user loads the following mock data: "***-ooo-***"
And the user marks the cell "0-0" as mined
When the user marks the cell "0-0" as uncertain
Then the flag counter should show "6"

# # Time counter
# @manual
# Scenario: Time counter starts when the user reveals a cell
# Given the user loads the following mock data: "***-ooo-***"
# And the "TimeCounter" shows ""
# When the user reveals the cell "2-1"
# Then the "TimeCounter" starts at "0"

# @manual
# Scenario: Time counter starts when the user marks a cell as mined
# Given the user loads the following mock data: "**-oo"
# When the user marks the cell "1-1" as mined
# Then the "TimeCounter" starts at "0"

# @manual
# Scenario: Time counter starts when the user marks a cell as uncertain
# Given the user loads the following mock data: "**-oo"
# When the user marks the cell "1-1" as uncertain
# Then the "TimeCounter" starts at "0"

# @manual
# Scenario: Stop the Time Counter when a mine is revealed
# Given the user loads the following mock data: "*o"
# When the user reveals a cell that contains "bomb"
# Then the "TimeCounter" should stop at "2"

# # Happy Face
# @current
Scenario: Default face image
Then the face image should be serious

Scenario: Face image displayed when the game has finished with a lose --> Display a SAD face
Given the user loads the following mock data: "***-ooo-***"
When the user reveals the cell "1-2"
Then the "faceImg" should be "sad"

# Scenario: Face image displayed when the game has finished with a win --> Display a HAPPY face
# Given the user loads the following mock data: "ooo-oo*-ooo"
# When the user reveals the cell "2-3"
# Then the "faceImg" should be "happy"

# Scenario: Reseted game
# Given a user reset the game
# Then all the cells should be hidden 
# And the cells should be enabled

# Scenario: Reset the game pressing the face image
# When the user presses on the face image
# Then the game should be reseted

# # Reveal 0 cells

# # Scenario: Reveal a cell that has 0 adjacent mines
# # Given the user loads the following mock data: "ooo-ooo-ooo"
# # When the user reveals the cell "2-2"
# # Then the cell "2-2" should be "0"

# Scenario: Revealing a cell without mine and without surrounding mines, the cell is empty
# Given the user loads the following mock data: 
# """
# ooo
# ooo
# ooo
# ***
# """
# When the user reveals the cell "2-2"
# Then cell "2-2" should be empty

# Scenario: Revealing an empty cell, revel all the adjacent cells
# Given the user loads the following mock data: 
# """
# ooo
# ooo
# ooo
# ***
# """
# When the user reveals the cell "2-2"
# Then board should look like:
# """
# 000
# 000
# 232
# ...
# """

# Scenario: An empty cell revealed by a neighbour, revel all the adjacent cells of the empty cell
# Given the user loads the following mock data: 
# """
# oooo*
# ooooo
# oooo*
# ooooo
# *oo**
# """
# When the user reveals the cell "1-1"
# Then board should look like:
# """
# 0001.
# 0002.
# 0001.
# 1113.
# .....
# """

# # ???? Scenario: A cell with surrounding mines revealed by a neighbour, the adjacent mines should not be revealed

# # Disabled actions

# Scenario: When the user loses, all the cells get disabled
# Given the user loads the following mock data: "oo-*o"
# When the user reveals the cell "2-1"
# Then all the cells should be disabled

# Scenario: When the user reveals all the empty cells (wins), all the cells get disabled
# Given the user loads the following mock data: "**-*o"
# When the user reveals the cell "2-2"
# Then the cell "1-1" should be disabled
# And the cell "1-2" should be disabled
# And the cell "2-1" should be disabled
# And the cell "2-2" should be disabled

# # Reveal bombs

# Scenario: When a mine explodes the othe mines must be revealed
# Given the user loads the following mock data: "**-*o"
# When the user reveals the cell "1-1"
# Then the cell "1-2" should display a "explodedBomb"
# And the cell "2-1" should display a "explodedBomb"

# # Computer controls

# Scenario: Revealing a cell with the mouse (left-click)
# Given the user loads the following mock data: "*o-o*"
# When the user left-click on the cell "1-1"
# Then the cell "1-1" should be revealed

# Scenario Outline: tagging a cell with the mouse (right-click)
# Given the user opens the app
# And the user tags the cell "1-1" as "<initialStatus>"
# When the user right click on the cell "1-1"
# Then the cell "1-1" should show "<finalStatus>"

# Examples:
# | initialStatus | finalStatus |
# | no-marked     | mined       |
# | mined         | uncertain   |
# | uncertain     | no-marked   |

# Scenario: Mark a cell as if it has a mine (flag) with the mouse
# Given the user opens the app
# When the user right-click on the cell "1-1"
# Then the cell "1-1" should show "!"

# Scenario: Mark a cell as you don't know what it contains (uncertain symbol) with the mouse
# Given a user opens the app
# When the user right-click on the cell "1-1"
# And the user right-click on the cell "1-1"
# Then the cell "1-1" should show "?"

# Scenario: Removing a mark from a cell
# Given a user opens the app
# When the user right-click on the cell "1-1"
# And the user right-click on the cell "1-1"
# And the user right-click on the cell "1-1"
# Then the cell "1-1" should show ""

# Scenario: Reset the game pressing the face image with a mouse
# When the user left-click on the face image
# Then the game should be reseted

# # Scenario: Reveal a cell that contains a mine -> se deben destacar las banderitas mal marcadas
# # //TODO