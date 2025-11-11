import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

interface Good {
  id: number;
  name: string;
}

export const goodsFromServer: Good[] = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  // Отримати відсортований масив
  const getVisibleGoods = () => {
    const goods = [...goodsFromServer];

    // Apply operations in sequence based on sortType
    switch (sortType) {
      case SortType.Alphabetically:
        return goods.sort((a, b) => a.name.localeCompare(b.name));
      case SortType.ByLength:
        return goods.sort((a, b) => a.name.length - b.name.length);
      case SortType.Reverse:
        return goods.reverse();
      default:
        return goods;
    }
  };

  const visibleGoods = getVisibleGoods();

  // Обробники кнопок
  const handleSortAlphabetically = () => setSortType(SortType.Alphabetically);
  const handleSortByLength = () => setSortType(SortType.ByLength);
  const handleReverse = () => setSortType(SortType.Reverse);
  const handleReset = () => setSortType(SortType.None);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? 'is-active' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? 'is-active' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === SortType.Reverse ? 'is-active' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortType !== SortType.None && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
