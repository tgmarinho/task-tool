import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import BoardForm from 'modules/Boards/components/BoardForm';
import Cards from 'modules/Cards';
import style from './Board.sass';

/* istanbul ignore next */
const boardSpec = {
  drop(props) {
    return {
      boardId: props.id,
    };
  },
};

/* istanbul ignore next */
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export const getClassNames = isOver => classNames({
  [style.board]: true,
  [style['is-over']]: isOver,
});

export const Board = ({ name, id, editMode, onFieldNameBlur, onClickName, isOver, connectDropTarget }) => connectDropTarget(
  <div className={getClassNames(isOver)} >
    <BoardForm
      editMode={editMode}
      id={id}
      name={name}
      onFieldNameBlur={onFieldNameBlur}
      onClickName={onClickName}
    />
    <Cards boardId={id} />
  </div>,
);

Board.propTypes = {
  id: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onFieldNameBlur: PropTypes.func.isRequired,
  onClickName: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  connectDropTarget: PropTypes.func.isRequired,
};

Board.defaultProps = {
  editMode: false,
  isOver: false,
};

export default DropTarget('CARD', boardSpec, collect)(Board);
