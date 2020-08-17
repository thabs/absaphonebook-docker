import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';

import styles from './cardStyle';
const useStyles = makeStyles(styles);

const Card = props => {
  const classes = useStyles();
  const {className, children, ...rest} = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [className]: className !== undefined,
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
