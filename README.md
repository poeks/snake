# Snake
A simple snake game which I've made to learn React.

## Installation
To use the snake game in your React App:

```
npm install @poekimonster/snake
```

## Usage

In a React app:

```js
import React, { useState } from 'react';
import { SnakeGame } from '@poekimonster/snake';

const myGame = () => {
    // Define a state for the highscore and pass it to the SnakeGame.
    const [highScore, setHighScore] = useState(0);

    return (
        <SnakeGame highScore={highScore} setHighScore={setHighScore}>
    )
}
```
