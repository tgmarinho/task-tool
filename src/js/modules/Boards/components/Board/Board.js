import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import BoardForm from 'modules/Boards/components/BoardForm';
import Cards from 'modules/Cards';
import style from './Board.sass';

const boardSpec = {
  drop(props) {
    return {
      boardId: props.id,
    };
  },

};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const getClassNames = isOver => classNames({
  [style.board]: true,
  [style['is-over']]: isOver,
});

const Board = ({
  name,
  id,
  editMode,
  onFieldNameBlur,
  onClickName,
  isOver,
  connectDropTarget,
}) => connectDropTarget(
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
  name: PropTypes.string.isRequired,
};

export default DropTarget('CARD', boardSpec, collect)(Board);