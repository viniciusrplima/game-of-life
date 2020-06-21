import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import PatternImage from './PatternImage';
import { useSelector, useDispatch } from 'react-redux';
import patternActions from '../state/actions/patternActions';
import patterns from '../game/patterns.json';
import './styles/PatternsView.css';

export default function PatternsView() {

  const page = useSelector(state => state.pattern.page);
  const item = useSelector(state => state.pattern.item);
  const dispatch = useDispatch();

  const changePage = (index) => {
    dispatch(patternActions.setPage(index));
    dispatch(patternActions.setItem(-1));
  }

  const changeItem = (index) => {
    dispatch(patternActions.setItem(index));
  }

  return (
    <>
      <div className="PatternsPagination">
        {
          '*abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index)=> (
            <Button 
              key={index}
              className={page === index ? 'selected' : ''}
              onClick={() => changePage(index)}
            >
              {letter}
            </Button>
          ))
        }
      </div>
      <div className="PatternsView">
        {
          patterns[page].map((pattern, index) => (
            <Card 
              key={index} 
              onClick={() => changeItem(index)}
              className={ item === index ? 'selected' : '' }
            >
              <p className="title">{ pattern.title }</p>
              <PatternImage width={60} height={60} pattern={pattern} />
            </Card>
          ))
        }
      </div>
    </>
  )
}
