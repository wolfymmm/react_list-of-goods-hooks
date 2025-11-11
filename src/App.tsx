import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
    setGoods(sortedGoods);
    setActiveAction('alphabetical');
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);
    setGoods(sortedGoods);
    setActiveAction('length');
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();
    setGoods(reversedGoods);
    setActiveAction('reverse');
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setActiveAction(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={`button is-info ${activeAction === 'alphabetical' ? 'is-active' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          className={`button is-success ${activeAction === 'length' ? 'is-active' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          className={`button is-warning ${activeAction === 'reverse' ? 'is-active' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {activeAction && (
          <button
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
