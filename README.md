# Assignment: “Tic-Tac-Toe or 4-in-a-row Game”

Implement the game of Tic-Tac-Toe based on the product backlog below. You do not have to support all requirements: choose whatever you're comfortable with to implement. Work on your solution for a max of 4 hours. When done or time runs out, write down what you would like to improve in the future.

Build a simple single-page-app frontend. Bonus: if you're comfortable to do so, you can also build a server backend and provide all business logic and game state tracking by the backend server. If not, just keep everything client-side, but do keep your business logic and game state separate from the UI code.

Please take the following into account:

- Readability and comprehensibility of the code (Clean code)
- Testing your solution (e.g Unit testing)
- Conscious design/technical decisions
- Simplicity of the solution
- Consistent and proper use of programming paradigms such as object oriented programming, functional programming

Code: Commit each step during your development in a Github repo so we can study your reasoning and progress.

Have fun doing the assignment and make a nice application!

# Product backlog

## As a player I want to play Tic-Tac-Toe against the computer so that I can entertain myself.

Acceptance criteria

- The user and the computer take turns playing.
- The first player to achieve three-in-a-row wins.
- Three-in-a-row can be horizontal, vertical or diagonal.
- When the game ends a new game can be started.
- The achieved score is registered.

## As a player I want my top scores to be registered so that I can review my accomplishments.

Acceptance criteria

- The score is calculated based on the lowest number of moves combined with the duration of the game. (you don't get points when you lose, and you can assume that the time taken by the computer is negligible)
- Only the top 10 scores are kept.
- The scores can be tracked in memory, they don't need to be persisted to a data store.

## As a player I want to register my name so that others can see who achieved what score.

Acceptance criteria

- The user can enter their name when the game starts.

## As a player I want to see my current score compared to that of other players so that I know how well I'm currently doing.

Acceptance criteria

- The score of the current game is always displayed.
- The current score is shown in comparison to the top scores.
