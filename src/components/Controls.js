import React from 'react';
import ControlsHeader from './ControlsHeader.js';
import PatternsView from './PatternsView.js';
import './styles/Controls.css';

export default function Controls() {

  return (
    <div className="Controls">
			<ControlsHeader />
      <PatternsView />
    </div>
  )
}
