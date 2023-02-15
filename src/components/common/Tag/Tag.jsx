import React from 'react';
import styles from './Tag.module.scss';

const Tag = ({ tag }) => {
  if (!tag) return null;

  const tagColor = tag.color || '#dbdbdb';
  return (
    <span className={styles.tag} style={{ backgroundColor: `${tagColor}` }}>
      {tag.name}
    </span>
  );
};

export default Tag;
