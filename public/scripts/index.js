import React from 'react';
import { FoodCart } from './App';

React.render(<FoodCart onKeyDown={console.log("huh")} />, document.getElementById('root'));
