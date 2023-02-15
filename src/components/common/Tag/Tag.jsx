import React from 'react';
import styles from './Tag.module.scss';

const Tag = ({ tag }) => {
  if (!tag) return null;

  return (
    <span className={styles.tag} style={{ backgroundColor: `${tag.color}` }}>
      {tag.name}
    </span>
  );
};

export default Tag;
