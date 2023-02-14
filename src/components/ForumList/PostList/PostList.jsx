import React from 'react';
import styles from './PostList.module.scss';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';

const PostList = ({ post }) => {
  return (
    <li className={styles.post}>
      <div className={styles.lftArea}>
        <div className={styles.like}>
          {post.isLiked ? (
            <BsHandThumbsUpFill size="24" />
          ) : (
            <BsHandThumbsUp size="24" />
          )}
        </div>
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.content}>{post.content}</p>
          <div className={styles.tagWrapper}>
            <div
              className={styles.tagList}
              style={{ backgroundColor: post.tag.color }}
            >
              {post.tag.name}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rhtArea}>
        <span className={styles.time}>5시간전</span>
        {/* <div className={styles.profile}>
          <img src="images/profile.png" alt="프로필 이미지" />
        </div> */}
      </div>
    </li>
  );
};

export default PostList;
