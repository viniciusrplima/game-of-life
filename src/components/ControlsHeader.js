import React from 'react';
import Button from './Button.js';
import {
  BsBrush, 
  BsPuzzleFill, 
  BsFillPlayFill, 
  BsFillPauseFill, 
  BsFillXCircleFill, 
  BsArrowsMove, 
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import playActions from '../state/actions/playActions.js';
import toolsActions from '../state/actions/toolsActions.js';
import { game } from '../state/state';
import './styles/ControlsHeader.css';

export default function ControlsHeader() {

  return (
    <div className="ControlsHeader">
      <div className="ButtonSet">
        <PlayPauseButton />
        <HandTools />
        <Button onClick={() => game.clear = true}>
          <BsFillXCircleFill size={20}/>
        </Button>
      </div>
    </div>
  )
}

function PlayPauseButton(props) {
  
  const play = useSelector(state => state.play);
  const dispatch = useDispatch();

  const togglePlay = () => {
    if(play) dispatch(playActions.pause);
    else dispatch(playActions.play);
  }

  return (
    <Button onClick={togglePlay} {...props}>
      { play ?
        <BsFillPauseFill size={20}/> :
        <BsFillPlayFill size={20}/>
      }
    </Button>
  )
}

function HandTools(props) {

  const tool = useSelector(state => state.tool);
  const dispatch = useDispatch();

  return (
    <>
      <Button 
        onClick={() => dispatch(toolsActions.set('BRUSH'))}
        className={tool === 'BRUSH' ? 'selected' : ''}
      >
        <BsBrush size={20}/>
      </Button>
      <Button 
        onClick={() => dispatch(toolsActions.set('PATTERN'))}
        className={tool === 'PATTERN' ? 'selected' : ''}
      >
        <BsPuzzleFill size={20}/>
      </Button>
      <Button 
        onClick={() => dispatch(toolsActions.set('MOVE'))}
        className={tool === 'MOVE' ? 'selected' : ''}
      >
        <BsArrowsMove size={20}/>
      </Button>
    </>
  )
}

