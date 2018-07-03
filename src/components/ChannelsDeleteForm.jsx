import React from 'react';

const ChannelsDeleteForm = (props) => {
  const { handleDelete, handleClose, visible } = props;
  if (!visible) {
    return null;
  }
  return (
    <div>
      <p>
        Are you sure you want to delete this channel?
      </p>
      <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button onClick={handleClose} type="button" className="btn btn-link">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChannelsDeleteForm;
