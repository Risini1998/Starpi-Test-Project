/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div className=' !bg-yellow-400'>
      <h1 style={{
        color: 'white'
      }}>{pluginId}&apos;s HomePage</h1>
      <p style={{
        color: 'white'
      }}>Happy coding</p>
    </div>
  );
};

export default HomePage;
